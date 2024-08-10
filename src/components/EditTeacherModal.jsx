import { Autocomplete, TextField } from "@mui/material";
import { useState, useContext, useEffect, useId } from "react";
import { GlobalContext } from "../context/AppContext";

const EditTeacherModal = ({
  editTeacher = {
    _id: "",
    isVerified: false,
  },
  setEditTeacher,
}) => {
  const { editTeacherVerification } = useContext(GlobalContext);

  const [verification, setVerification] = useState(
    editTeacher.isVerified ? "true" : "false"
  );
  const uniqueId = useId();

  useEffect(() => {
    setVerification(editTeacher.isVerified ? "true" : "false");
  }, [editTeacher]);

  const handleTeacherUpdate = () => {
    document.getElementById(`editTeacherModal-${editTeacher._id}`).close();
    editTeacherVerification(editTeacher._id, verification === "true");
    setEditTeacher({});
  };

  return (
    <div className="sm:p-4 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Teacher</h1>
      <Autocomplete
        disablePortal
        id={`editTeacherVerification-${uniqueId}`}
        options={["true", "false"]}
        sx={{ width: "100%", marginTop: "1rem" }}
        renderInput={(params) => <TextField {...params} label="Verification" />}
        onChange={(event, value) => {
          setVerification(value);
        }}
        value={verification}
        autoComplete
      />
      <button
        className="btn btn-accent w-full xs:uppercase xs:mx-auto"
        onClick={handleTeacherUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditTeacherModal;