import { Autocomplete, TextField } from "@mui/material";
import { useState, useContext, useEffect, useId } from "react";
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
    user,
  } = useContext(GlobalContext);
  const [city, setCity] = useState(editAdmin.city || null);
  const [campus, setCampus] = useState(editAdmin.campus || null);
  const [verification, setVerification] = useState(
    editAdmin.isVerified ? "true" : "false"
  );
  const uniqueId = useId();

  useEffect(() => {
    setCity(editAdmin.city || null);
    setCampus(editAdmin.campus || null);
    setVerification(editAdmin.isVerified ? "true" : "false");
  }, [editAdmin]);

  const handleLocationUpdate = () => {
    if (!city) {
      setAlert({
        message: "City is required",
        type: "error",
      });
      return;
    }
    if (!campus) {
      setAlert({
        message: "Campus is required",
        type: "error",
      });
      return;
    }
    document.getElementById(`editAdminModal-${editAdmin._id}`).close();
    editAdminCityOrCampus(
      editAdmin._id,
      city?._id,
      campus?._id,
      verification === "true"
    );
    setEditAdmin({});
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
          isOptionEqualToValue={(option, value) => option._id === value._id}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="City" />
          )}
          onChange={(event, value) => {
            setCity(value);
            setCampus(null);
            handleCityChange(value);
          }}
          value={city}
          autoComplete
        />
        <Autocomplete
          disablePortal
          id={`editAdminCampus-${uniqueId}`}
          options={
            city ? campuses.filter((campus) => campus.city === city._id) : []
          }
          getOptionLabel={(option) => option.name || "Unknown Campus"}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Campus" />
          )}
          onChange={(event, value) => {
            setCampus(value);
          }}
          value={campus}
          autoComplete
        />
        <div
          className={`flex flex-col ${user.isVerified ? "visible" : "hidden"}`}
        >
          <Autocomplete
            disablePortal
            id={`editAdminVerification-${uniqueId}`}
            options={["true", "false"]}
            sx={{ width: "100%", marginTop: "1rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Verification" />
            )}
            onChange={(event, value) => {
              setVerification(value);
            }}
            value={verification}
            autoComplete
          />
        </div>
      </div>
      <button
        className="btn btn-accent w-full md:w-1/3 xs:uppercase xs:mx-auto"
        onClick={handleLocationUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditAdminModal;