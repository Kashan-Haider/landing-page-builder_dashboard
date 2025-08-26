import React from "react";
import { Trash2 } from "lucide-react";
import type { LandingPage } from "../../types/landingPageDataTypes";

interface DashboardHeaderProps {
  selectedPage: LandingPage | null;
  onEdit: () => void;
  onDelete: (page: LandingPage) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedPage,
  onEdit,
  onDelete,
}) => {
  return (
    <header
      className="glass-effect border-b"
      style={{ borderColor: "var(--border-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold silver-text">
              Landing Page Dashboard
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              Manage and edit your landing pages with modern metallic design
            </p>
          </div>
          {selectedPage && (
            <div className="flex gap-3">
              <button
                onClick={() => onDelete(selectedPage)}
                className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border"
                style={{
                  backgroundColor: "var(--error)",
                  borderColor: "#dc2626",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(239, 68, 68, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(239, 68, 68, 0.2)";
                }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={onEdit}
                className="px-4 py-2 rounded-lg bg-accent-primary text-white font-medium shadow-md 
             hover:bg-accent-primary bg-metallic-light active:scale-95 transition-all duration-200"
              >
                Advanced Edit Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
