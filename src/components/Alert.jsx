import { useContext, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { GlobalContext } from "../context/AppContext";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function CustomAlert() {
  const { alert, setAlert } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setAlert(null);
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{ zIndex: 9999 }}
    >
      {alert && (
        <Alert
          onClose={handleClose}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%", textAlign: "center" }}
        >
          {alert.message}
        </Alert>
      )}
    </Snackbar>
  );
}
