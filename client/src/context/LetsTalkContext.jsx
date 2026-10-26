import { createContext, useContext, useState } from "react";

const LetsTalkContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useLetsTalk = () => useContext(LetsTalkContext);

export function LetsTalkProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LetsTalkContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LetsTalkContext.Provider>
  );
}

export default LetsTalkProvider;
