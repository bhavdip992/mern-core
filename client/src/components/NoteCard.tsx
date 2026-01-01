import type { Note } from "../types/note"

interface Props {
    note: Note;
    onEdit: () => void;
    onDelete: () => void;
    onComplete: () => void;
}

const NoteCard = ({ note, onEdit, onDelete, onComplete }: Props) => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow border-0 hover:shadow-gray-100 hover:shadow-2xl hover:border-2 ${note.completed ? 'opacity-50' : ''}`}  >
            <div className="flex justify-between">
                <h3 className={`font-semibold text-gray-800 ${note.completed ? "line-through" : ''}`}>{note.title}</h3>
                <button className="completed-todos cursor-pointer hover:bg-gray-100 p-1 rounded-2xl" onClick={onComplete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                        <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
                    </svg>
                </button>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {note.content}
            </p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">
                    {new Date(note.updatedAt).toLocaleString()}
                </span>

                <div className="flex gap-2">
                    <button onClick={onEdit} className="cursor-pointer hover:bg-gray-100 p-2 rounded-2xl">✏️</button>
                    <button onClick={onDelete} className="hover:bg-gray-100 p-1.5 rounded-2xl cursor-pointer">🗑️</button>
                </div>
            </div>
        </div >

    )
}

export default NoteCard
