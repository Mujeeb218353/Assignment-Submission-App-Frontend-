import { ThemeProvider } from "@mui/material";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import AdminProfile from "../components/AdminProfile";
import TeacherProfile from "../components/TeacherProfile";
import StudentProfile from "../components/StudentProfile";

const Profile = () => {
  const role = localStorage.getItem("my-role");
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <ThemeProvider theme={useMaterialUIThemeChanger()}>
        {role === "admin" ? (
          <AdminProfile />
        ) : role === "teacher" ? (
          <TeacherProfile />
        ) : (
          <StudentProfile />
        )}
      </ThemeProvider>
    </div>
  );
};

export default Profile;