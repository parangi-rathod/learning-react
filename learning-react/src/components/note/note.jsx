import { useState } from "react";

export function Note() {
  let [notes, setNotes] = useState([
    { id: 1, content: "Note 1", status: "active" },
    { id: 2, content: "Note 2", status: "inactive" },
  ]);

  const submitNotes = (e) => {
    e.preventDefault();
    const newNote = {
      id: notes.length + 1,
      content: e.target.elements.noteContent.value,
      status: "active", // Add default status for new notes
    };
    setNotes([...notes, newNote]);
    e.target.elements.noteContent.value = "";
  };

  const changeStatus = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              status: note.status === "active" ? "inactive" : "active",
            }
          : note
      )
    );
  };

  return (
    <>
      <h2>Add your required notes here</h2>

      <div style={{ marginBottom: "20px" }}>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              backgroundColor: note.status === "active" ? "#e8f5e8" : "#f5f5f5",
            }}
          >
            <p style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
              {note.content}
            </p>
            <p
              style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}
            >
              Status:{" "}
              <span
                style={{
                  color: note.status === "active" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {note.status}
              </span>
            </p>
            <button
              onClick={() => changeStatus(note.id)}
              style={{
                padding: "8px 12px",
                backgroundColor:
                  note.status === "active" ? "#ff6b6b" : "#51cf66",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {note.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={submitNotes}>
        <input
          type="text"
          placeholder="Enter your note"
          name="noteContent"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(
            (note) =>
              note.status === "active" && (
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.content}</td>
                  <td>{note.status}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {/* {notes.map(note => (
                <div key={note.id}>
                    <p>{note.content}</p>
                </div>
            ))} */}
    </>
  );
}
