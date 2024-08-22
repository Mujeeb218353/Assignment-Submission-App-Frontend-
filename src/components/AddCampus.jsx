import { Autocomplete, TextField } from "@mui/material";
import { GlobalContext } from "../context/AppContext";
import { useContext, useState, useEffect } from "react";

const AddCampus = () => {
  const { setAlert, user, cities, addCampus, handleCityChange, campuses } = useContext(GlobalContext);
  const [city, setCity] = useState(null);
  const [campusName, setCampusName] = useState("");

  useEffect(() => {
    handleCityChange();
  },[])
  const handleAddCampus = () => {
    if (!city) {
      setAlert({ message: "City is required", type: "error" });
      return;
    }

    if (!campusName) {
      setAlert({ message: "Campus is required", type: "error" });
      return;
    }

    if (!user) {
      setAlert({ message: "Invalid user", type: "error" });
      return;
    }

    addCampus({ name: campusName, cityId: city._id, userId: user._id }).then(
      () => {
        setCampusName("");
        setCity(null);
        document.getElementById("addCampusModal").close()
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
      <button
        className="btn btn-accent w-3/4 sm:w-1/2 md:w-7/12 lg:w-3/4 xl:w-1/3"
        onClick={() => document.getElementById("addCampusModal").showModal()}
      >
        ADD CAMPUS
      </button>
      <dialog id="addCampusModal" className="modal">
        <div className="modal-box flex flex-col gap-4 h-[80vh] justify-center">
          <h3 className="font-bold text-lg text-center uppercase">Add Campus</h3>
          <Autocomplete
            disablePortal
            id="cities"
            options={cities}
            getOptionLabel={(option) => option.cityName || "Unknown City"}
            isOptionEqualToValue={(option, value) => option._id === value?._id}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={(event, value) => setCity(value)}
            value={city}
          />
          <Autocomplete
            freeSolo
            disablePortal
            id="campuses"
            options={campuses.map((campus) => campus.name)}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Campus"  onChange={(event) => setCampusName(event.target.value)}/>}
            onInputChange={(event, newInputValue) => {
              setCampusName(newInputValue);
            }}
            onChange={(event, value) => setCampusName(value)}
            value={campusName}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("addCampusModal").close();
                setCity(null);
                setCampusName("");
              }}
            >
              X
            </button>
            <button
              className="btn btn-accent w-full uppercase"
              onClick={handleAddCampus}
            >
              Add Campus
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCampus;