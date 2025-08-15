import React from 'react';

interface FieldDisplayProps {
  label: string;
  value: any;
  type?: 'text' | 'email' | 'number' | 'textarea' | 'array';
}

export const FieldDisplay: React.FC<FieldDisplayProps> = ({ 
  label, 
  value, 
  type = 'text' 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
        {label}
      </label>
      <div className="p-3 metallic-bg rounded-lg min-h-[40px] flex items-center border" style={{ borderColor: 'var(--border-secondary)' }}>
        {type === 'array' ? (
          Array.isArray(value) && value.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {value.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium border"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)',
                    borderColor: 'var(--accent-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>No items</span>
          )
        ) : (
          <span style={{ color: value ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
            {value || "Not set"}
          </span>
        )}
      </div>
    </div>
  );
};
