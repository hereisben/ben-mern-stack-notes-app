import { TriangleAlertIcon } from "lucide-react";

const NotesErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-xl mx-auto text-center">
      <div className="bg-base-200 rounded-full p-8">
        <TriangleAlertIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-base-200">Fail to load notes</h3>
      <p className="text-base-200">
        Something went wrong while loading your notes. Please try again.
      </p>
    </div>
  );
};

export default NotesErrorState;
