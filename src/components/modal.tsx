import React, { useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow && contentRef.current) {
      printWindow.document.write("<html><head><title>Receipt</title>");
      const tailwindStyles = Array.from(
        document.querySelectorAll("link, style")
      )
        .map((el) => el.outerHTML)
        .join("");
      printWindow.document.write(tailwindStyles);

      printWindow.document.write("</head><body>");
      printWindow.document.write("<p>customer copy</p>");
      printWindow.document.write(contentRef.current.innerHTML);
      printWindow.document.write("<p>business copy</p>");
      printWindow.document.write(contentRef.current.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-md shadow-lg w-[50rem] max-h-[80vh] flex flex-col">
        {title && (
          <h2 className="text-lg font-semibold mb-3 px-4 pt-4">
            {title.toUpperCase()}
          </h2>
        )}
        <div className="flex-1 overflow-y-auto px-4">
          <div ref={contentRef} className="mb-4">
            {children}
          </div>
        </div>
        <div className="flex justify-end gap-2 text-right sticky bottom-0 bg-white py-2 px-4">
          <button
            onClick={handlePrint}
            className="px-4 py-1 text-sm bg-gray-400 text-white rounded hover:bg-blue-500"
          >
            Print
          </button>

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
