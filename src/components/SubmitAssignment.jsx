import { useState, useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const SubmitAssignment = ({ assignmentId }) => {
  const { setAlert, submitAssignment, setUnSubmittedAssignments } = useContext(GlobalContext);
  const [link, setLink] = useState("");


  const handleSubmitAssignment = () => {
    if (!link) {
      setAlert({ message: "Link is required", type: "error" });
      return;
    }
    submitAssignment({ link, assignmentId }).then(() => {
      document.getElementById("submit-assignment-modal").close();
      setLink("");
      setUnSubmittedAssignments((prev) => {
        return prev.filter((assignment) => assignment._id !== assignmentId);
      })
    });
  };

  return (
    <dialog id="submit-assignment-modal" className="modal w-full">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="font-bold text-lg">Submit Assignment</h3>
        <TextField
          id="link"
          label="Assignment Link"
          type="text"
          className="w-full"
          placeholder="https://example.com"
          onChange={(e) => setLink(e.target.value)}
          value={link}
        />
        <div className="modal-action">
          <div className="flex justify-end gap-4 w-full">
            <button
              className="btn btn-ghost"
              onClick={() => {
                document.getElementById("submit-assignment-modal").close();
                setLink("");
              }}
            >
              Close
            </button>
            <button className="btn btn-accent" onClick={handleSubmitAssignment}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

SubmitAssignment.propTypes = {
  assignmentId: PropTypes.any,
};

export default SubmitAssignment;
