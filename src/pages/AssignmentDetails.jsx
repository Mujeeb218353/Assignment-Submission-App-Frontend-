import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";

const AssignmentDetails = () => {
  const theme = useMaterialUIThemeChanger();
  const {
    setAlert,
    assignmentId,
    formatDate,
    studentsSubmittedAssignment,
    studentsNotSubmittedAssignment,
    getStudentsSubmittedAssignment,
    getStudentsNotSubmittedAssignment,
    assignMarks,
  } = useContext(GlobalContext);

  const location = useLocation();
  const [updateMarks, setUpdateMarks] = useState({
    marks: 0,
    studentId: "",
    assignmentId: assignmentId ? assignmentId : location.pathname.split("/")[1],
  });

  useEffect(() => {
    getStudentsSubmittedAssignment(assignmentId);
    getStudentsNotSubmittedAssignment(assignmentId);
  }, [assignmentId]);

  const mergedStudents = studentsSubmittedAssignment.submittedBy
    ? [
        ...studentsSubmittedAssignment.submittedBy,
        ...studentsNotSubmittedAssignment.map((student) => ({
          studentId: {
            _id: student._id,
            fullName: student.fullName,
          },
          rollNo: student.rollNo || "",
          marks: 0,
          link: null,
          submissionDate: null,
        })),
      ]
    : [];

  const handleUpdateMarks = (e) => {
    e.preventDefault();

    if (updateMarks.marks < 0 || updateMarks.marks > 100) {
      setAlert({
        message: "Marks should be between 0 and 100",
        type: "error",
      });
      return;
    }

    if (!updateMarks.marks) {
      setAlert({
        message: "Marks cannot be empty",
        type: "error",
      });
      return;
    }

    assignMarks(updateMarks).then(() => {
      setUpdateMarks({
        marks: 0,
        studentId: "",
        assignmentId: assignmentId
          ? assignmentId
          : location.pathname.split("/")[1],
      });
    });

    document.getElementById("edit-assignment-marks-modal").close();
  };

  const percentage = (studentsSubmittedAssignment?.submittedBy?.length / mergedStudents?.length) * 100 || 0;
  percentage-50


  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen py-20 px-4 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {studentsSubmittedAssignment.title || ""}
        </h1>
        <div className="overflow-x-auto w-full mb-4 p-4 flex flex-col justify-center items-center">
        <div className="w-full max-w-md mx-auto p-4 shadow-md rounded-lg">
            <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold ">Assignment Submissions</span>
                <span className="text-lg font-semibold text-center">
                    {studentsSubmittedAssignment?.submittedBy?.length}/{mergedStudents?.length} Students
                </span>
            </div>
            <div className="w-full bg-gray-400 rounded-full h-4">
                <div
                    className={`h-full rounded-full ${
                        percentage >= 75 ? 'bg-accent' : percentage >= 50 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="mt-2 text-right">
                <span className="text-sm text-gray-500">{percentage}% Submitted</span>
            </div>
        </div>
        </div>
        <div className="overflow-x-auto shadow-xl rounded-md w-full">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Roll No.</th>
                <th>Name</th>
                <th>Link</th>
                <th>Submission Date</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mergedStudents.length > 0 ? (
                mergedStudents.map((data, index) => (
                  <tr key={index} className="text-center">
                    <td>{data.rollNo || ""}</td>
                    <td>{data.studentId.fullName}</td>
                    <td>
                      {data.link ? (
                        <a
                          href={data.link}
                          className=""
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.link}
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {data.submissionDate
                        ? formatDate(data.submissionDate)
                        : ""}
                    </td>
                    <td
                      className={`${
                        data.marks < 50 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {data.marks}%
                    </td>
                    <td>
                      {data.link ? (
                        <div>
                          <button
                            className="btn btn-accent"
                            onClick={() => {
                              setUpdateMarks({
                                marks: data.marks,
                                studentId: data.studentId._id,
                                assignmentId: assignmentId
                                  ? assignmentId
                                  : location.pathname.split("/")[1],
                              });
                              document
                                .getElementById("edit-assignment-marks-modal")
                                .showModal();
                            }}
                          >
                            Update
                          </button>
                          <dialog
                            id="edit-assignment-marks-modal"
                            className="modal w-full"
                          >
                            <div className="modal-box flex flex-col gap-4">
                              <h3 className="font-bold text-lg">
                                Update Marks
                              </h3>
                              <TextField
                                id="marks"
                                label="Marks"
                                type="text"
                                className="w-full"
                                placeholder="0-100"
                                variant="outlined"
                                onChange={(e) =>
                                  setUpdateMarks({
                                    ...updateMarks,
                                    marks: e.target.value,
                                  })
                                }
                                value={updateMarks.marks}
                              />
                              <div className="modal-action">
                                <div className="flex justify-end gap-4 w-full">
                                  <button
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={() => {
                                      document
                                        .getElementById(
                                          "edit-assignment-marks-modal"
                                        )
                                        .close();
                                      setUpdateMarks({
                                        marks: 0,
                                        studentId: "",
                                        assignmentId: "",
                                      });
                                    }}
                                  >
                                    X
                                  </button>
                                  <button
                                    className="btn btn-accent w-full"
                                    onClick={handleUpdateMarks}
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      ) : (
                        <button className="btn btn-disabled" disabled>
                          Assign Marks
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AssignmentDetails;
