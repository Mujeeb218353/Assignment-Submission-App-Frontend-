import { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import SubmitAssignment from "./SubmitAssignment";

const PendingAssignments = () => {
  const { unSubmittedAssignments, formatDate } = useContext(GlobalContext);
  const [assignmentId, setAssignmentId] = useState(null);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 mt-8 shadow-xl rounded-xl border p-4">
      <div className="overflow-x-auto w-full h-[70vh] overflow-y-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Assign Date</th>
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
                    <td>{formatDate(assignment.assignedDate)}</td>
                    <td>{formatDate(assignment.lastDate)}</td>
                    <td className="flex gap-4 justify-center">
                      <button
                        className="btn btn-info btn-outline"
                        onClick={() => {
                          document
                            .getElementById(
                              `show-assignment-modal-${assignment._id}`
                            )
                            .showModal();
                        }}
                      >
                        Description
                      </button>
                      <ShowAssignment assignment={assignment} />
                      <button
                        className="btn btn-accent btn-outline"
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
  );
};

export default PendingAssignments;

const ShowAssignment = ({ assignment }) => {
  const { formatDate } = useContext(GlobalContext);
  return (
    <dialog className="modal" id={`show-assignment-modal-${assignment._id}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg text-center mb-4">
          {assignment.title}
        </h3>
        <div className="flex flex-col gap-4">
          <p className="w-full text-center">
            <b>Description</b>
            <p>{assignment.description}</p>
          </p>
          <p className="w-full text-center">
            <b>Assign Date</b>
            <p>{formatDate(assignment.assignedDate)}</p>
          </p>
          <p className="w-full text-center">
            <b>Due Date</b>
            <p>{formatDate(assignment.lastDate)}</p>
          </p>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              document
                .getElementById(`show-assignment-modal-${assignment._id}`)
                .close()
            }
          >
            X
          </button>
        </div>
      </div>
    </dialog>
  );
};
