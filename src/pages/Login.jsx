import { Link } from "react-router-dom";
import { GlobalContext } from "../context/AppContext";
import { useContext, useState } from "react";
import Alert from "../components/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import ThemeChanger from "../components/ThemeChanger";

const Login = () => {
  const { theme, role, setRole, loginUser, setAlert } = useContext(GlobalContext);
  const [showPass, setShowPass] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const materialUIThemeChanger = useMaterialUIThemeChanger();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!role) {
      setAlert({
        message: "Please select user role",
        type: "error",
      });
      return;
    }
    loginUser(username, password);
  };

  const handleUserRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div data-theme={`${theme}`} className="min-h-screen flex justify-center items-center">
      <Alert />
      <div className="min-h-screen flex justify-center items-center w-full px-1">
        <section className="px-4 flex flex-col items-center justify-center border-0 sm:border sm:rounded-xl sm:shadow-lg">
          <form className="space-y-4 md:space-y-6 py-4 px-2" onSubmit={handleLogin}>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">
              Sign in to your account
            </h1>
            <div className="flex gap-y-5 flex-col">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="input input-bordered w-full focus:outline-none"
                placeholder="example@123"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
                value={username}
                autoComplete="on"
              />
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="join w-full">
                <input
                  type={showPass}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:outline-none join-item"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  value={password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPass(showPass === "text" ? "password" : "text")
                  }
                  className="btn btn-accent join-item"
                >
                  {showPass !== "text" ? (
                    <i className="fa-solid fa-eye w-4"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash w-4"></i>
                  )}
                </button>
              </div>
              <ThemeProvider theme={materialUIThemeChanger}>
                <FormControl>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                  >
                    Role
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    value={role}
                    onChange={handleUserRole}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      sx={{
                        ".MuiFormControlLabel-label": { fontSize: "0.75rem" },
                      }}
                    />
                    <FormControlLabel
                      value="teacher"
                      control={<Radio />}
                      label="Teacher"
                      sx={{
                        ".MuiFormControlLabel-label": { fontSize: "0.75rem" },
                      }}
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      sx={{
                        ".MuiFormControlLabel-label": { fontSize: "0.75rem" },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </ThemeProvider>
              <div className="flex items-center justify-between">
                <Link
                  to="/forgotPassword"
                  className="text-sm font-medium link link-accent"
                >
                  Forgot password?
                </Link>
              </div>
              <button className="btn btn-accent w-full" type="submit">
                LOGIN
              </button>
              <div className="text-sm font-light text-center">
                Don’t have an account yet?{" "}
                <Link to="/signup" className="link link-accent font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
      <ThemeChanger />
    </div>
  );
};

export default Login;
