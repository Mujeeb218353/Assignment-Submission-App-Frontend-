import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField, Autocomplete } from "@mui/material";

const AddCourse = () => {
  const {
    setAlert,
    user,
    cities,
    handleCityChange,
    campuses,
    addCourse,
    handleCampusChange,
    courses,
  } = useContext(GlobalContext);
  const [courseName, setCourseName] = useState("");
  const [city, setCity] = useState(null);
  const [campus, setCampus] = useState(null);
  console.log(courses);

  useEffect(() => {
    handleCampusChange();
  }, []);

  const handleAddCourse = () => {
    if (!courseName) {
      setAlert({ message: "Course name is required", type: "error" });
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

    if (!user) {
      setAlert({ message: "Invalid user", type: "error" });
      return;
    }

    document.getElementById("addCourseModal").close();
    
    addCourse({
      name: courseName,
      cityId: city?._id,
      campusId: campus?._id,
    }).then(() => {
      setCourseName("");
      setCity(null);
      setCampus(null);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
      <button
        className="btn btn-accent w-3/4 sm:w-1/2 md:w-7/12 lg:w-3/4 xl:w-1/3"
        onClick={() => document.getElementById("addCourseModal").showModal()}
      >
        ADD COURSE
      </button>
      <dialog id="addCourseModal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg text-center">Add Course</h3>
          <Autocomplete
            disablePortal
            id="cities"
            options={cities}
            getOptionLabel={(option) => option.cityName || "Unknown City"}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={(event, value) => {
              handleCityChange(value);
              setCampus(null);
              setCity(value);
            }}
            value={city}
          />
          <Autocomplete
            disablePortal
            id="campuses"
            options={campuses.filter((campus) => campus.city === city?._id)}
            getOptionLabel={(option) => option.name || "Unknown Campus"}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Campus" />}
            onChange={(event, value) => setCampus(value)}
            value={campus}
          />
          <Autocomplete
            freeSolo
            disablePortal
            id="courseName"
            options={courses.map((course) => course.name)}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Course" onChange={(event) => setCourseName(event.target.value)}/>}
            onInputChange={(event, newInputValue) => {
              setCourseName(newInputValue);
            }}
            onChange={(event, value) => setCourseName(value)}
            value={courseName}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("addCourseModal").close();
                setCourseName("");
                setCity(null);
                setCampus(null);
              }}
            >
              X
            </button>
            <button
              onClick={handleAddCourse}
              className="btn btn-accent w-full uppercase"
            >
              Add Course
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCourse;
