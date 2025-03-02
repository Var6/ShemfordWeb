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
      <div className="bg-white rounded-lg overflow-hidden w-3/4 max-w-4xl p-6 relative h-[80vh] max-h-[80vh]">
        {/* Close button inside the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-green-700"
        >
          X
        </button>

        <div className="flex flex-col sm:flex-row h-full">
          {/* Image section */}
          <div className="relative sm:w-1/3 h-full flex-none">
            <img
              src={`/assets/${image}`}
              alt={title}
              className="w-full h-full object-cover rounded-md sticky top-4" // Sticky image
            />
          </div>

          {/* Content section */}
          <div className="sm:ml-4 sm:w-2/3 overflow-y-auto h-full">
            <h2 className="text-3xl dark:text-neutral-900 font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">By - {writer}</p>
            <div className="mt-4">{children}</div> {/* Render the passed content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
