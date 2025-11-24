import { Plus } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import CreateNoteModal from "./CreateNoteModal";
const Navbar = ({ onCreated }) => {
  const modalRef = useRef();

  const openCreateNoteModal = () => {
    modalRef.current?.open();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="#">
            <h1 className="text-4xl font-bold text-primary font-mono tracking-wide">
              BENNOTES
            </h1>
          </Link>
          <div className="">
            <button onClick={openCreateNoteModal} className="btn btn-primary">
              <Plus />
              <span className="text-lg font-bold">New Note</span>
            </button>
          </div>
        </div>
      </div>

      <CreateNoteModal ref={modalRef} onCreated={onCreated} />
    </header>
  );
};

export default Navbar;
