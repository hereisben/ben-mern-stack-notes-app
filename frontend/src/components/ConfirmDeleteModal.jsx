import { CircleAlert } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const ConfirmDeleteModal = forwardRef(({ noteID, onDeleted }, ref) => {
  const dialogRef = useRef();

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${noteID}`);
      toast.success("Note deleted successfully");
      dialogRef.current?.close();
      onDeleted();
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} className="modal">
      <div
        role="alert"
        className="modal-box alert alert-vertical sm:alert-horizontal"
      >
        <CircleAlert className="text-error" />
        <span className="font-bold">Are you sure to delete this note?</span>
        <div>
          <button
            onClick={() => dialogRef.current?.close()}
            className="btn btn-sm"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmDeleteModal;
