import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [_, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes");
        console.error(error.response);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const onDeleted = (deletedID) => {
    setNotes((prev) => prev.filter((note) => note._id !== deletedID));
  };

  const onCreated = (newNote) => setNotes((prev) => [newNote, ...prev]);

  return (
    <div className="bg-primary min-h-screen">
      <Navbar onCreated={onCreated} />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {notes.length === 0 && !isRateLimited && (
          <NotesNotFound onCreated={onCreated} />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDeleted={onDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
