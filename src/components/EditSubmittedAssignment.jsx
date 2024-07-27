import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const EditSubmittedAssignment = ({ assignmentId, assignmentLink, setAssignmentLink }) => {

  const { setAlert, editSubmittedAssignment } = useContext(GlobalContext);

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!assignmentLink) {
      setAlert({ message: "Link is required", type: "error" });
      return;
    }
    editSubmittedAssignment({ assignmentId, assignmentLink });
    document.getElementById("edit-assignment-modal").close();
    setAssignmentLink("");
  };

  return (
    <dialog id="edit-assignment-modal" className="modal w-full">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="font-bold text-lg">Edit Assignment</h3>
        <TextField
          id="link"
          label="Assignment Link"
          type="text"
          className="w-full"
          placeholder="https://example.com"
          onChange={(e) => setAssignmentLink(e.target.value)}
          value={assignmentLink}
        />
        <div className="modal-action">
          <div className="flex justify-end gap-4 w-full">
            <button className="btn btn-ghost" onClick={() => document.getElementById("edit-assignment-modal").close()}>
              Close
            </button>
            <button className="btn btn-accent" onClick={handleSubmitAssignment}>
              Update
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

EditSubmittedAssignment.propTypes = {
  assignmentId: PropTypes.any,
  assignmentLink: PropTypes.any,
  setAssignmentLink: PropTypes.any,
};

export default EditSubmittedAssignment;