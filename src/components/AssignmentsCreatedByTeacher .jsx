import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/AppContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";

function convertLocalTimeToUTCFormatted(dateString) {
  const localDateTime = new Date(`${dateString} 23:59:59.999`);
  const utcFormatted = localDateTime
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");
  return utcFormatted;
}

const AssignmentsCreatedByTeacher  = () => {
  const {
    createAssignment,
    createdAssignments,
    setAlert,
    formatDate,
    editCreatedAssignment,
    deleteCreatedAssignment,
    setAssignmentId,
    getClasses,
    classes,
  } = useContext(GlobalContext);
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    lastDate: "",
    class: null,
  });

  const [editAssignment, setEditAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    lastDate: "",
  });

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full md:w-3/4 m-auto">
  <CreateAssignment
    assignment={assignment}
    setAssignment={setAssignment}
    classes={classes}
    createAssignment={createAssignment}
  />
  <div className="flex flex-col justify-center items-center gap-4 w-full border rounded-xl">
    <h1 className="text-3xl font-bold mt-4">Assignments</h1>
    <div className="overflow-x-auto w-full">
      {createdAssignments && createdAssignments.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Class</th>
              <th>Batch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {createdAssignments
              .slice()
              .reverse()
              .map((assignment) => (
                <tr key={assignment._id} className="text-center">
                  <td className="font-bold">{assignment.title}</td>
                  <td>
                    {assignment.className.name}
                  </td>
                  <td>
                    {assignment.className.batch}
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <ViewAssignment 
                        assignment={assignment} 
                        formatDate={formatDate}
                      />
                      <EditAssignment
                        assignment={assignment}
                        editAssignment={editAssignment}
                        setEditAssignment={setEditAssignment}
                        editCreatedAssignment={editCreatedAssignment}
                        setAlert={setAlert}
                      />
                      <DeleteAssignment
                        assignmentId={assignment._id}
                        deleteCreatedAssignment={deleteCreatedAssignment}
                        setAlert={setAlert}
                      />
                      <ViewAssignmentSubmissions
                        assignmentId={assignment._id}
                        setAssignmentId={setAssignmentId}
                        setAlert={setAlert}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No assignments found</p>
      )}
    </div>
  </div>
</div>
  );
};

export default AssignmentsCreatedByTeacher;

const CreateAssignment = ({
  assignment,
  setAssignment,
  classes,
  createAssignment,
}) => {
  const handleCreateAssignment = (e) => {
    e.preventDefault();

    if (!assignment.title) {
      setAlert({ message: "Title is required", type: "error" });
      return;
    }

    if (!assignment.description) {
      setAlert({ message: "Description is required", type: "error" });
      return;
    }

    if (!assignment.lastDate) {
      setAlert({ message: "Last Date is required", type: "error" });
      return;
    }

    if (!assignment.class) {
      setAlert({ message: "Class is required", type: "error" });
      return;
    }

    if (new Date(assignment.lastDate) <= new Date()) {
      setAlert({
        message: "Last Date cannot be in the past or current date",
        type: "error",
      });
      return;
    }

    document.getElementById("create-assignment").close();

    createAssignment({
      title: assignment.title,
      description: assignment.description,
      lastDate: convertLocalTimeToUTCFormatted(assignment.lastDate),
      classId: assignment.class,
    }).then(() => {
      setAssignment({
        _id: "",
        title: "",
        description: "",
        lastDate: "",
        class: null,
      });
    });
  };

  return (
    <>
      <button
        className="btn btn-accent w-3/4 sm:w-1/2 md:w-5/12 lg:w-4/12 xl:w-3/12 my-4 sm:uppercase"
        onClick={() => document.getElementById("create-assignment").showModal()}
      >
        Add Assignment
      </button>
      <dialog id="create-assignment" className="modal">
        <div className="modal-box flex flex-col justify-center items-center gap-4 w-11/12 max-w-5xl">
          <h1 className="text-xl font-bold">Create Assignment</h1>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
          <TextField
            id="lastDate"
            name="lastDate"
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={assignment.lastDate}
            onChange={(e) =>
              setAssignment({ ...assignment, lastDate: e.target.value })
            }
          />
          <Autocomplete
            disablePortal
            id="classes"
            options={classes}
            getOptionLabel={(option) => option.name || "Unknown Class"}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Classes" />}
            onChange={(event, value) => {
              setAssignment({ ...assignment, class: value ? value._id : null });
            }}
            value={classes.find((c) => c._id === assignment.class) || null}
          />
          <div className="flex items-center justify-end gap-4 w-full">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("create-assignment").close();
                setAssignment({
                  title: "",
                  description: "",
                  lastDate: "",
                });
              }}
            >
              X
            </button>
            <button
              className="btn btn-accent w-full sm:w-1/2 lg:1/3 m-auto"
              onClick={handleCreateAssignment}
            >
              Create
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const ViewAssignmentSubmissions = ({ assignmentId, setAssignmentId, setAlert }) => {
  return (
    <>
      <Link
        to={`/assignment/${assignmentId}`}
        className="btn btn-info btn-outline"
        onClick={() => {
          setAlert(null);
          setAssignmentId(assignmentId);
        }}
      >
        View Submissions
      </Link>
    </>
  );
};

