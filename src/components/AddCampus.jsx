import { Autocomplete, TextField } from "@mui/material";
import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";

const AddCampus = () => {
  const { setAlert, user, cities, addCampus } = useContext(GlobalContext);
  const [city, setCity] = useState(null);
  const [campusName, setCampusName] = useState("");

  const isOptionEqualToValue = (option, value) => option._id === value?._id;

  const getOptionLabel = (option) => option.cityName || "Unknown City";

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
        className="btn btn-accent w-3/4 sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-1/3"
        onClick={() => document.getElementById("addCampusModal").showModal()}
      >
        ADD CAMPUS
      </button>
      <dialog id="addCampusModal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg text-center">Add Campus</h3>
          <Autocomplete
            disablePortal
            id="cities"
            options={cities}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={(event, value) => setCity(value)}
            value={city}
          />
          <TextField
            id="campus"
            label="Campus"
            type="text"
            className="w-full"
            placeholder="Enter Campus"
            onChange={(e) => setCampusName(e.target.value)}
            value={campusName}
          />
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("addCampusModal").close();
                setCity(null);
                setCampusName("");
              }}
            >
              Close
            </button>
            <button
              className="btn btn-accent w-1/2 sm:w-1/3"
              onClick={handleAddCampus}
            >
              ADD CAMPUS
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCampus;