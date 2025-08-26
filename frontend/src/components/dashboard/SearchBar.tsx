import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search..." 
}) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 metallic-bg rounded-lg border transition-all duration-300"
          style={{
            color: 'var(--text-primary)',
            borderColor: 'var(--border-secondary)',
            backgroundColor: 'var(--bg-secondary)'
          }}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(124, 156, 196, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-secondary)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <Search className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </div>
  );
};
