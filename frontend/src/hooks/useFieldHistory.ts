import { useState, useCallback } from 'react';

interface HistoryEntry<T> {
  data: T;
  timestamp: Date;
  description?: string;
}

export const useFieldHistory = <T>(initialData: T, maxHistorySize = 50) => {
  const [history, setHistory] = useState<HistoryEntry<T>[]>([
    { data: initialData, timestamp: new Date(), description: 'Initial state' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushHistory = useCallback((data: T, description?: string) => {
    setHistory(prev => {
      // Remove any history after current index (when user made changes after undo)
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Add new entry
      newHistory.push({
        data: JSON.parse(JSON.stringify(data)), // Deep copy
        timestamp: new Date(),
        description
      });

      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize);
      }

      return newHistory;
    });

    setCurrentIndex(prev => {
      const newIndex = Math.min(prev + 1, maxHistorySize - 1);
      return newIndex;
    });
  }, [currentIndex, maxHistorySize]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      return history[newIndex].data;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      return history[newIndex].data;
    }
    return null;
  }, [currentIndex, history]);

  const jumpToHistory = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      setCurrentIndex(index);
      return history[index].data;
    }
    return null;
  }, [history]);

  const getCurrentData = useCallback(() => {
    return history[currentIndex]?.data || null;
  }, [currentIndex, history]);

  const getHistoryEntry = useCallback((index: number) => {
    return history[index] || null;
  }, [history]);

  return {
    history,
    currentIndex,
    pushHistory,
    undo,
    redo,
    jumpToHistory,
    getCurrentData,
    getHistoryEntry,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    historySize: history.length
  };
};
