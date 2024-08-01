import { ThemeProvider } from "@mui/material/styles";
import useMaterialUIThemeChanger from "../hooks/useMaterialUiTheme";
import AddCity from "./AddCity";
import AddCampus from "./AddCampus";
import AddCourse from "./AddCourse";
import ShowCoursesCard from "./ShowCoursesCard";

const Course = () => {
  const materialUIThemeChanger = useMaterialUIThemeChanger();

  return (
    <ThemeProvider theme={materialUIThemeChanger}>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
          <AddCity />
          <AddCampus />
          <AddCourse />
        </div>
        <ShowCoursesCard />
      </div>
    </ThemeProvider>
  );
};

export default Course;
