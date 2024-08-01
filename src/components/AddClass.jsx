import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import ShowClassesCard from "./ShowClassesCard";

const AddClass = () => {
  const {
    setAlert,
    user,
    teachers,
    cities,
    campuses,
    courses,
    handleCityChange,
    handleCampusChange,
    handleCourseChange,
    addClass,
  } = useContext(GlobalContext);
  const [className, setClassName] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [city, setCity] = useState(null);
  const [campus, setCampus] = useState(null);
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState("");
  const handleAddClass = async () => {
    if (!className) {
      setAlert({ message: "Class Name is required", type: "error" });
      return;
    }

    if (!enrollmentKey) {
      setAlert({ message: "Enrollment Key is required", type: "error" });
      return;
    }

    if (/\s+/.test(enrollmentKey)) {
      setAlert({
        message: "Enrollment Key cannot contain spaces",
        type: "error",
      });
      return;
    }

    if (!teacher) {
      setAlert({ message: "Teacher is required", type: "error" });
      return;
    }

    if (!city) {
      setAlert({ message: "City is required", type: "error" });
      return;
    }

    if (!campus) {
      setAlert({ message: "Campus is required", type: "error" });
      return;
    }

    if (!course) {
      setAlert({ message: "Course is required", type: "error" });
      return;
    }

    if (!batch) {
      setAlert({ message: "Batch is required", type: "error" });
      return;
    }


    if (!user) {
      setAlert({ message: "User is required", type: "error" });
      return;
    }

    try {
      await addClass({
        name: className,
        enrollmentKey,
        batch,
        teacherId: teacher._id,
        cityId: city._id,
        courseId: course._id,
        campusId: campus._id,
        userId: user._id,
      });
      setClassName('');
      setEnrollmentKey('');
      setTeacher(null);
      setCity(null);
      setCampus(null);
      setCourse(null);
      setBatch('');
    } catch (error) {
      console.log(error);
      if(error) return
    }
  };

  return (
    <ThemeProvider theme={useMaterialUIThemeChanger()}>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
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
            id="cities"
            options={cities}
            getOptionLabel={(option) => option.cityName || "Unknown City"}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={(event, value) => {
              handleCityChange(value);
              setCity(value);
            }}
            value={city}
          />
          <Autocomplete
            disablePortal
            id="campuses"
            options={
              city ? campuses.filter((campus) => campus.city === city?._id) : []
            }
            getOptionLabel={(option) => option.name || "Unknown Campus"}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Campus" />}
            onChange={(event, value) => {
              handleCampusChange(value);
              setCampus(value);
            }}
            value={campus}
          />
          <Autocomplete
            disablePortal
            id="course"
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
              setCourse(value);
            }}
            value={course}
          />
          <Autocomplete
            disablePortal
            id="teacher"
            options={
              course
                ? teachers.filter((teacher) => teacher.course === course?._id)
                : []
            }
            getOptionLabel={(option) => option.fullName || "Unknown Teacher"}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Teacher" />}
            onChange={(event, value) => setTeacher(value)}
            value={teacher}
          />
          <button
            className="btn btn-accent w-1/2 mt-2"
            onClick={handleAddClass}
          >
            Create Class
          </button>
        </div>
        <ShowClassesCard />
      </div>
    </ThemeProvider>
  );
};

export default AddClass;
