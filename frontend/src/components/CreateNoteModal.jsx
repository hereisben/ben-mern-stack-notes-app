import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreateNoteModal = forwardRef(({ onCreated }, ref) => {
  const dialogRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("low");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPriority("low");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    dialogRef.current?.close();
  };

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log({ title, content, priority });
      const res = await api.post("/notes", { title, content, priority });
      if (!res?.data) {
        toast.error("Error adding new note");
        return;
      }
      toast.success("Note created");
      setTitle("");
      setContent("");
      setPriority("low");
      dialogRef.current?.close();
      onCreated?.(res.data);
    } catch (error) {
      console.error("Error creating note", error);
      toast.error("Failed to add note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box ">
        <h3 className="card-title text-2xl mb-4">Create New Note</h3>
        <div className="space-y-3">
          <input
            id="title_input"
            className="input input-bordered w-full"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="content_input"
            value={content}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
          <label className="select w-full">
            <span className="priority_label label">Priority</span>
            <select
              id="priority_value"
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding ..." : "Add"}
          </button>
          <button className="btn btn-error" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default CreateNoteModal;
