import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[50rem] max-h-[90vh] p-4 overflow-y-auto">
        {title && (
          <h2 className="text-lg font-semibold mb-3">{title.toUpperCase()}</h2>
        )}

        <div className="mb-4">{children}</div>

        <div className="text-right sticky bottom-0 bg-white py-2">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
