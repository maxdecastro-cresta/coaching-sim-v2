"use client";

import { ReactNode, useState, useRef, useCallback, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Updated variable options with categories to match Figma design
const variableCategories = [
  {
    category: "Metadata",
    count: 4,
    options: [
      { id: 'metadata.type1', label: 'Metadata type', description: 'Metadata type description' },
      { id: 'metadata.type2', label: 'Metadata type', description: 'Metadata type description' },
      { id: 'metadata.type3', label: 'Metadata type', description: 'Metadata type description' },
      { id: 'metadata.type4', label: 'Metadata type', description: 'Metadata type description' }
    ]
  },
  {
    category: "Entity",
    count: 5,
    options: [
      { id: 'entity.type1', label: 'Entity type', description: 'Entity type description' },
      { id: 'entity.type2', label: 'Entity type', description: 'Entity type description' },
      { id: 'entity.type3', label: 'Entity type', description: 'Entity type description' },
      { id: 'entity.type4', label: 'Entity type', description: 'Entity type description' },
      { id: 'entity.type5', label: 'Entity type', description: 'Entity type description' }
    ]
  },
  {
    category: "Summarization topic",
    count: 5,
    options: [
      { id: 'entity.type6', label: 'Summarization topic type', description: 'Summarization topic type description' },
      { id: 'entity.type7', label: 'Summarization topic type', description: 'Summarization topic type description' },
      { id: 'entity.type8', label: 'Summarization topic type', description: 'Summarization topic type description' },
      { id: 'entity.type9', label: 'Summarization topic type', description: 'Summarization topic type description' },
    ]
  },
  {
    category: "Conversation info",
    count: 4,
    options: [
      { id: 'entity.type10', label: 'Conversation info type', description: 'Conversation info type description' },
      { id: 'entity.type11', label: 'Conversation info type', description: 'Conversation info type description' },
      { id: 'entity.type12', label: 'Conversation info type', description: 'Conversation info type description' },
      { id: 'entity.type13', label: 'Conversation info type', description: 'Conversation info type description' }
    ]
  }
];

// Flatten options for search
const allVariableOptions = variableCategories.flatMap(category => 
  category.options.map(option => ({
    ...option,
    categoryName: category.category,
    categoryCount: category.count
  }))
);

interface SyntaxSearchProps {
  className?: string;
  children?: ReactNode;
}

export function SyntaxSearch({ className, children }: SyntaxSearchProps) {
  const [value, setValue] = useState('');
  const [showVariables, setShowVariables] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number } | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Array<{category: string, count?: number, options: any[]}>>(variableCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState<number | null>(2); // Default to the Summarization topic type
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [highlightedValue, setHighlightedValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Format text with highlights for @ mentions
  const formatTextWithHighlights = (text: string) => {
    // Find all @ mentions in progress or completed variables
    const atMentionRegex = /@[^@\s]*(?:@|$)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Create a formatted version of the text where @ mentions are wrapped in spans with pink color
    while ((match = atMentionRegex.exec(text)) !== null) {
      const matchedText = match[0];
      const startIndex = match.index;
      
      // Add text before the match
      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }
      
      // Add the matched text with pink highlighting
      parts.push(`<span class="text-ext-pink-content">${matchedText}</span>`);
      
      lastIndex = startIndex + matchedText.length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.join('');
  };

  // Handle text input and detect '@' symbol
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Get cursor position information
    const cursorPos = e.target.selectionStart || 0;
    
    // Check if '@' was just typed and is not part of a word
    if (newValue[cursorPos - 1] === '@' && (cursorPos === 1 || newValue[cursorPos - 2] === ' ' || newValue[cursorPos - 2] === '\n')) {
      showVariablePopover();
      setSearchTerm('');
      setFilteredOptions(variableCategories);
    } 
    // If we're already showing variables, update the search term
    else if (showVariables) {
      // Find the text between the last '@' and current cursor position
      const lastAtIndex = newValue.lastIndexOf('@', cursorPos - 1);
      if (lastAtIndex >= 0 && lastAtIndex < cursorPos) {
        const term = newValue.substring(lastAtIndex + 1, cursorPos);
        setSearchTerm(term);
        
        // Filter options based on the search term
        if (term) {
          // Search across all options
          const matchedOptions = allVariableOptions.filter(option => 
            option.label.toLowerCase().includes(term.toLowerCase()) || 
            option.id.toLowerCase().includes(term.toLowerCase())
          );

          // Group results by category
          const groupedResults = matchedOptions.reduce((acc, option) => {
            const categoryName = option.categoryName;
            const existingCategory = acc.find(c => c.category === categoryName);
            
            if (existingCategory) {
              existingCategory.options.push(option);
            } else {
              acc.push({
                category: categoryName,
                count: option.categoryCount,
                options: [option]
              });
            }
            
            return acc;
          }, [] as Array<{category: string, count?: number, options: any[]}>);
          
          setFilteredOptions(groupedResults);
        } else {
          setFilteredOptions(variableCategories);
        }
        
        // Update cursor position after filtering
        if (textAreaRef.current) {
          // Recalculate cursor coordinates
          const textBeforeCursor = textAreaRef.current.value.substring(0, cursorPos);
          const lines = textBeforeCursor.split('\n');
          const currentLine = lines.length;
          const currentLineLength = lines[lines.length - 1].length;
          
          // Use more accurate dimensions for positioning
          const lineHeight = 24; // Line height in pixels
          const charWidth = 8;   // Approximate character width in pixels
          
          setCursorPosition({
            top: currentLine * lineHeight,
            left: currentLineLength * charWidth,
          });
        }
      } else {
        // If there's no '@' before cursor, hide the popover
        setShowVariables(false);
      }
    }
  };

  // Show variable popover and position it correctly
  const showVariablePopover = () => {
    if (textAreaRef.current) {
      // Get cursor position in textarea
      const cursorPos = textAreaRef.current.selectionStart || 0;
      
      // Calculate cursor coordinates
      const textBeforeCursor = textAreaRef.current.value.substring(0, cursorPos);
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines.length;
      const currentLineLength = lines[lines.length - 1].length;
      
      // More accurate dimensions for positioning
      const lineHeight = 24; // Line height in pixels, adjusted for the textarea
      const charWidth = 8;   // Approximate character width in pixels
      
      // Position the dropdown above the cursor
      setCursorPosition({
        top: currentLine * lineHeight,
        left: Math.max(0, currentLineLength * charWidth),
      });
      
      setShowVariables(true);
    }
  };

  // Handle selecting a variable from the menu
  const selectVariable = (option: { id: string; label: string }) => {
    if (textAreaRef.current) {
      const cursorPos = textAreaRef.current.selectionStart || 0;
      const text = value;
      
      // Find the start of the current @mention
      const lastAtIndex = text.lastIndexOf('@', cursorPos - 1);
      
      if (lastAtIndex >= 0) {
        // Replace the @mention with the selected variable
        const newText = 
          text.substring(0, lastAtIndex) + 
          `@${option.id}@` + 
          text.substring(cursorPos);
        
        setValue(newText);
        
        // Set cursor position after the inserted variable
        const newCursorPos = lastAtIndex + `@${option.id}@`.length;
        
        // Use setTimeout to ensure the value is updated before setting selection
        setTimeout(() => {
          if (textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          }
        }, 0);
      }
      
      setShowVariables(false);
    }
  };

  // Handle keyboard events for navigation in the variable list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showVariables) {
      if (e.key === 'Escape') {
        setShowVariables(false);
      }
      // Add keyboard navigation if needed
    }
  };

  // Set up event listener for clicks outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't close if clicking inside the dropdown container
      if (dropdownContainerRef.current && dropdownContainerRef.current.contains(e.target as Node)) {
        return;
      }
      
      // Otherwise close the dropdown
      setShowVariables(false);
    };
    
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Toggle category expansion
  const toggleCategory = (index: number) => {
    if (expandedCategoryIndex === index) {
      setExpandedCategoryIndex(null);
    } else {
      setExpandedCategoryIndex(index);
    }
  };

  // Scroll to a specific category
  const scrollToCategory = (categoryIndex: number) => {
    if (dropdownRef.current && categoryRefs.current[categoryIndex]) {
      const container = dropdownRef.current;
      const element = categoryRefs.current[categoryIndex];
      
      if (element) {
        // Calculate the scroll position, accounting for any sticky headers
        const elementTop = element.offsetTop;
        container.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className={`${className} flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4`}>
      <div className="relative w-full max-w-[400px] mx-auto">
        {/* The textarea and highlighting container */}
        <div className="relative bg-bg-surface border border-controls rounded-base">
          {/* The actual textarea for input */}
          <Textarea 
            ref={textAreaRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="" 
            className="w-full min-h-32 resize-none focus:outline-none body-regular-text border-none shadow-none focus:ring-1 focus:ring-content-action p-3"
            style={{
              color: "transparent",
              caretColor: "var(--content-primary)",
              backgroundColor: "transparent",
              position: "relative",
              zIndex: 1
            }}
          />
          
          {/* Display layer with highlighted text or placeholder */}
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 whitespace-pre-wrap overflow-hidden pointer-events-none p-3 body-regular-text"
            dangerouslySetInnerHTML={{ 
              __html: value 
                ? formatTextWithHighlights(value)
                : '<span class="text-content-placeholder">Type your syntax search query here... (Try typing \'@\' for variables)</span>'
            }}
            style={{
              zIndex: 2,
              backgroundColor: "transparent"
            }}
          />
        </div>
        
        {showVariables && cursorPosition && (
          <div 
            className="absolute z-50"
            style={{
              bottom: `calc(100% - ${cursorPosition.top - 15}px)`,
              left: `${cursorPosition.left}px`,
            }}
          >
            <div className="bg-bg-surface border border-controls rounded-base shadow-md w-[470px] flex flex-col" ref={dropdownContainerRef}>
              {/* Create a flex container for left nav + content */}
              <div className="flex flex-row h-80">
                {/* Left side navigation with text links */}
                <div className="w-48 border-r border-controls flex flex-col py-2 px-2">
                  <button 
                    className="text-left text-sm py-2 px-2 rounded hover:bg-bg-elevation text-gray-800 font-medium"
                    onClick={() => scrollToCategory(0)}
                  >
                    Metadata
                  </button>
                  <button 
                    className="text-left text-sm py-2 px-2 rounded hover:bg-bg-elevation text-gray-800 font-medium"
                    onClick={() => scrollToCategory(1)}
                  >
                    Entity
                  </button>
                  <button 
                    className="text-left text-sm py-2 px-2 rounded hover:bg-bg-elevation text-gray-800 font-medium"
                    onClick={() => scrollToCategory(2)}
                  >
                    Summarization topic
                  </button>
                  <button 
                    className="text-left text-sm py-2 px-2 rounded hover:bg-bg-elevation text-gray-800 font-medium"
                    onClick={() => scrollToCategory(3)}
                  >
                    Conversation info
                  </button>
                  <div className="flex-grow"></div>
                </div>
                
                {/* Main content area */}
                <div className="flex-1 overflow-y-auto max-h-80 pt-2" ref={dropdownRef}>
                  {/* Content sections without sticky headers */}
                  {filteredOptions.map((category, categoryIndex) => (
                    <div 
                      key={`category-${categoryIndex}`} 
                      className={`category-section ${categoryIndex > 0 ? 'mt-4' : ''}`}
                      ref={el => {
                        categoryRefs.current[categoryIndex] = el;
                      }}
                    >
                      {/* Regular header without sticky positioning or border */}
                      <div className="px-4 py-1 flex justify-between">
                        <span className="body-small-text">{category.category}</span>
                      </div>
                      
                      {/* Options for this category */}
                      {category.options.map((option, optionIndex) => (
                        <div
                          key={`${categoryIndex}-${optionIndex}`}
                          className="px-4 py-2 hover:bg-bg-elevation cursor-pointer text-gray-600"
                          onClick={() => selectVariable(option)}
                        >
                          <span className="body-regular-text truncate block overflow-hidden">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Manage variables button - fixed to the bottom */}
              <div className="px-4 py-3 flex justify-between items-center border-t border-controls cursor-pointer mt-auto">
                <span className="text-blue-600 text-sm font-medium">Manage variables</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}