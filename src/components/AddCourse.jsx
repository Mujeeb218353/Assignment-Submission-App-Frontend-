import { useState, useContext } from "react";
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
  } = useContext(GlobalContext);
  const [courseName, setCourseName] = useState("");
  const [city, setCity] = useState(null);
  const [campus, setCampus] = useState(null);

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

    addCourse({
      name: courseName,
      cityId: city?._id,
      campusId: campus?._id,
      userId: user._id,
    }).then(() => {
      setCourseName("");
      setCity(null);
      setCampus(null);
    });
  };

  const isOptionEqualToValue = (option, value) => option._id === value._id;

  const getOptionLabel = (option) => {
    return option.cityName || "Unknown City";
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
      <Autocomplete
        disablePortal
        id="cities"
        options={cities}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
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
        options={campuses.filter((campus) => campus.city === city?._id)}
        getOptionLabel={(option) => option.name || "Unknown Campus"}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Campus" />}
        onChange={(event, value) => setCampus(value)}
        value={campus}
      />
      <TextField
        id="courseName"
        label="Course"
        type="text"
        className="w-full"
        placeholder="Enter Course Name"
        onChange={(e) => setCourseName(e.target.value)}
        value={courseName}
      />
      <button onClick={handleAddCourse} className="btn btn-accent w-1/2 mt-2">
        ADD COURSE
      </button>
    </div>
  );
};

export default AddCourse;
