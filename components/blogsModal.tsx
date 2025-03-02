// BlogModal.tsx
import React from "react";

interface ModalProps {
  title: string;
  writer: string;
  image: string;
  onClose: () => void;
  children: React.ReactNode;  // Use children to render content dynamically
}

const BlogModal: React.FC<ModalProps> = ({ title, writer, image, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-3/4 max-w-4xl p-6 relative">
        {/* Close button inside the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-green-700"
        >
          X
        </button>

        <div className="flex flex-col items-center justify-center sm:flex-row">
          <img src={`/assets/${image}`} alt={title} className="w-full sm:w-1/3 h-64 object-cover items-center justify-center " />
          <div className="sm:ml-4 sm:w-2/3">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">By {writer}</p>
            <div className="mt-4">{children}</div> {/* Render the passed content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
