import React from "react";
import { Plus } from "lucide-react";
import type { DaySchedule } from "../../types/landingPageDataTypes";

interface BusinessHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface BusinessHoursInputProps {
  label: string;
  value: DaySchedule[];
  onChange: (value: DaySchedule[]) => void;
  required?: boolean;
}

// Convert DaySchedule to BusinessHour for editing
const dayScheduleToBusinessHour = (daySchedule: DaySchedule): BusinessHour => {
  const firstPeriod = daySchedule.periods?.[0];
  return {
    day: daySchedule.day,
    isOpen: !daySchedule.isClosed,
    openTime: firstPeriod?.open || "09:00",
    closeTime: firstPeriod?.close || "17:00"
  };
};

// Convert BusinessHour back to DaySchedule for storage
const businessHourToDaySchedule = (businessHour: BusinessHour): DaySchedule => {
  return {
    day: businessHour.day,
    isClosed: !businessHour.isOpen,
    periods: businessHour.isOpen ? [{
      open: businessHour.openTime,
      close: businessHour.closeTime
    }] : []
  };
};

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const BusinessHoursInput: React.FC<BusinessHoursInputProps> = ({
  label,
  value = [],
  onChange,
  required = false,
}) => {
  // Initialize with all days if empty
  const initializeHours = () => {
    const defaultHours = DAYS_OF_WEEK.map(day => ({
      day,
      isClosed: day === "Saturday" || day === "Sunday",
      periods: day === "Saturday" || day === "Sunday" ? [] : [{
        open: "09:00",
        close: "17:00"
      }]
    }));
    onChange(defaultHours);
  };

  // Convert DaySchedule to BusinessHour for editing and ensure we have all days represented
  const normalizedValue = React.useMemo(() => {
    if (value.length === 0) return [];
    
    const allDays = DAYS_OF_WEEK.map(day => {
      const existing = value.find(h => h.day === day);
      if (existing) {
        return dayScheduleToBusinessHour(existing);
      }
      return {
        day,
        isOpen: day === "Saturday" || day === "Sunday" ? false : true,
        openTime: "09:00",
        closeTime: "17:00"
      };
    });
    
    return allDays;
  }, [value]);

  const updateDay = (dayIndex: number, updates: Partial<BusinessHour>) => {
    const newValue = [...normalizedValue];
    newValue[dayIndex] = { ...newValue[dayIndex], ...updates };
    // Convert back to DaySchedule format
    const daySchedules = newValue.map(businessHourToDaySchedule);
    onChange(daySchedules);
  };

  const toggleAllDays = (isOpen: boolean) => {
    const newValue = normalizedValue.map(hour => ({
      ...hour,
      isOpen
    }));
    // Convert back to DaySchedule format
    const daySchedules = newValue.map(businessHourToDaySchedule);
    onChange(daySchedules);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {normalizedValue.length === 0 && (
          <button
            type="button"
            onClick={initializeHours}
            className="btn-metallic px-3 py-1 text-sm rounded flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hours</span>
          </button>
        )}
      </div>

      {normalizedValue.length > 0 && (
        <div className="space-y-3">
          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => toggleAllDays(true)}
              className="btn-metallic px-3 py-1 text-sm rounded"
            >
              Open All Days
            </button>
            <button
              type="button"
              onClick={() => toggleAllDays(false)}
              className="btn-metallic px-3 py-1 text-sm rounded"
            >
              Close All Days
            </button>
          </div>

          {/* Days List */}
          <div className="space-y-2">
            {normalizedValue.map((hour, index) => (
              <div
                key={hour.day}
                className="flex items-center space-x-3 p-3 rounded-lg border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-secondary)",
                }}
              >
                {/* Day Name */}
                <div className="w-20 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {hour.day}
                </div>

                {/* Open/Closed Toggle */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hour.isOpen}
                    onChange={(e) => updateDay(index, { isOpen: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {hour.isOpen ? "Open" : "Closed"}
                  </span>
                </label>

                {/* Time Inputs */}
                {hour.isOpen && (
                  <>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        From:
                      </label>
                      <input
                        type="time"
                        value={hour.openTime}
                        onChange={(e) => updateDay(index, { openTime: e.target.value })}
                        className="px-2 py-1 text-sm rounded border"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-secondary)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        To:
                      </label>
                      <input
                        type="time"
                        value={hour.closeTime}
                        onChange={(e) => updateDay(index, { closeTime: e.target.value })}
                        className="px-2 py-1 text-sm rounded border"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-secondary)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
