import { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slide from "@mui/material/Slide";
import AddAdmin from "./AddAdmin";
import AddTeacher from "./AddTeacher";
import AddAttendance from "./AddAttendance";
import AddAssignment from "./AddAssignment";
import AddQuiz from "./AddQuiz";
import AddClass from "./AddClass";
import Course from "./Course";
import EnrollInClass from "./EnrollInClass";
import Assignment from "./Assignment";

const Admin = () => {
  const { user } = useContext(GlobalContext);
  const materialUIThemeChanger = useMaterialUIThemeChanger();

  const adminTabs = [
    { label: "Courses", value: "1", content: <Course /> },
    { label: "Admins", value: "3", content: <AddAdmin /> },
    { label: "Teachers", value: "2", content: <AddTeacher /> },
    { label: "Classes", value: "4", content: <AddClass /> },
    // { label: "Attendance", value: "5", content: <AddAttendance /> },
  ];

  const teacherTabs = [
    { label: "Assignment", value: "1", content: <AddAssignment /> },
    { label: "Quizzes", value: "2", content: <AddQuiz /> },
  ];

  const studentTabs = [
    { label: "Assignment", value: "1", content: <Assignment /> },
    { label: "Quiz", value: "2", content: <div>Quiz</div> },
    {
      label: "View Attendance",
      value: "3",
      content: <div>View Attendance</div>,
    },
  ];

  const tabs =
    user?.role === "admin"
      ? adminTabs
      : user?.role === "teacher"
      ? teacherTabs
      : studentTabs;

  const [value, setValue] = useState(tabs[0].value);
  const [checked, setChecked] = useState(true);
  const [blur, setBlur] = useState(false);
  const containerRef = useRef(null);

  const handleChange = (event, newValue) => {
    setBlur(true);
    setChecked(false);
    setTimeout(() => {
      setValue(newValue);
      setChecked(true);
      setTimeout(() => {
        setBlur(false);
      }, 300);
    }, 300);
  };

  // if(navigator.onLine === false){
  //   return (
  //     <div className="text-center text-xl">
  //       Please check your internet connection
  //     </div>
  //   );
  // }

  if (user?.isVerified !== true) {
    return (
      <div className="text-center text-xl">
        Please verify yourself from our any campus
      </div>
    );
  }

  if (user?.role === "student" && user?.enrolledInClass === null) {
    return <EnrollInClass />;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-1">
        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
      </h1>
      <ThemeProvider theme={materialUIThemeChanger}>
        <Box sx={{ width: "100%" }} ref={containerRef}>
          <TabContext value={value}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="overflow-x-auto whitespace-nowrap"
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
            {tabs.map((tab) => (
              <Slide
                key={tab.value}
                in={value === tab.value && checked}
                container={containerRef.current}
                direction="up"
                mountOnEnter
                unmountOnExit
              >
                <TabPanel value={tab.value} className={blur ? "blur-md" : ""}>
                  {tab.content}
                </TabPanel>
              </Slide>
            ))}
          </TabContext>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Admin;
