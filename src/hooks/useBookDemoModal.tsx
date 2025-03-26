
import React, { createContext, useContext, useState } from "react";

// Define the context type
type BookDemoModalContextType = {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
};

// Create context with default values
const BookDemoModalContext = createContext<BookDemoModalContextType>({
  isOpen: false,
  openDemoModal: () => {},
  closeDemoModal: () => {},
});

// Hook to use the BookDemoModal context
export const useBookDemoModal = () => useContext(BookDemoModalContext);

// Provider component
export const BookDemoModalProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <BookDemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
      {/* If you have a BookDemoModal component, you could render it here */}
    </BookDemoModalContext.Provider>
  );
};
