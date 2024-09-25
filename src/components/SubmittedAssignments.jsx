import { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import EditSubmittedAssignment from "./EditSubmittedAssignment";

const SubmittedAssignments = () => {
  const { 
    submittedAssignments, 
    user, 
    deleteSubmittedAssignment, 
    formatDate 
  } = useContext(GlobalContext);
  const [assignmentLink, setAssignmentLink] = useState("");
  const [assignmentId, setAssignmentId] = useState(null);
  return (
    <div className="w-full flex flex-col justify-center mt-8 items-center gap-4 shadow-xl rounded-xl border p-4">
      <div className="overflow-x-auto w-full h-[70vh] overflow-y-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Assignment Link</th>
              <th>Marks</th>
              <th>Submission Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments && submittedAssignments.length > 0 ? (
              submittedAssignments.map((assignment) => (
                <tr key={assignment._id} className="text-center">
                  <td className="font-semibold">{assignment.title}</td>
                  <td>
                    {assignment.submittedBy &&
                      assignment.submittedBy
                        .filter(
                          (student) =>
                            student.studentId.toString() === user._id.toString()
                        )
                        .map((student) => (
                          <a
                            key={student._id}
                            href={student.link}
                            target="_blank"
                          >
                            {student.link}
                          </a>
                        ))}
                  </td>
                  <td
                    className={`${
                      (assignment.submittedBy &&
                        assignment.submittedBy
                          .filter(
                            (student) =>
                              student.studentId.toString() ===
                              user._id.toString()
                          )
                          .map((student) => student.marks)) < 50
                        ? "text-red-500"
                        : "text-green-500"
                    } font-semibold`}
                  >
                    {(assignment.submittedBy &&
                      assignment.submittedBy
                        .filter(
                          (student) =>
                            student.studentId.toString() === user._id.toString()
                        )
                        .map((student) => student.marks)) ||
                      0}
                    %
                  </td>
                  <td>
                    {formatDate(
                      assignment.submittedBy &&
                        assignment.submittedBy
                          .filter(
                            (student) =>
                              student.studentId.toString() ===
                              user._id.toString()
                          )
                          .map((student) => student.submissionDate)
                    )}
                  </td>
                  <td>{formatDate(assignment.lastDate)}</td>
                  <td className="flex gap-2 justify-center items-center py-12 lg:py-4">
                    <button
                      className="btn btn-success btn-outline"
                      disabled={
                        Date.now() > new Date(assignment.lastDate).getTime()
                      }
                      onClick={() => {
                        setAssignmentLink(
                          assignment.submittedBy &&
                            assignment.submittedBy
                              .filter(
                                (student) =>
                                  student.studentId.toString() ===
                                  user._id.toString()
                              )
                              .map((student) => student.link)
                        );
                        setAssignmentId(assignment._id);
                        document
                          .getElementById("edit-assignment-modal")
                          .showModal();
                      }}
                    >
                      Edit
                    </button>
                    <EditSubmittedAssignment
                      assignmentId={assignmentId}
                      assignmentLink={assignmentLink}
                      setAssignmentLink={setAssignmentLink}
                    />
                    <button
                      className="btn btn-error btn-outline"
                      disabled={
                        Date.now() > new Date(assignment.lastDate).getTime()
                      }
                      onClick={() =>
                        document
                          .getElementById(
                            `deleteSubmittedAssignmentModal-${assignment._id}`
                          )
                          .showModal()
                      }
                    >
                      Delete
                    </button>
                    <dialog
                      id={`deleteSubmittedAssignmentModal-${assignment._id}`}
                      className="modal"
                    >
                      <div className="modal-box">
                        <div className="flex flex-col gap-4 items-center justify-center mt-4">
                          <p className="font-bold">
                            Are you sure want to delete?
                          </p>
                          <button
                            className="btn btn-error"
                            onClick={() => {
                              deleteSubmittedAssignment(assignment._id);
                              document
                                .getElementById(
                                  `deleteSubmittedAssignmentModal-${assignment._id}`
                                )
                                .close();
                            }}
                          >
                            Delete
                          </button>
                          <div className="modal-action">
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={() =>
                                document
                                  .getElementById(
                                    `deleteSubmittedAssignmentModal-${assignment._id}`
                                  )
                                  .close()
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center w-full">
                <td colSpan="6" className="w-full text-center">
                  No submitted assignments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedAssignments;