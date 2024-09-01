import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("my-theme") || "light"
  );
  const location = useLocation();
  const [alert, setAlert] = useState();
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [course, setCourse] = useState(null);
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentClass, setStudentClass] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [unSubmittedAssignments, setUnSubmittedAssignments] = useState([]);
  const [createdAssignments, setCreatedAssignments] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([])
  const [assignmentId, setAssignmentId] = useState("");
  const [studentsSubmittedAssignment, setStudentsSubmittedAssignment] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState([])
  const [studentsNotSubmittedAssignment, setStudentsNotSubmittedAssignment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-theme", theme);
  }, [theme]);

  const registerUser = async ({ data, role }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/${role}/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (localStorage.getItem("my-role") === "student" || role === "student") {
        localStorage.setItem("my-accessToken", response.data.data.accessToken);
        localStorage.setItem(
          "my-refreshToken",
          response.data.data.refreshToken
        );
        localStorage.setItem("my-role", role);
        setTimeout(() => {
          setAlert(null);
          navigate("/");
        }, 2000);
        await getUser();
      }
      if (localStorage.getItem("my-role") === "admin" && role === "teacher") {
        setAllTeachers([...allTeachers, response.data.data]);
      }
      if (localStorage.getItem("my-role") === "admin" && role === "admin") {
        setAllAdmins([...allAdmins, response.data.data]);
      }
      setAlert({
        message: response.data.message || "Registration successful",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Registration failed",
        type: "error",
      });
      console.log(error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/${role}/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("my-accessToken", response.data.data.accessToken);
      localStorage.setItem("my-refreshToken", response.data.data.refreshToken);
      localStorage.setItem("my-role", role);
      await getUser();
      if (localStorage.getItem("my-role") === "admin") {
        getCity();
        getAllCourses();
        getAllTeachers();
        getAllAdmins();
        getAllClasses();
        getAllStudents();
      }
      if (localStorage.getItem("my-role") === "student") {
        getStudentClass();
        getSubmittedAssignments();
        getUnSubmittedAssignments();
      }
      if (localStorage.getItem("my-role") === "teacher") {
        getCreatedAssignments();
      }
      setAlert({ message: "Logged In Successfully", type: "success" });
      setTimeout(() => {
        setAlert(null);
        navigate("/");
      }, 2000);
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Login failed",
        type: "error",
      });
    }
  };

  const getUser = async () => {
    const role = localStorage.getItem("my-role");
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_USERS_API}/${role}/getCurrent${
          role[0].toLocaleUpperCase() + role.slice(1)
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setUser(user.data.data);
    } catch (error) {
      console.log(error);
      setAlert({ message: "Please Login Again", type: "error" });
      // navigate("/login");
      // localStorage.removeItem("my-accessToken");
      // localStorage.removeItem("my-role");
    }
  };

  const logoutUser = async () => {
    const role = localStorage.getItem("my-role");
    try {
      await axios.post(
        `${import.meta.env.VITE_USERS_API}/${role}/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAlert({ message: "Logged Out Successfully", type: "success" });
      localStorage.removeItem("my-accessToken");
      localStorage.removeItem("my-refreshToken");
      setTimeout(() => {
        localStorage.removeItem("my-role");
        setAlert(null);
        setUser(null);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Logout failed",
        type: "error",
      });
    }
  };

  const refreshAccessToken = async () => {
    const role = localStorage.getItem("my-role");
    const refreshToken = localStorage.getItem("my-refreshToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/${role}/refresh${
          role[0].toLocaleUpperCase() + role.slice(1)
        }AccessToken`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("my-accessToken", response.data.data.accessToken);
      localStorage.setItem("my-refreshToken", response.data.data.refreshToken);
      // console.log(response.data.message);
      setLoading(false);
    } catch (error) {
      // console.log("Error In Refresh Access Token",error);
      throw error;
    }
  };

  const getCity = async () => {
    if (localStorage.getItem("my-role") !== "admin") return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getCities`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCities(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      setAlert({ message: "Failed to fetch cities", type: "error" });
    }
  };

  const handleCityChange = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getCampuses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCampuses(response.data.data);
    } catch (error) {
      setAlert({ message: "Failed to fetch campuses", type: "error" });
      setCampuses([]);
    }
  };

  const handleCampusChange = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getCourses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCourses(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setAlert({ message: "Failed to fetch courses", type: "error" });
      setCourses([]);
    }
  };

  const addCity = async ({ cityName, userId }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/admin/addCity`,
        {
          cityName,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCities((prevCities) => [response.data.data, ...prevCities]);
      setAlert({
        message: response.data.message || "City Added Successfully",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Failed to Add City",
        type: "error",
      });
    }
  };

  const addCampus = async ({ name, cityId, userId }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/admin/addCampus`,
        {
          name,
          cityId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAlert({
        message: response.data.message || "Campus Added Successfully",
        type: "success",
      });
      setCampuses((prevCampuses) => [response.data.data, ...prevCampuses]);
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Failed to Add Campus",
        type: "error",
      });
    }
  };

  const addCourse = async ({ name, cityId, campusId }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/admin/addCourse`,
        {
          name,
          cityId,
          campusId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAlert({
        message: response.data.message || "Course Added Successfully",
        type: "success",
      });
      setCourses(prevCourses => [
        ...prevCourses.filter(course => course._id !== response.data.data._id),
        response.data.data
      ]);
      setAllCourses(prevCourses => [
        ...prevCourses.filter(course => course._id !== response.data.data._id),
        response.data.data
      ]);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const handleCourseChange = async (selectedCourse) => {
    console.log(selectedCourse);
    if (!selectedCourse) {
      setTeachers([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getTeachersByCourse?courseId=${
          selectedCourse._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setTeachers(response.data.data);
    } catch (error) {
      setAlert({
        message: error.response.data.message || "Failed to fetch teachers",
        type: "error",
      });
      console.log(error);
    }
  };

  const addClass = async ({
    name,
    enrollmentKey,
    batch,
    teacherId,
    cityId,
    courseId,
    campusId,
    userId,
  }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/admin/addClass`,
        {
          name,
          enrollmentKey,
          batch,
          teacherId,
          cityId,
          courseId,
          campusId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );

      setAllClasses([...allClasses, response.data.data]);
      // setAllTeachers([
      //   ...allTeachers.filter((teacher) => teacher._id !== response.data.data.teacher),
      //   response.data.data.teacher
      // ])
      setAlert({
        message: response.data.message || "Class Added Successfully",
        type: "success",
      });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      throw error;
    }
  };

  const handleEnrollInClass = async ({ enrollmentKey, studentId }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/student/enrollStudent`,
        {
          enrollmentKey,
          studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAlert({
        message: response.data.message || "Enrolled Successfully",
        type: "success",
      });
      setTimeout(() => {
        setAlert(null);
        window.location.reload();
      }, 3000);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getStudentClass = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getStudentClass`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setStudentClass(response.data.data[0]);
      // console.log(response);
    } catch (error) {
      setAlert({ message: "Please Login Again", type: "error" });
    }
  };

  const createAssignment = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/teacher/createAssignment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCreatedAssignments((prev) => [...prev, response.data.data]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  };

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/teacher/getClasses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setClasses(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getSubmittedAssignments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getSubmittedAssignment`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setSubmittedAssignments(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getUnSubmittedAssignments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/student/getUnSubmittedAssignment`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setUnSubmittedAssignments(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const submitAssignment = async ({ link, assignmentId }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API}/student/submitAssignment`,
        {
          assignmentLink: link,
          assignmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setSubmittedAssignments((prev) => [...prev, response.data.data]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const editSubmittedAssignment = async ({ assignmentId, assignmentLink }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_USERS_API
        }/student/editSubmittedAssignment/${assignmentId}`,
        {
          assignmentLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setSubmittedAssignments((prevSubmittedAssignments) => {
        const updatedAssignments = prevSubmittedAssignments.map((assignment) =>
          assignment._id === response.data.data._id
            ? response.data.data
            : assignment
        );
        return updatedAssignments;
      });
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const deleteSubmittedAssignment = async (assignmentId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_USERS_API
        }/student/deleteSubmittedAssignment/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setSubmittedAssignments((prevSubmittedAssignments) =>
        prevSubmittedAssignments.filter(
          (assignment) => assignment._id !== assignmentId
        )
      );
      setUnSubmittedAssignments((prev) => [...prev, response.data.data]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getCreatedAssignments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/teacher/getCreatedAssignments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCreatedAssignments(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Karachi",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  const editCreatedAssignment = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/teacher/editAssignment/${data._id}`,
        {
          title: data.title,
          description: data.description,
          lastDate: data.lastDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCreatedAssignments((prevCreatedAssignments) => {
        const updatedAssignments = prevCreatedAssignments.map((assignment) =>
          assignment._id === response.data.data._id
            ? response.data.data
            : assignment
        );
        return updatedAssignments;
      });
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  };

  const deleteCreatedAssignment = async (assignmentId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_USERS_API
        }/teacher/deleteAssignment/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setCreatedAssignments((prevCreatedAssignments) =>
        prevCreatedAssignments.filter(
          (assignment) => assignment._id !== assignmentId
        )
      );
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getStudentsSubmittedAssignment = async (assignmentId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_USERS_API
        }/teacher/getStudentsSubmittedAssignment/${
          assignmentId ? assignmentId : location.pathname.split("/")[1]
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setStudentsSubmittedAssignment(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  };

  const getStudentsNotSubmittedAssignment = async (assignmentId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_USERS_API
        }/teacher/getStudentsNotSubmittedAssignment/${
          assignmentId ? assignmentId : location.pathname.split("/")[1]
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setStudentsNotSubmittedAssignment(response.data.data);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  };

  const assignMarks = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/teacher/assignMarks/${
          data.assignmentId
        }`,
        {
          marks: data.marks,
          studentId: data.studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      await getStudentsSubmittedAssignment(data.assignmentId);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  };

  const updateProfilePicture = async (data) => {
    const role = localStorage.getItem("my-role");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/${role}/update${
          role[0].toLocaleUpperCase() + role.slice(1)
        }ProfilePicture`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setUser({ ...user, profile: response.data.data.profile });
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const updateProfileDetails = async (data) => {
    const role = localStorage.getItem("my-role");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/${role}/update${
          role[0].toLocaleUpperCase() + role.slice(1)
        }ProfileDetails`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      console.log(response.data.data);
      setUser(response.data.data);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
      console.log(error);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getAllCourses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllCourses(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      setAlert({
        message: "Something went wrong, while fetching courses",
        type: "error",
      });
      console.log(error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getAllTeachers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllTeachers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setAlert({
        message: "Something went wrong, while fetching teachers",
        type: "error",
      });
      console.log(error);
    }
  };

  const getAllAdmins = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getAllAdmins`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllAdmins(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setAlert({
        message: "Something went wrong, while fetching teachers",
        type: "error",
      });
      console.log(error);
    }
  };

  const getAllClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getAllClasses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllClasses(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setAlert({
        message: "Something went wrong, while fetching classes",
        type: "error",
      });
      console.log(error);
    }
  }

  const updateCourseName = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/admin/editCourse/${data.courseId}`,
        {
          courseName:data.name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === data.courseId ? { ...course, name: response.data.data.name } : course
        )
      );
      handleCampusChange();
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  }

  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteCourse/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      setAlert({ message: error.response.data.message, type: "error" });
    }
  } 

  const deleteCourseCity = async (cityId, courseId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteCourseCity/${cityId}&${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setAllCourses([
        ...allCourses.filter((course) => course._id !== courseId),
        response.data.data
      ]);
      setCourses((prevCourses) =>[
        prevCourses.filter((course) => course._id !== courseId), 
        response.data.data
      ]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteCourseCampus = async (campusId, courseId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteCourseCampus/${campusId}&${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      // console.log(...allCourses.filter((course) => course._id !== response.data.data._id));
      setAllCourses([
        ...allCourses.filter((course) => course._id !== courseId),
        response.data.data
      ]);
      setCourses((prevCourses) =>[
        prevCourses.filter((course) => course._id !== courseId), 
        response.data.data
      ]);
      
      // console.log("Courses: ",courses);
      
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
    }
  }

  const editAdminCityOrCampusOrVerification = async (adminId, cityId, campusId, isVerified) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/admin/editAdminCityOrCampusOrVerification/${adminId}`,
        {
          cityId,
          campusId,
          isVerified
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('my-accessToken')}`,
          },
        }
      );
      setAllAdmins([
        ...allAdmins.filter((admin) => admin._id !== adminId),
        response.data.data
      ]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" });
    }
  }

  const deleteAdmin = async (adminId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteAdmin/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllAdmins([...allAdmins.filter((admin) => admin._id !== adminId)]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" });
    }
  }

  const editTeacherVerification = async (teacherId, isVerified) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/admin/editTeacherVerification/${teacherId}`,
        {
          isVerified
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setAllTeachers([
        ...allTeachers.filter((teacher) => teacher._id !== teacherId),
        response.data.data
      ]);
      setAlert({ message: response.data.message, type: "success" });
    }catch(error){
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" })
    }
  }

  const deleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteTeacher/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllTeachers([...allTeachers.filter((teacher) => teacher._id !== teacherId)]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" });
    }
  }

  const editClass = async (classId, className, batch, enrollmentKey, city, campus, course, teacher) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/admin/editClass/${classId}`,
        {
          className, 
          batch, 
          enrollmentKey,
          cityId: city._id, 
          campusId: campus._id,  
          courseId: course._id,
          teacherId: teacher._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setAllClasses([
        ...allClasses.filter((class_s)=> class_s._id !== classId),
        response.data.data
      ]);
      console.log(response.data.data);
      
      setAlert({ message: response.data.message, type: "success" });
    }catch(error){
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" })
    }
  }

  const deleteClass = async (classId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteClass/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllClasses([...allClasses.filter((class_s)=> class_s._id !== classId)]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" });
    }
  }

  const getAllStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/admin/getAllStudents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setAllStudents(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      setAlert({message: error.response.data.message, type: "error"})
    }
  }

  const editStudentVerification = async (studentId, verification) => {
    console.log(studentId, verification);
    console.log(typeof verification);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_USERS_API}/admin/editStudentVerification/${studentId}`,
        {
          isVerified: verification
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setAllStudents([
        ...allStudents.filter((student) => student._id !== studentId),
        response.data.data
      ]);
      setAlert({ message: response.data.message, type: "success" });
    }catch(error){
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" })
    }
  }

  const deleteStudent = async (studentId) => {
    console.log(studentId);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USERS_API}/admin/deleteStudent/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      );
      setAllStudents([...allStudents.filter((student) => student._id !== studentId)]);
      setAlert({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({ message: error.response.data.message, type: "error" });
    }
    
  }

  const getStudentsByClass = async (classId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_API}/teacher/getStudentsByClass/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("my-accessToken")}`,
          },
        }
      )
      setStudentsByClass(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      setAlert({message: error.response.data.message, type: "error"})
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("my-accessToken");
    const role = localStorage.getItem("my-role");
    const refreshToken = localStorage.getItem("my-refreshToken");

    if (!accessToken) {
      return;
    }

    const { exp } = jwtDecode(accessToken);
    const expirationTime = exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshTimeout = timeUntilExpiration - 5 * 60 * 1000;
    console.log("Current time:", currentTime);
    console.log("Expiration time:", expirationTime);
    console.log("Time until expiration:", timeUntilExpiration);
    console.log("Refresh timeout:", refreshTimeout);
    const handleRefreshAccessToken = async () => {
      try {
        if (refreshTimeout >= 0) {
          setTimeout(refreshAccessToken, refreshTimeout);
        } else if (timeUntilExpiration < 0) {
          await refreshAccessToken();
        }
      } catch (error) {
        // console.log("handleRefreshAccessToken",error);
        throw error;
      }
    };
    handleRefreshAccessToken()
      .then(async () => {
        await getUser()
          .then(() => {
            if (role === "admin") {
              getCity();
              getAllCourses();
              getAllTeachers();
              getAllAdmins();
              getAllClasses();
              getAllStudents();
            }
            if (role === "student" && accessToken) {
              getStudentClass();
              getSubmittedAssignments();
              getUnSubmittedAssignments();
            }
            if (role === "teacher" && accessToken && refreshToken) {
              getCreatedAssignments();
            }
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        setAlert({
          message: error.response.data.message === "Refresh token is expired or used" ? error.response.data.message : "Session Expired. Please Login Again",
          type: "error",
        });
        if(error.response.data.message === "Refresh token is expired or used"){
          setTimeout(() => {
            localStorage.removeItem("my-accessToken");
            localStorage.removeItem("my-refreshToken");
            localStorage.removeItem("my-role");
            setUser(null);
            setAlert(null);
            navigate("/login");
          }, 2000);
        }
        console.log("Error: ",error);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        alert,
        setAlert,
        user,
        setUser,
        role,
        setRole,
        loading,
        setLoading,
        cities,
        setCities,
        campuses,
        setCampuses,
        course,
        setCourse,
        courses,
        teachers,
        classes,
        setClasses,
        assignmentId,
        setAssignmentId,
        formatDate,
        createdAssignments,
        studentClass,
        submittedAssignments,
        setSubmittedAssignments,
        unSubmittedAssignments,
        setUnSubmittedAssignments,
        studentsSubmittedAssignment,
        studentsNotSubmittedAssignment,
        allCourses,
        setAllCourses,
        allTeachers,
        setAllTeachers,
        allAdmins,
        setAllAdmins,
        allClasses,
        setAllClasses,
        allStudents,
        setAllStudents,
        studentsByClass,
        setStudentsByClass,

        addCity,
        addCampus,
        addCourse,
        setCourses,
        registerUser,
        loginUser,
        logoutUser,
        refreshAccessToken,
        handleCityChange,
        handleCampusChange,
        addClass,
        handleCourseChange,
        handleEnrollInClass,
        getStudentClass,
        createAssignment,
        submitAssignment,
        editSubmittedAssignment,
        deleteSubmittedAssignment,
        editCreatedAssignment,
        deleteCreatedAssignment,
        getStudentsSubmittedAssignment,
        getStudentsNotSubmittedAssignment,
        assignMarks,
        getClasses,
        updateProfilePicture,
        updateProfileDetails,
        updateCourseName,
        deleteCourse,
        deleteCourseCity,
        deleteCourseCampus,
        editAdminCityOrCampusOrVerification,
        deleteAdmin,
        editTeacherVerification,
        deleteTeacher,
        editClass,
        deleteClass,
        editStudentVerification,
        deleteStudent,
        getCity,
        getStudentsByClass,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;