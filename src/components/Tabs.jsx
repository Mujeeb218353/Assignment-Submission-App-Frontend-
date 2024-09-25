import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import AddAdmin from "./AddAdmin";
import AssignmentsCreatedByTeacher from "./AssignmentsCreatedByTeacher ";
import AddClass from "./AddClass";
import AddTeacher from "./AddTeacher";
import StudentAssignments from "./StudentAssignments";
import Course from "./Course";
import EnrollInClass from "./EnrollInClass";
import ShowStudents from "./ShowStudents";
import StudentsPerformance from "./StudentsPerformance";

const Admin = () => {
  const { user, setAlert } = useContext(GlobalContext);
  const materialUIThemeChanger = useMaterialUIThemeChanger();

  const adminTabs = [
    { label: "Courses", value: "1", content: <Course /> },
    { label: "Admins", value: "3", content: <AddAdmin /> },
    { label: "Teachers", value: "2", content: <AddTeacher /> },
    { label: "Classes", value: "4", content: <AddClass /> },
    { label: "Students", value: "5", content: <ShowStudents /> },
  ];

  const teacherTabs = [
    { label: "Assignments", value: "1", content: <AssignmentsCreatedByTeacher  /> },
    { label: "Students", value: "3", content: <StudentsPerformance /> },
  ];

  const studentTabs = [
    { label: "Assignments", value: "1", content: <Assignment /> },
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

  if (user?.isVerified !== true && user?.role !== "admin") {
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
    <div className="flex justify-center flex-col items-center p-2">
      <h1 className="text-3xl font-bold text-center mb-1">
        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
      </h1>
      <ThemeProvider theme={materialUIThemeChanger}>
        <Box sx={{ width: "100%", padding: "0rem" }} ref={containerRef} >
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
                sx={{ padding: "0rem" }}
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