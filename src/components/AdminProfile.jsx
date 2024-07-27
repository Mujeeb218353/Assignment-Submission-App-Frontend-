import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";

const AdminProfile = () => {
    const { user } = useContext(GlobalContext);
    return (
    <div>
      Admin
    </div>
  )
}

export default AdminProfile