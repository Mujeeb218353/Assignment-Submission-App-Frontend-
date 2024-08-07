import { Autocomplete, TextField } from "@mui/material";
import { useState, useContext, useId } from "react";
import { GlobalContext } from "../context/AppContext";

const EditAdminModal = ({
  editAdmin = {
    _id: "",
    isVerified: false,
    campus: { _id: "", name: "" },
    city: { _id: "", cityName: "" },
  },
  setEditAdmin,
}) => {
  const {
    cities,
    handleCityChange,
    campuses,
    editAdminCityOrCampus,
    setAlert,
  } = useContext(GlobalContext);
  const [editAdminBtn, setEditAdminBtn] = useState("Update");
  const [city, setCity] = useState(null);
  const [campus, setCampus] = useState(null);
  const uniqueId = useId();
  console.log(cities);

  const handleLocationUpdate = () => {
    setEditAdminBtn("Updating...");
    document.getElementById(`editAdminModal-${editAdmin._id}`).close();
    if (
      city._id === editAdmin.city._id &&
      campus._id === editAdmin.campus._id
    ) {
      setAlert({
        message: "City and campus were not updated since they are the same.",
        type: "error",
      });
    } else {
      editAdminCityOrCampus(editAdmin._id, city?._id, campus?._id);
    }
    setEditAdminBtn("Update");
  };

  return (
    <div className="sm:p-4 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Admin</h1>
      <div className="flex flex-col gap-4">
        <Autocomplete
          disablePortal
          id={`editAdminCity-${uniqueId}`}
          options={cities}
          getOptionLabel={(option) => option.cityName || "Unknown City"}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="City" id={uniqueId}/>}
          onChange={(event, value) => {
            handleCityChange(value);
            setCity(value);
          }}
          value={city}
        />
        <Autocomplete
          disablePortal
          id={`editAdminCourse-${uniqueId}`}
          options={
            city ? campuses.filter((campus) => campus.city === city?._id) : []
          }
          getOptionLabel={(option) => option.name || "Unknown Campus"}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Campus" id={uniqueId}/>}
          onChange={(event, value) => {
            setCampus(value);
          }}
          value={campus}
        />
      </div>
      <button
        className="btn btn-accent w-full md:w-1/3 xs:uppercase xs:mx-auto"
        onClick={handleLocationUpdate}
      >
        {editAdminBtn}
      </button>
    </div>
  );
};

export default EditAdminModal;