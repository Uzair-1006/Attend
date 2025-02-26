import React, { useState } from "react";
import "./StudentDashboard.css";

const timeSlots = [
  "9:10 - 10:10 AM", "10:10 - 11:10 AM", "11:10 - 12:10 PM", "12:10 - 1:10 PM",
  "1:10 - 2:10 PM", "2:10 - 3:10 PM", "3:10 - 4:10 PM", "4:10 - 5:00 PM"
];

const StudentDashboard = () => {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [numStudents, setNumStudents] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [submittedAttendance, setSubmittedAttendance] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const handleGenerateCheckboxes = () => {
    if (numStudents > 0) {
      const newStudents = Array.from({ length: numStudents }, (_, index) => `Student ${index + 1}`);
      setStudents(newStudents);
      const initialAttendance = {};
      timeSlots.forEach(slot => {
        initialAttendance[slot] = new Array(newStudents.length).fill(1); // Default to Present (1)
      });
      setAttendance(initialAttendance);
    } else {
      setStudents([]);
      setAttendance({});
    }
  };

  const handleAttendanceChange = (index) => {
    setAttendance(prev => ({
      ...prev,
      [selectedSlot]: prev[selectedSlot].map((value, i) =>
        i === index ? (value === 1 ? 0 : 1) : value // Toggle between 1 (Present) and 0 (Absent)
      )
    }));
  };

  const handleMarkAll = (status) => {
    setAttendance(prev => ({
      ...prev,
      [selectedSlot]: new Array(students.length).fill(status) // Mark all as Present (1) or Absent (0)
    }));
  };

  const handleSubmitAttendance = () => {
    setSubmittedAttendance(prev => ({
      ...prev,
      [selectedSlot]: [...attendance[selectedSlot]]
    }));
    setIsEditable(false);
    alert(`Attendance for ${selectedSlot} submitted successfully!`);
  };

  // Calculate total present and absent students
  const totalPresent = attendance[selectedSlot]?.filter(status => status === 1).length || 0;
  const totalAbsent = attendance[selectedSlot]?.filter(status => status === 0).length || 0;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, Class Representative!</h2>
      {!showAttendanceForm ? (
        <button className="btn-action" onClick={() => setShowAttendanceForm(true)}>
          Take Attendance
        </button>
      ) : (
        <div className="attendance-form">
          {!submittedAttendance[selectedSlot] ? (
            <>
              <div className="input-group">
                <label>Enter Number of Students:</label>
                <input
                  type="number"
                  className="input-box"
                  placeholder="Enter total students"
                  value={numStudents}
                  onChange={(e) => setNumStudents(e.target.value)}
                  min="1"
                />
              </div>
              <button className="btn-action" onClick={handleGenerateCheckboxes}>
                Generate Attendance List
              </button>
            </>
          ) : null}
          {students.length > 0 && (!submittedAttendance[selectedSlot] || isEditable) && (
            <div className="attendance-card">
              <h5>Select Time Slot:</h5>
              <select
                className="time-slot-selector"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>

              {/* Box for Mark All Buttons and Attendance Summary */}
              <div className="mark-all-summary-box">
                <div className="mark-all-buttons">
                  <button className="btn-present" onClick={() => handleMarkAll(1)}>Mark All Present</button>
                  <button className="btn-absent" onClick={() => handleMarkAll(0)}>Mark All Absent</button>
                </div>
                <div className="student-buttons-container">
                {students.map((_, index) => (
                  <button
                    key={index}
                    className={`student-toggle-button ${
                      attendance[selectedSlot]?.[index] === 1 ? "present" : "absent"
                    }`}
                    onClick={() => handleAttendanceChange(index)}
                  >
                    {index + 1} {/* Display only the number */}
                  </button>
                ))}
              </div>
                <div className="attendance-summary">
                  <p>Total Present: <span className="status-present">{totalPresent}</span></p>
                  <p>Total Absent: <span className="status-absent">{totalAbsent}</span></p>
                </div>
              </div>

              
              <button className="btn-submit" onClick={handleSubmitAttendance}>
                Submit Attendance
              </button>
            </div>
          )}
          {/* Display Submitted Attendance for the Selected Time Slot */}
          {submittedAttendance[selectedSlot] && !isEditable && (
            <div className="submitted-attendance">
              <h3>Submitted Attendance for {selectedSlot}</h3>
              {students.map((_, index) => {
                const status = submittedAttendance[selectedSlot]?.[index];
                let statusClass = "";
                if (status === 1) statusClass = "status-present";
                else if (status === 0) statusClass = "status-absent";
                return (
                  <p key={index} className={`submitted-student ${statusClass}`}>
                    {index + 1}: {status === 1 ? "Present" : "Absent"}
                  </p>
                );
              })}
              <button className="btn-update" onClick={() => setIsEditable(true)}>
                Update Attendance
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;