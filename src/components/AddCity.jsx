import { GlobalContext } from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const AddCity = () => {
  const { setAlert, user, addCity, cities, getCity } = useContext(GlobalContext);
  const [cityName, setCityName] = useState("");

  console.log(cities);
  
  useEffect(() => {
    getCity()
  }, []);

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
      <dialog id="addCityModal" className={`modal`}>
        <div className={`modal-box flex flex-col gap-4 h-[50vh] justify-center`}>
          <h3 className="font-bold text-lg text-center uppercase">Add City</h3>
          <Autocomplete
            freeSolo
            disablePortal
            id="cities"
            options={cities.map((city) => city.cityName)}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="City" onChange={(event) => setCityName(event.target.value)}/>}
            onInputChange={(event, newInputValue) => {
              setCityName(newInputValue);
            }}
            onChange={(event, value) => setCityName(value)}
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
            <button 
              className="btn btn-accent w-full uppercase" 
              onClick={handleAddCity}>
              Add City
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCity;
