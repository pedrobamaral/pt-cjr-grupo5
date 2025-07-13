import React from "react";

type ModalComentarioProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string; // Adicionando título opcional para o modal
};

export default function ModalComentario({ 
  isOpen, 
  onClose, 
  children,
  title 
}: ModalComentarioProps) {
  if (!isOpen) return null;

  // Função para fechar o modal ao pressionar Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}