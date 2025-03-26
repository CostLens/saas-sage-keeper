
import React, { createContext, useContext, useState } from "react";
import { BookDemoModal } from "@/components/BookDemoModal";

interface BookDemoModalContextType {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

const BookDemoModalContext = createContext<BookDemoModalContextType>({
  isOpen: false,
  openDemoModal: () => {},
  closeDemoModal: () => {},
});

export const BookDemoModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <BookDemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
      <BookDemoModal isOpen={isOpen} onClose={closeDemoModal} />
    </BookDemoModalContext.Provider>
  );
};

export const useBookDemoModal = () => useContext(BookDemoModalContext);
