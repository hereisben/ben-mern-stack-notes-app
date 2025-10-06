import { NotebookIcon } from "lucide-react";
import { useRef } from "react";
import CreateNoteModal from "./CreateNoteModal";

const NotesNotFound = ({ onCreated }) => {
  const modalRef = useRef();

  const openCreateNoteModal = () => {
    modalRef.current?.open();
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-xl mx-auto text-center">
      <div className="bg-base-200 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-base-200">No notes yet</h3>
      <p className="text-base-200">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <button
        onClick={openCreateNoteModal}
        className="btn btn-primary bg-base-200 text-primary"
      >
        Create Your First Note
      </button>

      <CreateNoteModal ref={modalRef} onCreated={onCreated} />
    </div>
  );
};
export default NotesNotFound;
