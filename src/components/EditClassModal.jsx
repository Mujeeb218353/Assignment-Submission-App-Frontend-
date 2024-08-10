import React, { useContext, useState, useEffect, useId } from "react";
import { GlobalContext } from "../context/AppContext";
import { Autocomplete, TextField } from "@mui/material";

const EditClassModal = ({ editClass_s, setEditClass_s }) => {
  const {
    setAlert,
    editClass,
    cities,
    campuses,
    courses,
    teachers,
    handleCityChange,
    handleCampusChange,
    handleCourseChange,
  } = useContext(GlobalContext);
  const uniqueId = useId();
  // console.log(editClass_s, cities, campuses, courses, teachers);
  const [className, setClassName] = useState(editClass_s.name || "");
  const [enrollmentKey, setEnrollmentKey] = useState(editClass_s.name || "");
  const [batch, setBatch] = useState(editClass_s.name || "");
  const [city, setCity] = useState(editClass_s.city || null);
  const [campus, setCampus] = useState(editClass_s.campus || null);
  const [course, setCourse] = useState(editClass_s.course || null);
  const [teacher, setTeacher] = useState(editClass_s.teacher || null);

  useEffect(() => {
    setClassName(editClass_s.name || "");
    setEnrollmentKey(editClass_s.enrollmentKey || "");
    setBatch(editClass_s.batch || "");
    setCity(editClass_s.city || null);
    setCampus(editClass_s.campus || null);
    setCourse(editClass_s.course || null);
    setTeacher(editClass_s.teacher || null);
  }, [editClass_s]);

  const handleClassUpdate = () => {
    if (!city) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!campus) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!course) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!teacher) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!className) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!batch) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }
    if (!enrollmentKey) {
      setAlert({
        message: "City is Required",
        type: "error",
      });
      return;
    }

    document.getElementById(`editClassModal-${editClass_s._id}`).close();
    editClass(
      editClass_s._id,
      className,
      batch,
      enrollmentKey,
      city,
      campus,
      course,
      teacher
    );
  };
  return (
    <div className="sm:p-4 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Class</h1>
      <TextField
        id="class-name"
        label="Class Name"
        type="text"
        className="w-full"
        placeholder="Enter Class Name"
        onChange={(e) => setClassName(e.target.value)}
        value={className}
      />
      <TextField
        id="enrollment-key"
        label="Enrollment Key"
        type="text"
        className="w-full"
        placeholder="abc123"
        onChange={(e) => setEnrollmentKey(e.target.value)}
        value={enrollmentKey}
      />
      <TextField
        id="batch"
        label="Batch"
        type="text"
        className="w-full"
        placeholder="Enter Batch"
        onChange={(e) => setBatch(e.target.value)}
        value={batch}
      />
      <Autocomplete
        disablePortal
        id={`editClassCity-${uniqueId}`}
        options={cities}
        getOptionLabel={(option) => option.cityName || "Unknown City"}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="City" />}
        onChange={(event, value) => {
          setCity(value);
          setCampus(null);
          setCourse(null);
          setTeacher(null);
          handleCityChange(value);
        }}
        value={city}
        autoComplete
      />
      <Autocomplete
        disablePortal
        id={`editClassCampus-${uniqueId}`}
        options={
          city ? campuses.filter((campus) => campus.city === city._id) : []
        }
        getOptionLabel={(option) => option.name || "Unknown Campus"}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Campus" />}
        onChange={(event, value) => {
          setCampus(value);
          setCourse(null);
          setTeacher(null);
          handleCampusChange(value);
        }}
        value={campus}
        autoComplete
      />
      <Autocomplete
        disablePortal
        id={`editClassCourse-${uniqueId}`}
        options={
          campus && campus._id
            ? courses.filter(
                (course) =>
                  Array.isArray(course.campus) &&
                  course.campus.includes(campus._id)
              )
            : []
        }
        getOptionLabel={(option) => option.name || "Unknown Course"}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Course" />}
        onChange={(event, value) => {
          handleCourseChange(value);
          setTeacher(null);
          setCourse(value);
        }}
        value={course}
      />
      <Autocomplete
        disablePortal
        className="col-span-1  sm:col-span-2"
        id={`editClassTeacher-${uniqueId}`}
        options={
          course
            ? teachers.filter(
                (teacher) =>
                  teacher.course === course?._id && teacher.city === city?._id
              )
            : []
        }
        getOptionLabel={(option) => option.fullName || "Unknown Teacher"}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => <TextField {...params} label="Teacher" />}
        onChange={(event, value) => setTeacher(value)}
        value={teacher}
      />
      <button
        className="btn btn-accent w-full xs:w-1/2 md:w-1/3 mt-2 xs:uppercase mx-auto"
        onClick={handleClassUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditClassModal;