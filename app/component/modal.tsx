import React, { ReactNode } from 'react';

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
 if (!isOpen) return null;

 return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="mt-4 bg-gray-200 p-2 rounded">Close</button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
 );
};

export default Modal;
