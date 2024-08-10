import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";

const AddCity = () => {
  const { setAlert, user, addCity } = useContext(GlobalContext);
  const [cityName, setCityName] = useState("");

  const handleAddCity = () => {
    if (!cityName) {
      setAlert({ message: "City is required", type: "error" });
      return;
    }

    if (!user) {
      setAlert({ message: "Invalid user", type: "error" });
      return;
    }

    addCity({
      cityName,
      userId: user._id,
    }).then(() => {
      setCityName("");
      document.getElementById("addCityModal").close();
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
      <button
        className="btn btn-accent w-3/4 sm:w-1/2 md:w-7/12 lg:w-3/4 xl:w-1/3"
        onClick={() => document.getElementById("addCityModal").showModal()}
      >
        ADD CITY
      </button>
      <dialog id="addCityModal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg text-center">Add City</h3>
          <TextField
            id="city"
            label="City"
            type="text"
            className="w-full"
            placeholder="Enter City"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("addCityModal").close();
                setCityName("");
              }}
            >
              X
            </button>
            <button className="btn btn-accent w-full uppercase" onClick={handleAddCity}>
              Add City
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCity;
