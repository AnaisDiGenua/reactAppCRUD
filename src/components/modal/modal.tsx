interface ModalProps {
  open: boolean;
  title?: string;
  paragraph?: string;
  onClose: () => void;
  onClickDelete?: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  open,
  title,
  paragraph,
  onClose,
  onClickDelete,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}

        {paragraph && <p className="mb-4 text-gray-700">{paragraph}</p>}

        {/* Se non passi children → usa i bottoni standard */}
        {children || (
          <div className="flex justify-end gap-3 mt-6">
            <button className="button-sm button" onClick={onClose}>
              Annulla
            </button>

            {onClickDelete && (
              <button
                className="button-sm button delete-user"
                onClick={onClickDelete}
              >
                Elimina
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
