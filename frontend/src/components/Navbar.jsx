import { Plus } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import CreateNoteModal from "./CreateNoteModal";
const Navbar = ({ onCreated }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { logout, authUser } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success(`Logged out successfully`);
    navigate("/login");
  };

  const openCreateNoteModal = () => {
    modalRef.current?.open();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary font-mono tracking-wide">
              <span>{authUser?.name.toUpperCase()}</span>NOTES
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={openCreateNoteModal} className="btn btn-primary">
              <Plus />
              <span className="text-lg font-bold">New Note</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-outline hover:bg-warning/30"
            >
              <span className="text-lg font-bold">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <CreateNoteModal ref={modalRef} onCreated={onCreated} />
    </header>
  );
};

export default Navbar;
