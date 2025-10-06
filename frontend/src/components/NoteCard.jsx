import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { formateDate } from "../lib/formatDate";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const NoteCard = ({ note, onDeleted }) => {
  const modalRef = useRef();

  const openConfirmDeleteModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    modalRef.current?.open();
  };

  return (
    <>
      <Link
        to={`/notes/${note._id}`}
        className="card bg-base-300 hover:shadow-2xl transition-all duration-200 border-t-4 border-solid border-[#E8B86D]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content text-2xl font-bold">
            {note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-base-content/60">
              {formateDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`badge badge-md ${
                  note.priority === "low"
                    ? "badge-primary"
                    : note.priority === "medium"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {note.priority}
              </div>
              <PenSquareIcon className="size-5" />
              <button
                onClick={openConfirmDeleteModal}
                className="btn btn-ghost btn-xs text-error"
              >
                <Trash2Icon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <ConfirmDeleteModal
        ref={modalRef}
        noteID={note._id}
        onDeleted={() => onDeleted(note._id)}
      />
    </>
  );
};

export default NoteCard;
