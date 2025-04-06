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
  const firstMenuItemRef = useRef<HTMLDivElement>(null);
  const [focusedItemIndices, setFocusedItemIndices] = useState<{categoryIndex: number, optionIndex: number} | null>(null);
  // Keep track of silhouette suggestion
  const [silhouetteSuggestion, setSilhouetteSuggestion] = useState<string | null>(null);
  const [silhouettePosition, setSilhouettePosition] = useState<number | null>(null);
  const [activeAtIndex, setActiveAtIndex] = useState<number | null>(null);

  // Format text with highlights for @ mentions only - no silhouette here
  const formatTextWithHighlights = (text: string) => {
    if (!text) return '';

    // Process text to highlight @ mentions
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

  // Format text with highlights and add silhouette suggestion
  const formatTextWithSilhouette = () => {
    if (!value) return '';
    
    let formattedHtml = formatTextWithHighlights(value);
    
    // Add silhouette if needed
    if (getSilhouetteText() && silhouettePosition && activeAtIndex !== null) {
      // Split the HTML at the cursor position
      // This is tricky because we need to find the right place in the HTML, not just the text
      const beforeCursorText = value.substring(0, silhouettePosition);
      const beforeCursorHtml = formatTextWithHighlights(beforeCursorText);
      
      // Insert the silhouette after the formatted HTML for the text before cursor
      formattedHtml = beforeCursorHtml + 
                      `<span class="text-gray-400">${getSilhouetteText()}</span>` + 
                      formattedHtml.substring(beforeCursorHtml.length);
    }
    
    return formattedHtml;
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
      setSilhouetteSuggestion(null);
      setSilhouettePosition(null);
      setActiveAtIndex(null);
    }
  };

  // Update the function to handle both filtering options and updating the silhouette
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
      // Set focus to the first item when opening
      setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
      
      // Set initial silhouette suggestion and track the @ position
      if (variableCategories[0] && variableCategories[0].options[0]) {
        setActiveAtIndex(cursorPos - 1);
        setSilhouetteSuggestion(variableCategories[0].options[0].id);
        setSilhouettePosition(cursorPos);
      }
    } 
    // If we're already showing variables, update the search term
    else if (showVariables) {
      // Find the text between the last '@' and current cursor position
      const lastAtIndex = newValue.lastIndexOf('@', cursorPos - 1);
      if (lastAtIndex >= 0 && lastAtIndex < cursorPos) {
        setActiveAtIndex(lastAtIndex);
        const term = newValue.substring(lastAtIndex + 1, cursorPos);
        setSearchTerm(term);
        
        // Update silhouette position
        setSilhouettePosition(cursorPos);
        
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
          
          // Reset focus to first item in filtered results if we have any
          if (groupedResults.length > 0 && groupedResults[0].options.length > 0) {
            setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
            // Update silhouette suggestion based on the first match
            const suggestion = groupedResults[0].options[0].id;
            setSilhouetteSuggestion(suggestion);
          } else {
            setFocusedItemIndices(null);
            setSilhouetteSuggestion(null);
          }
        } else {
          setFilteredOptions(variableCategories);
          // Reset focus to first item when clearing search
          setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
          // Update silhouette suggestion with the first item
          if (variableCategories[0] && variableCategories[0].options[0]) {
            setSilhouetteSuggestion(variableCategories[0].options[0].id);
          }
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
        setFocusedItemIndices(null);
        setSilhouetteSuggestion(null);
        setSilhouettePosition(null);
        setActiveAtIndex(null);
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
      
      // Set focus to first item when opening
      setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
      
      // Keep focus on the textarea
      textAreaRef.current.focus();
    }
  };

  // Handle keyboard events for navigation in the variable list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showVariables) {
      if (e.key === 'Escape') {
        setShowVariables(false);
        setFocusedItemIndices(null);
        e.preventDefault();
        return;
      }
      
      // We're only handling basic keydown events in the textarea
      // The actual navigation logic is now in the global event handler
      // This avoids duplicate navigation and double-incrementing the selection
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault(); // Prevent default behavior
      }
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

  // Setup global keyboard event listener for when dropdown is shown
  useEffect(() => {
    const handleKeyboardNav = (e: KeyboardEvent) => {
      // Only process if the dropdown is shown
      if (!showVariables) return;
      
      // Only intercept navigation keys
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab'].includes(e.key)) {
        // Only prevent default if the event is from navigation keys and if the target is the textarea
        if (e.target === textAreaRef.current) {
          e.preventDefault();
        }
        
        if (e.key === 'Escape') {
          setShowVariables(false);
          setFocusedItemIndices(null);
          return;
        }
        
        if (e.key === 'Enter' && focusedItemIndices) {
          // Find and select the currently focused option
          const { categoryIndex, optionIndex } = focusedItemIndices;
          if (filteredOptions[categoryIndex] && filteredOptions[categoryIndex].options[optionIndex]) {
            selectVariable(filteredOptions[categoryIndex].options[optionIndex]);
            e.preventDefault(); // Prevent form submission
          }
          return;
        }
        
        if (e.key === 'Tab' || e.key === 'ArrowDown') {
          // Navigate to next option
          if (!focusedItemIndices) {
            setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
            return;
          }
          
          const { categoryIndex, optionIndex } = focusedItemIndices;
          const currentCategory = filteredOptions[categoryIndex];
          
          // If we're not at the end of the current category
          if (optionIndex < currentCategory.options.length - 1) {
            setFocusedItemIndices({ categoryIndex, optionIndex: optionIndex + 1 });
          } 
          // If there are more categories, move to the first option of the next category
          else if (categoryIndex < filteredOptions.length - 1) {
            setFocusedItemIndices({ categoryIndex: categoryIndex + 1, optionIndex: 0 });
            // Scroll to ensure the new category is visible
            setTimeout(() => scrollToCategory(categoryIndex + 1), 0);
          }
          // Otherwise, loop back to the first option
          else {
            setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
            // Scroll back to top
            setTimeout(() => scrollToCategory(0), 0);
          }
        }
        
        if (e.key === 'ArrowUp') {
          // Navigate to previous option
          if (!focusedItemIndices) {
            // Focus the last option of the last category if nothing is focused
            const lastCategoryIndex = filteredOptions.length - 1;
            const lastCategory = filteredOptions[lastCategoryIndex];
            const lastOptionIndex = lastCategory.options.length - 1;
            setFocusedItemIndices({ categoryIndex: lastCategoryIndex, optionIndex: lastOptionIndex });
            return;
          }
          
          const { categoryIndex, optionIndex } = focusedItemIndices;
          
          // If we're not at the beginning of the current category
          if (optionIndex > 0) {
            setFocusedItemIndices({ categoryIndex, optionIndex: optionIndex - 1 });
          } 
          // If there are previous categories, move to the last option of the previous category
          else if (categoryIndex > 0) {
            const prevCategoryIndex = categoryIndex - 1;
            const prevCategory = filteredOptions[prevCategoryIndex];
            const lastOptionIndex = prevCategory.options.length - 1;
            setFocusedItemIndices({ categoryIndex: prevCategoryIndex, optionIndex: lastOptionIndex });
            // Scroll to ensure the new category is visible
            setTimeout(() => scrollToCategory(prevCategoryIndex), 0);
          }
          // Otherwise, loop to the last option of the last category
          else {
            const lastCategoryIndex = filteredOptions.length - 1;
            const lastCategory = filteredOptions[lastCategoryIndex];
            const lastOptionIndex = lastCategory.options.length - 1;
            setFocusedItemIndices({ categoryIndex: lastCategoryIndex, optionIndex: lastOptionIndex });
            // Scroll to the last category
            setTimeout(() => scrollToCategory(lastCategoryIndex), 0);
          }
        }
      }
    };
    
    // Add global keyboard event listener when dropdown is shown
    if (showVariables) {
      document.addEventListener('keydown', handleKeyboardNav, true); // Use capture phase
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardNav, true);
    };
  }, [showVariables, focusedItemIndices, filteredOptions, selectVariable]);

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
        
        // Update focus to the first item in this category
        if (filteredOptions[categoryIndex] && filteredOptions[categoryIndex].options.length > 0) {
          setFocusedItemIndices({ categoryIndex, optionIndex: 0 });
        }
      }
    }
  };

  // Update the focus effect to also update the silhouette suggestion
  useEffect(() => {
    // If the menu is open and we have focus indices, make sure the item is visible
    if (showVariables && focusedItemIndices && dropdownRef.current) {
      const { categoryIndex, optionIndex } = focusedItemIndices;
      
      // Find the focused element (if any)
      const focusedItemSelector = `[data-category-index="${categoryIndex}"][data-option-index="${optionIndex}"]`;
      const focusedElement = dropdownRef.current.querySelector(focusedItemSelector) as HTMLElement;
      
      if (focusedElement) {
        // Ensure the focused element is visible in the scrollable container
        const container = dropdownRef.current;
        const elementTop = focusedElement.offsetTop;
        const elementBottom = elementTop + focusedElement.offsetHeight;
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        
        if (elementTop < containerTop) {
          // Element is above the visible area
          container.scrollTop = elementTop;
        } else if (elementBottom > containerBottom) {
          // Element is below the visible area
          container.scrollTop = elementBottom - container.clientHeight;
        }
        
        // Update silhouette suggestion based on the currently focused item
        if (filteredOptions[categoryIndex] && filteredOptions[categoryIndex].options[optionIndex]) {
          const option = filteredOptions[categoryIndex].options[optionIndex];
          setSilhouetteSuggestion(option.id);
        }
      }
    } else if (!showVariables) {
      // Clear silhouette when dropdown is closed
      setSilhouetteSuggestion(null);
      setSilhouettePosition(null);
      setActiveAtIndex(null);
    }
  }, [focusedItemIndices, showVariables, filteredOptions]);

  // Calculate if we should show silhouette and what text to show
  const getSilhouetteText = () => {
    if (!showVariables || !silhouetteSuggestion || !silhouettePosition || activeAtIndex === null) {
      return null;
    }
    
    // If we have an active @ character and a current cursor position
    const typedText = value.substring(activeAtIndex + 1, silhouettePosition);
    
    // If what's been typed is already part of the suggestion, only show the rest
    if (silhouetteSuggestion.startsWith(typedText) && typedText.length > 0) {
      return silhouetteSuggestion.substring(typedText.length);
    }
    
    // Otherwise show the whole suggestion
    return silhouetteSuggestion;
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
          
          {/* Display layer with highlighted text and silhouette directly in the HTML */}
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 whitespace-pre-wrap overflow-hidden pointer-events-none p-3 body-regular-text"
            dangerouslySetInnerHTML={{ 
              __html: value 
                ? formatTextWithSilhouette() 
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
                      {category.options.map((option, optionIndex) => {
                        const isFocused = focusedItemIndices?.categoryIndex === categoryIndex && 
                                         focusedItemIndices?.optionIndex === optionIndex;
                        const isFirstItem = categoryIndex === 0 && optionIndex === 0;
                        
                        return (
                          <div
                            key={`${categoryIndex}-${optionIndex}`}
                            ref={isFirstItem ? firstMenuItemRef : null}
                            data-category-index={categoryIndex}
                            data-option-index={optionIndex}
                            className={`px-4 py-2 cursor-pointer text-gray-600 outline-none ${
                              isFocused ? 'bg-bg-elevation' : 'hover:bg-bg-elevation'
                            }`}
                            onClick={() => selectVariable(option)}
                            tabIndex={isFocused ? 0 : -1}
                            onMouseEnter={() => setFocusedItemIndices({ categoryIndex, optionIndex })}
                          >
                            <span className="body-regular-text truncate block overflow-hidden">{option.label}</span>
                          </div>
                        );
                      })}
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