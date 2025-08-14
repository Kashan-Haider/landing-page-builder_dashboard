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
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {label}
      </label>
      <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg min-h-[40px] flex items-center">
        {type === 'array' ? (
          Array.isArray(value) && value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded-md text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-400">No items</span>
          )
        ) : (
          <span className={value ? "text-slate-100" : "text-slate-400"}>
            {value || "Not set"}
          </span>
        )}
      </div>
    </div>
  );
};
