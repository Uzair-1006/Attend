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

  const handleGenerateCheckboxes = () => {
    if (numStudents > 0) {
      const newStudents = Array.from({ length: numStudents }, (_, index) => `Student ${index + 1}`);
      setStudents(newStudents);
      const initialAttendance = {};
      timeSlots.forEach(slot => {
        initialAttendance[slot] = new Array(newStudents.length).fill("");
      });
      setAttendance(initialAttendance);
    } else {
      setStudents([]);
      setAttendance({});
    }
  };

  const handleAttendanceChange = (index, status) => {
    setAttendance(prev => ({
      ...prev,
      [selectedSlot]: prev[selectedSlot].map((value, i) => (i === index ? status : value))
    }));
  };

  const handleMarkAll = (status) => {
    setAttendance(prev => ({
      ...prev,
      [selectedSlot]: new Array(students.length).fill(status)
    }));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, Class Representative!</h2>

      {!showAttendanceForm ? (
        <button className="btn-action" onClick={() => setShowAttendanceForm(true)}>
          Take Attendance
        </button>
      ) : (
        <div className="attendance-form">
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

          {students.length > 0 && (
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

              <div className="button-group">
                <button className="btn-present" onClick={() => handleMarkAll("Present")}>Mark All Present</button>
                <button className="btn-absent" onClick={() => handleMarkAll("Absent")}>Mark All Absent</button>
                <button className="btn-permission" onClick={() => handleMarkAll("Permission")}>Mark All Permission</button>
              </div>

              {students.map((student, index) => (
                <div key={index} className="attendance-row">
                  <span className="student-name">{student}</span>
                  <div className="checkbox-group">
                    <label className="checkbox-label present">
                      <input
                        type="checkbox"
                        checked={attendance[selectedSlot]?.[index] === "Present"}
                        onChange={() => handleAttendanceChange(index, "Present")}
                      />
                      Present
                    </label>
                    <label className="checkbox-label absent">
                      <input
                        type="checkbox"
                        checked={attendance[selectedSlot]?.[index] === "Absent"}
                        onChange={() => handleAttendanceChange(index, "Absent")}
                      />
                      Absent
                    </label>
                    <label className="checkbox-label permission">
                      <input
                        type="checkbox"
                        checked={attendance[selectedSlot]?.[index] === "Permission"}
                        onChange={() => handleAttendanceChange(index, "Permission")}
                      />
                      Permission
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
