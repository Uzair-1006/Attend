import React, { useState } from "react";

const StudentDashboard = () => {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [numStudents, setNumStudents] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerateCheckboxes = () => {
    if (numStudents > 0) {
      const newStudents = Array.from({ length: numStudents }, (_, index) => `Student ${index + 1}`);
      setStudents(newStudents);
      setAttendance(new Array(newStudents.length).fill(""));
      setSubmitted(false);
    } else {
      setStudents([]);
      setAttendance([]);
    }
  };

  const handleAttendanceChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = status;
    setAttendance(updatedAttendance);
  };

  const markAllAs = (status) => {
    setAttendance(new Array(students.length).fill(status));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="text-primary">Welcome, Class Representative!</h2>

      {!showAttendanceForm ? (
        <button
          className="btn btn-warning mt-3"
          onClick={() => setShowAttendanceForm(true)}
          style={{ width: "90%", maxWidth: "300px" }}
        >
          Take Attendance
        </button>
      ) : (
        <div className="mt-4">
          <div className="mb-3">
            <label className="form-label">Enter Number of Students:</label>
            <input
              type="number"
              className="form-control mx-auto"
              placeholder="Enter total students"
              value={numStudents}
              onChange={(e) => setNumStudents(e.target.value)}
              min="1"
              style={{ width: "90%", maxWidth: "250px" }} // Adjusted width
            />
          </div>

          <button
            className="btn btn-primary mb-3"
            onClick={handleGenerateCheckboxes}
            style={{ width: "90%", maxWidth: "300px" }}
          >
            Generate Attendance List
          </button>

          {students.length > 0 && !submitted && (
            <div className="card p-3 mt-3">
              <h5>Mark Attendance:</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                <button className="btn btn-success btn-sm" onClick={() => markAllAs("Present")}>
                  Mark All Present
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => markAllAs("Absent")}>
                  Mark All Absent
                </button>
                <button className="btn btn-warning text-dark btn-sm" onClick={() => markAllAs("Permission")}>
                  Mark All Permission
                </button>
              </div>

              {students.map((student, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between p-2 border-bottom">
                  <span className="fw-bold">{student}</span>

                  <div className="d-flex gap-2">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`attendance-${index}`}
                        checked={attendance[index] === "Present"}
                        onChange={() => handleAttendanceChange(index, "Present")}
                        style={{ transform: "scale(1.2)", cursor: "pointer", accentColor: "green" }}
                      />
                      <label className="text-success ms-1">Present</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`attendance-${index}`}
                        checked={attendance[index] === "Absent"}
                        onChange={() => handleAttendanceChange(index, "Absent")}
                        style={{ transform: "scale(1.2)", cursor: "pointer", accentColor: "red" }}
                      />
                      <label className="text-danger ms-1">Absent</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`attendance-${index}`}
                        checked={attendance[index] === "Permission"}
                        onChange={() => handleAttendanceChange(index, "Permission")}
                        style={{ transform: "scale(1.2)", cursor: "pointer", accentColor: "orange" }}
                      />
                      <label className="text-warning ms-1">Permission</label>
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-success mt-3" onClick={handleSubmit} style={{ width: "90%", maxWidth: "300px" }}>
                Submit Attendance
              </button>
            </div>
          )}

          {submitted && (
            <div className="card p-3 mt-3">
              <h5>Attendance Summary:</h5>
              <ul className="list-group">
                {students.map((student, index) => (
                  <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between ${
                      attendance[index] === "Present"
                        ? "text-success"
                        : attendance[index] === "Absent"
                        ? "text-danger"
                        : "text-warning"
                    }`}
                  >
                    <span>{student}</span>
                    <span>{attendance[index] || "Not Marked"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
