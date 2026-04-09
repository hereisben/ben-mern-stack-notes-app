import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import Navbar from "../components/Navbar";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";
import { formatDate } from "../lib/formatDate.js";
import { getPriorityBadge } from "../lib/getPriorityBadge.js";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        console.error(`Error fetching notes`, err);

        if (err.response?.status === 404) {
          setError("Note not found.");
        } else {
          setError("Failed to fetch note.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (!loading && error === "Note not found.") {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <NotesNotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <button onClick={() => navigate("/")} className="btn btn-ghost mb-6">
          <ArrowLeft className="size-4" />
          Back to Notes
        </button>

        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && note && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold break-words">
                    {note.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
                    <span
                      className={`badge ${getPriorityBadge(note.priority)}`}
                    >
                      {note.priority} priority
                    </span>
                    <span>Created: {formatDate(note.createdAt)}</span>
                    <span>Updated: {formatDate(note.updatedAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => modalRef.current?.open()}
                  className="btn btn-error btn-outline"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>

              <div className="divider my-0" />

              <article className="whitespace-pre-wrap break-words text-base leading-7">
                {note.content}
              </article>
            </div>
          </div>
        )}
      </main>

      <ConfirmDeleteModal
        ref={modalRef}
        noteID={id}
        onDeleted={() => navigate("/")}
      />
    </div>
  );
};

export default NoteDetailPage;
