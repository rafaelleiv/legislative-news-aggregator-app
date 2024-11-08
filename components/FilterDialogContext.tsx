'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterDialogProviderProps {
  children: ReactNode;
}

interface FilterDialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const FilterDialogContext = createContext<FilterDialogContextType | undefined>(
  undefined
);

export const FilterDialogProvider = ({
  children,
}: FilterDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <FilterDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </FilterDialogContext.Provider>
  );
};

export const useFilterDialog = () => {
  const context = useContext(FilterDialogContext);
  if (context === undefined) {
    throw new Error(
      'useFilterDialog must be used within a FilterDialogProvider'
    );
  }
  return context;
};
