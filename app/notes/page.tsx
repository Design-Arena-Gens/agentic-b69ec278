"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdAdd, MdDelete, MdEdit } from "react-icons/md";

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  color: string;
}

export default function NotesPage() {
  const router = useRouter();
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-yellow-100");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Vehicle Service",
      content: "Next service due on 25th Jan. Oil change and filter replacement needed.",
      timestamp: "2024-01-15",
      color: "bg-yellow-100",
    },
    {
      id: 2,
      title: "Good Routes",
      content: "Mumbai-Pune: Take Expressway early morning (5-7 AM) to avoid traffic.",
      timestamp: "2024-01-14",
      color: "bg-blue-100",
    },
    {
      id: 3,
      title: "Customer Contacts",
      content: "Regular customer Rajesh - Airport trips every Monday. Ph: +91 98765 43210",
      timestamp: "2024-01-13",
      color: "bg-green-100",
    },
  ]);

  const noteColors = [
    { name: "Yellow", class: "bg-yellow-100" },
    { name: "Blue", class: "bg-blue-100" },
    { name: "Green", class: "bg-green-100" },
    { name: "Pink", class: "bg-pink-100" },
    { name: "Purple", class: "bg-purple-100" },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteTitle.trim() && noteContent.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        timestamp: new Date().toISOString().split("T")[0],
        color: selectedColor,
      };
      setNotes([newNote, ...notes]);
      setNoteTitle("");
      setNoteContent("");
      setSelectedColor("bg-yellow-100");
      setShowAddNote(false);
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-light pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdArrowBack className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">My Notes</h1>
          </div>
          <button
            onClick={() => setShowAddNote(!showAddNote)}
            className="bg-white text-yellow-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>
        <p className="mt-2 text-sm opacity-90">Keep track of important information</p>
      </div>

      {/* Add Note Form */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark mb-4">Create Note</h2>
            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex space-x-2">
                  {noteColors.map((color) => (
                    <button
                      key={color.class}
                      type="button"
                      onClick={() => setSelectedColor(color.class)}
                      className={`w-10 h-10 rounded-full ${color.class} border-2 ${
                        selectedColor === color.class ? "border-primary" : "border-gray-300"
                      } hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddNote(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="px-6 mt-6">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes yet</p>
            <p className="text-gray-400 text-sm mt-2">Tap the + button to create your first note</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`${note.color} p-5 rounded-xl shadow-md hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-dark text-lg">{note.title}</h3>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{note.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{note.timestamp}</span>
                  <button className="text-primary hover:text-secondary transition-colors flex items-center space-x-1">
                    <MdEdit />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
