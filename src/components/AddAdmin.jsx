import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AddAdmin = () => {
  const { setAlert, registerUser } = useContext(GlobalContext);
  const materialUIThemeChanger = useMaterialUIThemeChanger();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");

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
    data.append("role", "admin");

    registerUser({ data, role: "admin" }).then(() => {
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      setProfile(null);
    })
  };
  return (
    <ThemeProvider theme={materialUIThemeChanger}>
      <form className="w-full" onSubmit={handleRegister}>
        <div className="flex flex-col justify-center items-center gap-4 w-full sm:3/4 md:w-1/2 m-auto">
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
            renderInput={(params) => <TextField {...params} label="Gender" />}
            onChange={(event, value) => setGender(value)}
            value={gender}
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
          <button className="btn btn-accent w-1/2 mt-2" type="submit">
            ADD ADMIN
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default AddAdmin;
