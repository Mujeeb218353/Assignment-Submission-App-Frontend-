import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";

const TeacherProfile = () => {
    const { user } = useContext(GlobalContext);
  return (
    <div>
      Teacher
    </div>
  )
}

export default TeacherProfile