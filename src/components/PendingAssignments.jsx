import { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import SubmitAssignment from "./SubmitAssignment";


const PendingAssignments = () => {
  const {
    unSubmittedAssignments,
    formatDate,
  } = useContext(GlobalContext);
  const [assignmentId, setAssignmentId] = useState(null);
  return(
    <div className="w-full flex flex-col justify-center items-center gap-4 mt-8 shadow-xl rounded-xl border p-4">
        <div className="overflow-x-auto w-full h-[70vh] overflow-y-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Description</th>
                <th>Assigned Date</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unSubmittedAssignments && unSubmittedAssignments.length > 0 ? (
                unSubmittedAssignments
                  .slice()
                  .reverse()
                  .map((assignment) => (
                    <tr key={assignment._id} className="text-center">
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                      <td>{formatDate(assignment.assignedDate)}</td>
                      <td>{formatDate(assignment.lastDate)}</td>
                      <td>
                        <button
                          className="btn btn-accent"
                          disabled={Date.now() > new Date(assignment.lastDate)}
                          onClick={() => {
                            document
                              .getElementById("submit-assignment-modal")
                              .showModal();
                            setAssignmentId(assignment._id);
                          }}
                        >
                          {Date.now() > new Date(assignment.lastDate)
                            ? "Due"
                            : "Submit"}
                        </button>
                        <SubmitAssignment assignmentId={assignmentId} />
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No assignments available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
};

export default PendingAssignments;