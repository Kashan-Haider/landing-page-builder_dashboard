import { useEffect, useRef, useState } from 'react';

interface UseAutoSaveOptions {
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = <T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  options: UseAutoSaveOptions = {}
) => {
  const { delay = 2000, enabled = true } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousDataRef = useRef<T>(data);

  useEffect(() => {
    if (!enabled) return;
    
    // Don't save if data hasn't changed
    if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) {
      return;
    }

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set up new save timeout
    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      setError(null);
      
      try {
        await onSave(data);
        setLastSaved(new Date());
        previousDataRef.current = data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save');
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, onSave, delay, enabled]);

  // Manual save function
  const saveNow = async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      await onSave(data);
      setLastSaved(new Date());
      previousDataRef.current = data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    lastSaved,
    error,
    saveNow
  };
};