const ViewAssignment = ({ assignment, formatDate }) => {
  return (
    <>
      <button
        className="btn btn-warning btn-outline"
        onClick={() => {
          document.getElementById(`show-assignment-${assignment._id}`).showModal();
        }}
      >
        View
      </button>
      <dialog id={`show-assignment-${assignment._id}`} className="modal">
        <div className="modal-box flex flex-col justify-center items-center gap-4">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">
              {assignment.title}
            </h2>
            <p>
              <b>Description: </b>
              {assignment.description}
            </p>

            <p>
              <b>Assign Date: </b>
              {formatDate(assignment.assignedDate)}
            </p>
            <p>
              <b>Due Date: </b>
              {formatDate(assignment.lastDate)}
            </p>
            <p>
              <b>Class: </b>
              {assignment.className.name}
            </p>
            <p>
              <b>Batch: </b>
              {assignment.className.batch}
            </p>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(`show-assignment-${assignment._id}`).close()}
            >
              X
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const EditAssignment = ({
  assignment,
  editAssignment,
  setEditAssignment,
  editCreatedAssignment,
  setAlert,
}) => {
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editAssignment.title) {
      setAlert({ message: "Title is required", type: "error" });
      return;
    }

    if (!editAssignment.description) {
      setAlert({ message: "Description is required", type: "error" });
      return;
    }

    if (!editAssignment.lastDate) {
      setAlert({ message: "Last Date is required", type: "error" });
      return;
    }

    if (new Date(editAssignment.lastDate) <= new Date()) {
      setAlert({
        message: "Last Date cannot be in the past or current date",
        type: "error",
      });
      return;
    }

    document.getElementById("edit-assignment").close();

    editCreatedAssignment({
      _id: editAssignment._id,
      title: editAssignment.title,
      description: editAssignment.description,
      lastDate: editAssignment.lastDate.includes("T")
        ? editAssignment.lastDate
        : convertLocalTimeToUTCFormatted(editAssignment.lastDate),
    }).then(() => {
      setEditAssignment({
        _id: "",
        title: "",
        description: "",
        lastDate: "",
      });
    });
  };
  return (
    <>
      <button
        className="btn btn-success btn-outline"
        onClick={() => {
          document.getElementById("edit-assignment").showModal();
          setEditAssignment(assignment);
        }}
      >
        Edit
      </button>
      <dialog id="edit-assignment" className="modal">
        <div className="modal-box flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-bold">Update Assignment</h1>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={editAssignment.title}
            onChange={(e) =>
              setEditAssignment({
                ...editAssignment,
                title: e.target.value,
              })
            }
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editAssignment.description}
            onChange={(e) => {
              setEditAssignment({
                ...editAssignment,
                description: e.target.value,
              });
            }}
          />
          <TextField
            id="lastDate"
            name="lastDate"
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={
              editAssignment.lastDate
                ? editAssignment.lastDate.split("T")[0]
                : ""
            }
            onChange={(e) => {
              setEditAssignment({
                ...editAssignment,
                lastDate: e.target.value.split("T")[0],
              });
            }}
          />
          <div className="flex items-center justify-center xs:justify-end gap-4 w-full">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("edit-assignment").close();
                setEditAssignment({
                  _id: "",
                  title: "",
                  description: "",
                  lastDate: "",
                });
              }}
            >
              X
            </button>
            <button
              className="btn btn-accent w-full "
              onClick={(e) => {
                setEditAssignment({
                  ...editAssignment,
                  _id: assignment._id,
                });
                handleEditSubmit(e);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const DeleteAssignment = ({
  assignmentId,
  deleteCreatedAssignment,
  setAlert,
}) => {
  return (
    <>
      <button
        className="btn btn-error btn-outline"
        onClick={() => {
          document.getElementById("delete-modal").showModal();
        }}
      >
        Delete
      </button>
      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-4 items-center justify-center mt-4">
            <p className="font-bold text-center">
              Are you sure want to delete?
            </p>
            <button
              className="btn btn-error"
              onClick={() => {
                deleteCreatedAssignment(assignmentId);
                document.getElementById("delete-modal").close();
              }}
            >
              Delete
            </button>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("delete-modal").close()}
            >
              X
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};