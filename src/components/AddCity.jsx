import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";

const AddCity = () => {
  const { setAlert, user, addCity } = useContext(GlobalContext);
  const [cityName, setCityName] = useState("");

  const handleAddCity =  () => {

    if (!cityName) {
      setAlert({ message: "City is required", type: "error" });
      return;
    }

    if(!user){
      setAlert({ message: "Invalid user", type: "error" });
      return;
    }

    addCity({ 
      cityName, 
      userId: user._id 
    }).then(() => {
      setCityName("");
    })

  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
      <TextField
        id="city"
        label="City"
        type="text"
        className="w-full"
        placeholder="Enter City"
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
      />
      <button className="btn btn-accent w-1/2 mt-2" onClick={handleAddCity}>ADD CITY</button>
    </div>
  );
};

export default AddCity;
