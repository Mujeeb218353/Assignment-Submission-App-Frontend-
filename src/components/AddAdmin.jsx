import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ShowAdminsCard from "./ShowAdminsCard";

const AddAdmin = () => {
  const {
    setAlert,
    registerUser,
    cities,
    campuses,
    handleCityChange,
    handleCampusChange,
  } = useContext(GlobalContext);
  const materialUIThemeChanger = useMaterialUIThemeChanger();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [city, setCity] = useState(null);
  const [campus, setCampus] = useState(null);

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!fullName) {
      setAlert({
        message: "Full Name is required",
        type: "error",
      });
      return;
    }

    if (!email) {
      setAlert({
        message: "Email is required",
        type: "error",
      });
      return;
    }

    if (!username) {
      setAlert({
        message: "Username is required",
        type: "error",
      });
      return;
    }

    if (!phoneNumber) {
      setAlert({
        message: "Phone Number is required",
        type: "error",
      });
      return;
    }

    if (!gender) {
      setAlert({
        message: "Gender is required",
        type: "error",
      });
      return;
    }

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

    if (!password) {
      setAlert({
        message: "Password is required",
        type: "error",
      });
      return;
    }

    if (!confirmPassword) {
      setAlert({
        message: "Confirm Password is required",
        type: "error",
      });
      return;
    }

    if (!profile) {
      setAlert({
        message: "Profile is required",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setAlert({
        message:
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character",
        type: "error",
      });
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        confirmPassword
      )
    ) {
      setAlert({
        message:
          "Confirm Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character",
        type: "error",
      });
      return;
    }

    const data = new FormData();
    data.append("profile", profile);
    data.append("fullName", fullName);
    data.append("username", username);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("gender", gender);
    data.append("password", password);
    data.append("city", city._id);
    data.append("campus", campus._id);
    data.append("role", "admin");

    registerUser({ data, role: "admin" }).then(() => {
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      setProfile(null);
      document.getElementById("addAdminModal").close();
    });
  };
  return (
    <ThemeProvider theme={materialUIThemeChanger}>
      <div className="flex flex-col justify-center items-center">
        <button
          className="btn btn-accent w-3/4 sm:w-1/2 md:w-5/12 lg:w-4/12 xl:w-3/12 my-4"
          onClick={() => document.getElementById("addAdminModal").showModal()}
        >
          ADD ADMIN
        </button>
        <dialog id="addAdminModal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg text-center mb-4">Add Teacher</h3>
            <form className="w-full flex flex-col gap-4 justify-center items-center" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 w-full lg:w-10/12 md:w-9/12 sm:w-10/12">
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  className="w-full"
                  placeholder="Your Name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  className="w-full"
                  placeholder="example123"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="on"
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  className="w-full"
                  placeholder="example123@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  type="number"
                  className="w-full"
                  placeholder="921234567890"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <Autocomplete
                  disablePortal
                  id="gender"
                  options={["Male", "Female", "Other"]}
                  isOptionEqualToValue={isOptionEqualToValue}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Gender" />
                  )}
                  onChange={(event, value) => setGender(value)}
                  value={gender}
                />
                <Autocomplete
                  disablePortal
                  id="cities"
                  options={cities}
                  getOptionLabel={(option) => option.cityName || "Unknown City"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
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
                    city
                      ? campuses.filter((campus) => campus.city === city?._id)
                      : []
                  }
                  getOptionLabel={(option) => option.name || "Unknown Campus"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Campus" />
                  )}
                  onChange={(event, value) => {
                    handleCampusChange(value);
                    setCampus(value);
                  }}
                  value={campus}
                />
                <TextField
                  id="password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your Password"
                  className="w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <TextField
                  id="confirmed-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Confirm Your Password"
                  className="w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <input
                  type="file"
                  className="file-input file-input-bordered w-full focus:outline-blue-500 h-[3.5rem]"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </div>
                <button
                  className="btn btn-accent w-full xs:w-1/2 md:w-1/3 mt-2 uppercase"
                  type="submit"
                >
                  Add Admin
                </button>
            </form>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setFullName("");
                setUsername("");
                setEmail("");
                setPhoneNumber("");
                setGender("");
                setPassword("");
                setConfirmPassword("");
                setProfile("");
                setCity(null);
                setCampus(null);
                document.getElementById("addAdminModal").close();
              }}
            >
              X
            </button>
          </div>
        </dialog>
        <ShowAdminsCard />
      </div>
    </ThemeProvider>
  );
};

export default AddAdmin;