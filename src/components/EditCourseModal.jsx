import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/AppContext";

const EditCourseModal = ({ editCourse = { name: '', courseId: '' }, setEditCourse }) => {
  const { updateCourseName } = useContext(GlobalContext);
  const [editCourseNameBtn, setEditCourseNameBtn] = useState("Update");

  const handleEditCourseName = async() =>{
    setEditCourseNameBtn("Updating...");
    
    if (!editCourse.name) {
      setEditCourseNameBtn("Update");
      return;
    }

    await updateCourseName(editCourse);
    document.getElementById("editCourseModal").close()
    setEditCourse({ name: '', courseId: '' });
    setEditCourseNameBtn("Updated");
    setTimeout(() => {
      setEditCourseNameBtn("Update");
    },1500)
  }

  return (
    <div className="sm:p-4 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Course</h1>
      <div className="w-full grid gap-4">
        <TextField
          id="courseName"
          label="Course Name"
          type="text"
          className="w-full"
          onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
          value={editCourse.name || ''}
        />
      </div>
      <button className="btn btn-accent w-full md:w-1/3 xs:uppercase xs:mx-auto" onClick={handleEditCourseName}>
        {editCourseNameBtn}
      </button>
    </div>
  );
};

export default EditCourseModal;