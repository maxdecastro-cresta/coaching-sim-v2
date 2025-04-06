"use client";

import { ReactNode, useState, useRef, useCallback, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Updated variable options with categories to match Figma design
const variableCategories = [
  {
    category: "Metadata",
    options: [
      { id: 'account_status', label: 'account_status' },
      { id: 'agent browser info', label: 'agent browser info' },
      { id: 'agent device info', label: 'agent device info' },
      { id: 'agent_id', label: 'agent_id' },
      { id: 'agent_name', label: 'agent_name' },
      { id: 'agree_auth', label: 'agree_auth' },
      { id: 'api_version', label: 'api_version' },
      { id: 'auth_method', label: 'auth_method' },
      { id: 'auth_provider', label: 'auth_provider' },
      { id: 'billing_cycle', label: 'billing_cycle' },
      { id: 'browser_type', label: 'browser_type' },
      { id: 'browser_version', label: 'browser_version' },
      { id: 'call_duration', label: 'call_duration' },
      { id: 'call_start_time', label: 'call_start_time' },
      { id: 'client_ip', label: 'client_ip' },
      { id: 'connection_type', label: 'connection_type' },
      { id: 'consent_version', label: 'consent_version' },
      { id: 'cookie_id', label: 'cookie_id' },
      { id: 'customer_account_id', label: 'customer_account_id' },
      { id: 'customer_email', label: 'customer_email' },
      { id: 'customer_phone', label: 'customer_phone' },
      { id: 'customer_tier', label: 'customer_tier' },
      { id: 'department_id', label: 'department_id' },
      { id: 'device_manufacturer', label: 'device_manufacturer' },
      { id: 'device_model', label: 'device_model' },
      { id: 'experiment_id', label: 'experiment_id' },
      { id: 'feature_flags', label: 'feature_flags' },
      { id: 'language_code', label: 'language_code' },
      { id: 'last_login_date', label: 'last_login_date' },
      { id: 'locale_setting', label: 'locale_setting' },
      { id: 'marketing_opt_in', label: 'marketing_opt_in' },
      { id: 'network_latency', label: 'network_latency' },
      { id: 'notification_pref', label: 'notification_pref' },
      { id: 'os_type', label: 'os_type' },
      { id: 'page_load_time', label: 'page_load_time' },
      { id: 'platform_version', label: 'platform_version' },
      { id: 'privacy_version', label: 'privacy_version' },
      { id: 'referrer_url', label: 'referrer_url' },
      { id: 'region_code', label: 'region_code' },
      { id: 'registration_date', label: 'registration_date' },
      { id: 'screen_resolution', label: 'screen_resolution' },
      { id: 'server_node', label: 'server_node' },
      { id: 'session_id', label: 'session_id' },
      { id: 'subscription_status', label: 'subscription_status' },
      { id: 'terms_version', label: 'terms_version' },
      { id: 'timestamp', label: 'timestamp' },
      { id: 'timezone_offset', label: 'timezone_offset' },
      { id: 'transaction_id', label: 'transaction_id' },
      { id: 'user_agent', label: 'user_agent' },
      { id: 'visit_count', label: 'visit_count' }
    ]
  },
  {
    category: "Entity",
    options: [
      { id: 'Accessibility issue', label: 'Accessibility issue' },
      { id: 'Account issue', label: 'Account issue' },
      { id: 'Acme entity error', label: 'Acme entity error' },
      { id: 'Acme trouble condition', label: 'Acme trouble condition' },
      { id: 'Acme warning', label: 'Acme warning' },
      { id: 'API response error', label: 'API response error' },
      { id: 'Authentication error', label: 'Authentication error' },
      { id: 'Authorization error', label: 'Authorization error' },
      { id: 'Bank account', label: 'Bank account' },
      { id: 'Billing address', label: 'Billing address' },
      { id: 'Billing issue', label: 'Billing issue' },
      { id: 'Bug report', label: 'Bug report' },
      { id: 'Compatibility issue', label: 'Compatibility issue' },
      { id: 'Configuration error', label: 'Configuration error' },
      { id: 'Content issue', label: 'Content issue' },
      { id: 'Credit card', label: 'Credit card' },
      { id: 'Data integration error', label: 'Data integration error' },
      { id: 'Database error', label: 'Database error' },
      { id: 'Debit card', label: 'Debit card' },
      { id: 'Digital wallet', label: 'Digital wallet' },
      { id: 'Documentation issue', label: 'Documentation issue' },
      { id: 'Driver version', label: 'Driver version' },
      { id: 'Enhancement suggestion', label: 'Enhancement suggestion' },
      { id: 'Feature request', label: 'Feature request' },
      { id: 'Firmware version', label: 'Firmware version' },
      { id: 'Gift card', label: 'Gift card' },
      { id: 'Hardware model', label: 'Hardware model' },
      { id: 'Interface error', label: 'Interface error' },
      { id: 'Issue category', label: 'Issue category' },
      { id: 'Localization issue', label: 'Localization issue' },
      { id: 'Media playback issue', label: 'Media playback issue' },
      { id: 'Network error', label: 'Network error' },
      { id: 'Order number', label: 'Order number' },
      { id: 'Payment method', label: 'Payment method' },
      { id: 'Performance issue', label: 'Performance issue' },
      { id: 'Plugin compatibility', label: 'Plugin compatibility' },
      { id: 'Product category', label: 'Product category' },
      { id: 'Product model', label: 'Product model' },
      { id: 'Product SKU', label: 'Product SKU' },
      { id: 'Reward points', label: 'Reward points' },
      { id: 'Security alert', label: 'Security alert' },
      { id: 'Service outage', label: 'Service outage' },
      { id: 'Shipping address', label: 'Shipping address' },
      { id: 'Software version', label: 'Software version' },
      { id: 'Subscription plan', label: 'Subscription plan' },
      { id: 'System error', label: 'System error' },
      { id: 'Technical issue', label: 'Technical issue' },
      { id: 'Transaction status', label: 'Transaction status' },
      { id: 'User interface issue', label: 'User interface issue' },
      { id: 'Validation error', label: 'Validation error' }
    ]
  },
  {
    category: "Summarization topic",
    options: [
      { id: 'Account management', label: 'Account management' },
      { id: 'Account security', label: 'Account security' },
      { id: 'Account upgrades', label: 'Account upgrades' },
      { id: 'Account verification', label: 'Account verification' },
      { id: 'Appointment scheduling', label: 'Appointment scheduling' },
      { id: 'Billing inquiries', label: 'Billing inquiries' },
      { id: 'Career opportunities', label: 'Career opportunities' },
      { id: 'Cloud storage', label: 'Cloud storage' },
      { id: 'Compatibility questions', label: 'Compatibility questions' },
      { id: 'Complaint handling', label: 'Complaint handling' },
      { id: 'Corporate information', label: 'Corporate information' },
      { id: 'Data backup', label: 'Data backup' },
      { id: 'Data management', label: 'Data management' },
      { id: 'Device synchronization', label: 'Device synchronization' },
      { id: 'Discount inquiries', label: 'Discount inquiries' },
      { id: 'Event information', label: 'Event information' },
      { id: 'Feature requests', label: 'Feature requests' },
      { id: 'Finances', label: 'Finances' },
      { id: 'Installation help', label: 'Installation help' },
      { id: 'Investor relations', label: 'Investor relations' },
      { id: 'Legal inquiries', label: 'Legal inquiries' },
      { id: 'Locks', label: 'Locks' },
      { id: 'Loyalty program', label: 'Loyalty program' },
      { id: 'Media inquiries', label: 'Media inquiries' },
      { id: 'Membership benefits', label: 'Membership benefits' },
      { id: 'Opening hours', label: 'Opening hours' },
      { id: 'Order status', label: 'Order status' },
      { id: 'Partnership inquiries', label: 'Partnership inquiries' },
      { id: 'Password reset', label: 'Password reset' },
      { id: 'Payment processing', label: 'Payment processing' },
      { id: 'Pricing questions', label: 'Pricing questions' },
      { id: 'Privacy concerns', label: 'Privacy concerns' },
      { id: 'Product availability', label: 'Product availability' },
      { id: 'Product feedback', label: 'Product feedback' },
      { id: 'Product information', label: 'Product information' },
      { id: 'Promotional offers', label: 'Promotional offers' },
      { id: 'Returns and refunds', label: 'Returns and refunds' },
      { id: 'Service booking', label: 'Service booking' },
      { id: 'Service outages', label: 'Service outages' },
      { id: 'Shipping information', label: 'Shipping information' },
      { id: 'Software licenses', label: 'Software licenses' },
      { id: 'Store locations', label: 'Store locations' },
      { id: 'Subscription changes', label: 'Subscription changes' },
      { id: 'Technical support', label: 'Technical support' },
      { id: 'Terms of service', label: 'Terms of service' },
      { id: 'Troubleshooting steps', label: 'Troubleshooting steps' },
      { id: 'Update issues', label: 'Update issues' },
      { id: 'User training', label: 'User training' },
      { id: 'Warranty claims', label: 'Warranty claims' },
      { id: 'Weather', label: 'Weather' }
    ]
  },
  {
    category: "Conversation info",
    options: [
      { id: 'agent-performance', label: 'agent-performance' },
      { id: 'authentication-success', label: 'authentication-success' },
      { id: 'callback-promise', label: 'callback-promise' },
      { id: 'call-quality', label: 'call-quality' },
      { id: 'closing-quality', label: 'closing-quality' },
      { id: 'compliance-issue', label: 'compliance-issue' },
      { id: 'confidentiality-breach', label: 'confidentiality-breach' },
      { id: 'conversation-flow', label: 'conversation-flow' },
      { id: 'cross-selling-opportunity', label: 'cross-selling-opportunity' },
      { id: 'customer-appreciation', label: 'customer-appreciation' },
      { id: 'customer-churn-risk', label: 'customer-churn-risk' },
      { id: 'customer-confusion', label: 'customer-confusion' },
      { id: 'customer-education', label: 'customer-education' },
      { id: 'customer-frustration', label: 'customer-frustration' },
      { id: 'customer-satisfaction', label: 'customer-satisfaction' },
      { id: 'empathy-shown', label: 'empathy-shown' },
      { id: 'escalation-needed', label: 'escalation-needed' },
      { id: 'first-contact-resolution', label: 'first-contact-resolution' },
      { id: 'follow-up-required', label: 'follow-up-required' },
      { id: 'greeting-quality', label: 'greeting-quality' },
      { id: 'hold-duration', label: 'hold-duration' },
      { id: 'information-completeness', label: 'information-completeness' },
      { id: 'interruptions', label: 'interruptions' },
      { id: 'knowledge-gap', label: 'knowledge-gap' },
      { id: 'language-clarity', label: 'language-clarity' },
      { id: 'negative-moment', label: 'negative-moment' },
      { id: 'other-moment', label: 'other-moment' },
      { id: 'policy-exceptions', label: 'policy-exceptions' },
      { id: 'positive-moment', label: 'positive-moment' },
      { id: 'previous-case-reference', label: 'previous-case-reference' },
      { id: 'process-deviation', label: 'process-deviation' },
      { id: 'regulatory-mention', label: 'regulatory-mention' },
      { id: 'repeat-contact', label: 'repeat-contact' },
      { id: 'resolution-status', label: 'resolution-status' },
      { id: 'resolution-time', label: 'resolution-time' },
      { id: 'response-time', label: 'response-time' },
      { id: 'retention-opportunity', label: 'retention-opportunity' },
      { id: 'script-adherence', label: 'script-adherence' },
      { id: 'sensitive-information', label: 'sensitive-information' },
      { id: 'sentiment', label: 'sentiment' },
      { id: 'silence-periods', label: 'silence-periods' },
      { id: 'solution-effectiveness', label: 'solution-effectiveness' },
      { id: 'special-accommodations', label: 'special-accommodations' },
      { id: 'talking-speed', label: 'talking-speed' },
      { id: 'technical-accuracy', label: 'technical-accuracy' },
      { id: 'topic-change', label: 'topic-change' },
      { id: 'transfer-count', label: 'transfer-count' },
      { id: 'upselling-opportunity', label: 'upselling-opportunity' },
      { id: 'verification-failure', label: 'verification-failure' },
      { id: 'voice-tone', label: 'voice-tone' }
    ]
  }
];

// Flatten options for search
const allVariableOptions = variableCategories.flatMap(category => 
  category.options.map(option => ({
    ...option,
    categoryName: category.category
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
  const [filteredOptions, setFilteredOptions] = useState<Array<{category: string, options: any[]}>>(variableCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState<number | null>(2); // Default to the Summarization topic type
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0); // Track active category
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

    // Special handling for active variable being typed
    if (showVariables && activeAtIndex !== null && silhouettePosition !== null) {
      // The text being actively typed should be highlighted in pink
      const activeVarText = text.substring(activeAtIndex, silhouettePosition);
      
      // Only process this special case if we have an @ at the active position
      if (activeVarText.startsWith('@')) {
        const parts = [];
        let currentIndex = 0;
        
        // Add text before the active variable
        if (activeAtIndex > 0) {
          parts.push(processTextSegment(text.substring(0, activeAtIndex)));
        }
        
        // Add the active variable with pink highlighting
        parts.push(`<span class="text-ext-pink-content">${activeVarText}</span>`);
        
        // Add text after the active variable
        if (silhouettePosition < text.length) {
          parts.push(processTextSegment(text.substring(silhouettePosition)));
        }
        
        return parts.join('');
      }
    }
    
    // Regular processing for text without active variables
    return processTextSegment(text);
  };
  
  // Process a segment of text to find and format variable references
  const processTextSegment = (text: string) => {
    if (!text) return '';
    
    // Process text to highlight @ mentions
    const atMentionRegex = /@[^@\s]*(?:@|$)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Create a formatted version of the text where @ mentions are either highlighted pink or not
    while ((match = atMentionRegex.exec(text)) !== null) {
      const matchedText = match[0];
      const startIndex = match.index;
      
      // Add text before the match with primary text color
      if (startIndex > lastIndex) {
        parts.push(`<span class="text-content-primary">${text.substring(lastIndex, startIndex)}</span>`);
      }
      
      // Determine if we should highlight this match in pink
      // Only complete variables that match our list should be highlighted
      const shouldHighlight = isValidVariableReference(matchedText);
      
      // Add the matched text with appropriate highlighting
      if (shouldHighlight) {
        parts.push(`<span class="text-ext-pink-content">${matchedText}</span>`);
      } else {
        parts.push(matchedText);
      }
      
      lastIndex = startIndex + matchedText.length;
    }
    
    // Add any remaining text with primary text color
    if (lastIndex < text.length) {
      parts.push(`<span class="text-content-primary">${text.substring(lastIndex)}</span>`);
    }
    
    return parts.join('');
  };

  // Check if a match is a valid variable reference
  const isValidVariableReference = (matchText: string) => {
    // If it ends with @, it's a complete variable reference
    if (matchText.endsWith('@') && matchText.startsWith('@')) {
      // Make sure it has both start and end @ symbols
      if (matchText.length < 3) return false; // Must be at least 3 chars (@X@)
      
      // Extract the variable ID without the @ symbols
      const variableId = matchText.slice(1, -1);
      
      // Check if it exists in our variable options
      return allVariableOptions.some(option => option.id === variableId);
    }
    
    return false;
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
                      `<span class="text-content-placeholder">${getSilhouetteText()}</span>` + 
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
                options: [option]
              });
            }
            
            return acc;
          }, [] as Array<{category: string, options: any[]}>);
          
          setFilteredOptions(groupedResults);
          
          // Find the first category with options to select
          const firstCategoryWithOptions = groupedResults.findIndex(category => category.options.length > 0);
          
          // If we found a category with options
          if (firstCategoryWithOptions !== -1) {
            // If active category has no options, switch to first category with options
            const activeCategoryHasOptions = 
              activeCategoryIndex < groupedResults.length && 
              groupedResults[activeCategoryIndex]?.options.length > 0;
            
            if (!activeCategoryHasOptions) {
              // Switch to first category with results
              setActiveCategoryIndex(firstCategoryWithOptions);
            }
            
            // Reset focus to first item in filtered results
            setFocusedItemIndices({ 
              categoryIndex: activeCategoryHasOptions ? activeCategoryIndex : firstCategoryWithOptions, 
              optionIndex: 0 
            });
            
            // Update silhouette suggestion based on the first match
            const suggestion = groupedResults[activeCategoryHasOptions ? activeCategoryIndex : firstCategoryWithOptions].options[0].id;
            setSilhouetteSuggestion(suggestion);
          } else {
            // No results found
            setFocusedItemIndices(null);
            setSilhouetteSuggestion(null);
            console.log('No matching variables found for search:', term);
          }
        } else {
          // When clearing search, reset to show all categories
          // Use all category data but make sure we have their original structure
          setFilteredOptions(
            variableCategories.map(category => ({
              category: category.category,
              options: category.options
            }))
          );
          
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
            // Use the matching category index from the original list
            const matchingOriginalIndex = variableCategories.findIndex(c => 
              c.category === filteredOptions[0]?.category
            );
            setActiveCategoryIndex(matchingOriginalIndex !== -1 ? matchingOriginalIndex : 0);
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
            const nextCategoryIndex = categoryIndex + 1;
            setFocusedItemIndices({ categoryIndex: nextCategoryIndex, optionIndex: 0 });
            
            // Find the corresponding original category index
            const nextCategory = filteredOptions[nextCategoryIndex];
            const matchingOriginalIndex = variableCategories.findIndex(c => 
              c.category === nextCategory.category
            );
            
            // Update active category index to highlight the correct left menu item
            if (matchingOriginalIndex !== -1) {
              setActiveCategoryIndex(matchingOriginalIndex);
            } else {
              setActiveCategoryIndex(nextCategoryIndex);
            }
            
            // Scroll to ensure the new category is visible
            setTimeout(() => scrollToCategory(matchingOriginalIndex !== -1 ? matchingOriginalIndex : nextCategoryIndex), 0);
          }
          // Otherwise, loop back to the first option
          else {
            setFocusedItemIndices({ categoryIndex: 0, optionIndex: 0 });
            setActiveCategoryIndex(0);
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
            
            // Find the matching original category index
            const matchingOriginalIndex = variableCategories.findIndex(c => 
              c.category === lastCategory.category
            );
            setActiveCategoryIndex(matchingOriginalIndex !== -1 ? matchingOriginalIndex : lastCategoryIndex);
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
            
            // Find the matching original category index
            const matchingOriginalIndex = variableCategories.findIndex(c => 
              c.category === prevCategory.category
            );
            setActiveCategoryIndex(matchingOriginalIndex !== -1 ? matchingOriginalIndex : prevCategoryIndex);
            
            // Scroll to ensure the new category is visible
            setTimeout(() => scrollToCategory(matchingOriginalIndex !== -1 ? matchingOriginalIndex : prevCategoryIndex), 0);
          }
          // Otherwise, loop to the last option of the last category
          else {
            const lastCategoryIndex = filteredOptions.length - 1;
            const lastCategory = filteredOptions[lastCategoryIndex];
            const lastOptionIndex = lastCategory.options.length - 1;
            setFocusedItemIndices({ categoryIndex: lastCategoryIndex, optionIndex: lastOptionIndex });
            
            // Find the matching original category index
            const matchingOriginalIndex = variableCategories.findIndex(c => 
              c.category === lastCategory.category
            );
            setActiveCategoryIndex(matchingOriginalIndex !== -1 ? matchingOriginalIndex : lastCategoryIndex);
            
            // Scroll to the last category
            setTimeout(() => scrollToCategory(matchingOriginalIndex !== -1 ? matchingOriginalIndex : lastCategoryIndex), 0);
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
    try {
      if (!dropdownRef.current) {
        console.log('Dropdown reference not available');
        return;
      }
      
      // Get the original category
      const originalCategory = variableCategories[categoryIndex];
      if (!originalCategory) {
        console.log(`Original category at index ${categoryIndex} not found`);
        return;
      }
      
      // Find corresponding filtered category
      const filteredCategoryIndex = filteredOptions.findIndex(c => c.category === originalCategory.category);
      
      // Check if this category has any options in filtered results
      const hasOptions = 
        filteredCategoryIndex !== -1 && 
        filteredOptions[filteredCategoryIndex].options.length > 0;
      
      if (searchTerm && !hasOptions) {
        console.log(`Category ${originalCategory.category} has no options with the current search term`);
        return;
      }
      
      // Use the filtered category index for ref and scrolling if it exists
      const refIndex = filteredCategoryIndex !== -1 ? filteredCategoryIndex : categoryIndex;
      
      if (!categoryRefs.current[refIndex]) {
        console.log(`Category reference for ${originalCategory.category} not available`);
        return;
      }
      
      const container = dropdownRef.current;
      const element = categoryRefs.current[refIndex];
      
      if (element) {
        // Update active category first (visual feedback)
        setActiveCategoryIndex(categoryIndex);
        
        // Target position to scroll to
        const targetPosition = element.offsetTop;
        
        // Start position - current scroll position
        const startPosition = container.scrollTop;
        
        // Distance to scroll
        const distance = targetPosition - startPosition;
        
        // If no distance to scroll, just update focus
        if (distance === 0) {
          if (filteredOptions[refIndex] && filteredOptions[refIndex].options.length > 0) {
            setFocusedItemIndices({ categoryIndex: refIndex, optionIndex: 0 });
          }
          return;
        }
        
        // Duration of the scroll in milliseconds
        const duration = 300;
        
        // Start time
        let startTime: number | null = null;
        
        // Custom easing function - easeInOutQuad
        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        
        // Animation function
        const animateScroll = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          
          // Calculate progress
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Apply easing to the progress
          const easedProgress = easeInOutQuad(progress);
          
          // Calculate new position
          const newPosition = startPosition + distance * easedProgress;
          
          // Set new scroll position
          container.scrollTop = newPosition;
          
          // Continue animation if not complete
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            // Animation complete - update focus
            if (filteredOptions[refIndex] && filteredOptions[refIndex].options.length > 0) {
              setFocusedItemIndices({ categoryIndex: refIndex, optionIndex: 0 });
            }
          }
        };
        
        // Start the animation
        requestAnimationFrame(animateScroll);
      }
    } catch (error) {
      console.error('Error in scrollToCategory:', error);
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

  // Debug empty state detection
  useEffect(() => {
    // Log when we would show the empty state
    const hasResults = filteredOptions.length > 0 && filteredOptions.some(category => category.options.length > 0);
    if (showVariables && !hasResults && searchTerm) {
      console.log('Empty state shown: No results found for search term:', searchTerm);
    }
  }, [filteredOptions, showVariables, searchTerm]);

  // Calculate if we should show silhouette and what text to show
  const getSilhouetteText = () => {
    if (!showVariables || !silhouetteSuggestion || !silhouettePosition || activeAtIndex === null) {
      return null;
    }
    
    // If we have an active @ character and a current cursor position
    const typedText = value.substring(activeAtIndex + 1, silhouettePosition);
    
    // If what's been typed is already part of the suggestion, only show the rest
    if (silhouetteSuggestion.startsWith(typedText) && typedText.length > 0) {
      return silhouetteSuggestion.substring(typedText.length) + '@';
    }
    
    // Otherwise show the whole suggestion with closing @
    return silhouetteSuggestion + '@';
  };

  // Ensure category refs array is correctly sized
  useEffect(() => {
    // Reset category refs when filtered options change to ensure we have the right number of refs
    categoryRefs.current = Array(filteredOptions.length).fill(null);
  }, [filteredOptions]);

  // Initialize menu - scroll to active category when menu opens
  useEffect(() => {
    if (showVariables && categoryRefs.current.length > 0) {
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        scrollToCategory(activeCategoryIndex);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [showVariables]);

  return (
    <div className={`${className} flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4`}>
      <div className="relative w-full max-w-[400px] mx-auto">
        {/* The textarea and highlighting container */}
        <div className="relative bg-bg-surface border border-border-controls rounded-base">
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
            className="absolute top-0 left-0 right-0 bottom-0 whitespace-pre-wrap overflow-hidden pointer-events-none p-3 body-regular-text text-content-primary"
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
                  <div className="flex flex-col flex-grow space-y-1">
                    {/* Always show all categories from the original categories list, not filtered ones */}
                    {variableCategories.map((originalCategory, index) => {
                      // Find if this category exists in filtered options
                      const filteredCategory = filteredOptions.find(c => c.category === originalCategory.category);
                      
                      // Check if this category has any options in the filtered results
                      const hasOptions = filteredCategory && filteredCategory.options.length > 0;
                      
                      // Determine if this category should be disabled
                      const isDisabled = searchTerm && !hasOptions;
                      
                      return (
                        <button 
                          key={`nav-${originalCategory.category}`}
                          className={`text-left body-regular-text py-2 px-2 rounded ${
                            isDisabled
                              ? 'text-content-placeholder cursor-not-allowed'
                              : 'text-content-primary hover:bg-bg-elevation'
                          }`}
                          onClick={() => !isDisabled && scrollToCategory(index)}
                          disabled={isDisabled ? true : false}
                        >
                          {originalCategory.category}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Main content area */}
                <div className="flex-1 overflow-y-auto max-h-80 pt-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-border-controls hover:scrollbar-thumb-content-secondary scrollbar-track-transparent bg-bg-controls" ref={dropdownRef}>
                  {/* Check if there are any filtered options to display */}
                  {filteredOptions.length > 0 && filteredOptions.some(category => category.options.length > 0) ? (
                    /* Content sections without sticky headers */
                    filteredOptions.map((category, categoryIndex) => (
                      <div 
                        key={`category-${categoryIndex}`} 
                        className={`category-section ${categoryIndex > 0 ? 'mt-4 text-content-secondary' : 'text-content-secondary'}`}
                        ref={el => {
                          categoryRefs.current[categoryIndex] = el;
                        }}
                      >
                        {/* Regular header without sticky positioning or border */}
                        <div className="px-4 py-1 flex justify-between">
                          <span className="body-small-text text-content-primary">{category.category}</span>
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
                              className={`px-4 py-2 cursor-pointer text-content-secondaryoutline-none ${
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
                    ))
                  ) : (
                    /* Empty state display - shown when no variables match the search */
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-content-primary font-bold py-10">
                        <div className="uppercase tracking-wide element-regular-text">EMPTY STATE</div>
                        <div className="uppercase tracking-wide body-small-text">ADD HERE</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Manage variables button - now outside and full width */}
              <div className="text-content-action element-small-text py-2 px-4 cursor-pointer flex items-center justify-end border-t border-controls">
                Manage variables
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-content-action ml-2">
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