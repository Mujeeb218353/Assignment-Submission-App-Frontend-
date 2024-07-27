import { GlobalContext } from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import Alert from "../components/Alert";
import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { format, differenceInYears } from "date-fns";
import { Link } from "react-router-dom";
import ThemeChanger from "../components/ThemeChanger";
import axios from "axios";

const Signup = () => {
  const { theme, setAlert, registerUser } = useContext(GlobalContext);
  const materialUIThemeChanger = useMaterialUIThemeChanger();
  const [city, setCity] = useState(null);
  const [course, setCourse] = useState(null);
  const [campus, setCampus] = useState(null);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [lastQualification, setLastQualification] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [dob, setDob] = useState("");
  const [isValidAge, setIsValidAge] = useState(true);
  const [isCNIC, setIsCNIC] = useState(true);

  const getCities = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getCities`
      );
      setCities(response.data.data);
    } catch (error) {
      setAlert({ message: "Something went wrong", type: "error" });
    }
  };

  const handleCityChange = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getCampuses`
      );
      setCampuses(response.data.data);
    } catch (error) {
      setAlert({ message: "Something went wrong", type: "error" });
    }
  };

  const handleCampusChange = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getCourses`
      );
      setCourses(response.data.data);
    } catch (error) {
      setAlert({ message: "Something went wrong", type: "error" });
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!city) {
      setAlert({
        message: "City is required",
        type: "error",
      });
      return;
    }

    if (!course) {
      setAlert({
        message: "Course is required",
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

    if (!fullName) {
      setAlert({
        message: "Full Name is required",
        type: "error",
      });
      return;
    }

    if (!fatherName) {
      setAlert({
        message: "Father Name is required",
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

    if (!email) {
      setAlert({
        message: "Email is required",
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

    if (!CNIC) {
      setAlert({
        message: "CNIC is required",
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

    if (!address) {
      setAlert({
        message: "Address is required",
        type: "error",
      });
      return;
    }

    if (!lastQualification) {
      setAlert({
        message: "Last Qualification is required",
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

    if (!dob) {
      setAlert({
        message: "Date of Birth is required",
        type: "error",
      });
      return;
    }

    if (!isValidAge) {
      setAlert({
        message: "Age should be 18 or above",
        type: "error",
      });
      return;
    }

    if (!isCNIC) {
      setAlert({
        message: "CNIC should be valid",
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
    data.append("city", city._id);
    data.append("course", course._id);
    data.append("campus", campus._id);
    data.append("fullName", fullName);
    data.append("fatherName", fatherName);
    data.append("username", username)
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("CNIC", CNIC);
    data.append("gender", gender);
    data.append("address", address);
    data.append("lastQualification", lastQualification);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("dob", dob);
    data.append("role", "student");

    registerUser({ data, role: "student" });
  };
  return (
    <div
      className="min-h-screen p-4 flex flex-col justify-center items-center"
      data-theme={`${theme}`}
    >
      <Alert />
      <form
        className="lg:w-10/12 md:w-9/12 sm:w-10/12 space-y-4 md:space-y-6 py-4"
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold text-center p-2">
          Registration Form SMIT
        </h1>
        <ThemeProvider theme={materialUIThemeChanger}>
          <div className="pt-2 space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Autocomplete
                disablePortal
                id="cities"
                options={cities}
                getOptionLabel={(option) => option.cityName || "Unknown City"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                options={
                  city
                    ? campuses.filter((campus) => campus.city === city?._id)
                    : []
                }
                getOptionLabel={(option) => option.name || "Unknown Campus"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Autocomplete
                disablePortal
                id="course"
                options={
                  campus
                    ? courses.filter((course) => course.campus === campus?._id)
                    : []
                }
                getOptionLabel={(option) => option.name || "Unknown Course"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Course" />
                )}
                onChange={(event, value) => setCourse(value)}
                value={course}
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
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
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
                id="fatherName"
                label="Father Name"
                type="text"
                className="w-full"
                placeholder="Your Father Name"
                onChange={(e) => setFatherName(e.target.value)}
                value={fatherName}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <TextField
                id="CNIC"
                label="CNIC"
                type="text"
                className="w-full"
                placeholder="43304-1234567-8"
                onChange={(e) => {
                  setCNIC(e.target.value);
                  setIsCNIC(
                    e.target.value.length === 15 &&
                      /\d{5}-\d{7}-\d/.test(e.target.value)
                  );
                }}
                value={CNIC}
                error={!isCNIC}
                helperText={!isCNIC ? "43312-1234567-8" : ""}
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
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <TextField
                id="address"
                label="Address"
                type="text"
                className="w-full"
                placeholder="Your Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
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
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Autocomplete
                disablePortal
                id="last-qualification"
                options={[
                  "Matric",
                  "Intermediate",
                  "Bachelors",
                  "Masters",
                  "PhD",
                  "Other",
                ]}
                isOptionEqualToValue={isOptionEqualToValue}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Last Qualification" />
                )}
                onChange={(event, value) => setLastQualification(value)}
                value={lastQualification}
              />
              <TextField
                id="date-of-birth-input"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                className="w-full"
                error={!isValidAge}
                helperText={
                  !isValidAge ? "Age must be at least 7 years old" : ""
                }
                inputProps={{
                  max: format(new Date(), "yyyy-MM-dd"),
                }}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setDob(e.target.value);
                  const age = differenceInYears(new Date(), selectedDate);
                  setIsValidAge(age >= 7);
                }}
                value={dob}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
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
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
            <TextField
                id="username"
                label="Username"
                type="text"
                className="w-full"
                placeholder="example@123"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="file"
                className="file-input file-input-bordered focus:outline-blue-500 h-[3.5rem] w-full"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <button className="btn btn-accent w-full sm:w-1/2" type="submit">
                REGISTER
              </button>
            </div>
          </div>
        </ThemeProvider>
      </form>
      <div className="text-sm font-light text-center py-2">
        I have an account{" "}
        <Link to="/login" className="link link-accent font-medium">
          Login
        </Link>
      </div>
      <ThemeChanger />
    </div>
  );
};

export default Signup;
