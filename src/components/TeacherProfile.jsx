import React, { useContext, useState, useId } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField, Autocomplete } from "@mui/material";

const TeacherProfile = () => {
  const { user, setAlert, updateProfilePicture, updateProfileDetails } =
    useContext(GlobalContext);
    const uniqueId = useId();
  const [profilePicture, setProfilePicture] = useState(user?.profile);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);

  console.log(user);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleProfilePictureUpdate = () => {
    if (!profilePicture) {
      setAlert({ message: "Profile picture is required", type: "error" });
      return;
    }

    if (!user) {
      setAlert({ message: "User not found", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("profile", profilePicture);

    updateProfilePicture(formData).then(() => {
      setProfilePicture("");
      document.getElementById("profile-edit-modal").close();
    });

    document.getElementById("profile-edit-modal").close();
  };

  const handleProfileDetailsUpdate = () => {
    if (!profile.fullName) {
      setAlert({ message: "Name is required", type: "error" });
      return;
    }

    if (!profile.username) {
      setAlert({ message: "Username is required", type: "error" });
      return;
    }

    if (!profile.email) {
      setAlert({ message: "Email is required", type: "error" });
      return;
    }

    if (!profile.phoneNumber) {
      setAlert({ message: "Phone Number is required", type: "error" });
      return;
    }

    if (!profile.gender) {
      setAlert({ message: "Gender is required", type: "error" });
      return;
    }

    try {
      updateProfileDetails(profile).then(() => {
        setProfile({
          fullName: "",
          username: "",
          email: "",
          phoneNumber: "",
          gender: "",
        });
        handleClose();
      });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-28 md:py-0">
      <div className="w-full p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="avatar w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
              <img
                src={user.profile ? user.profile : "/profile.png"}
                alt="Profile"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{user?.fullName || "N/A"}</h2>
              <p className="text-gray-400">{user?.username || "N/A"}</p>
            </div>
          </div>
          <button
            className="btn btn-accent mt-4 md:mt-0"
            onClick={() => {
              document.getElementById("profile-edit-modal").showModal();
            }}
          >
            Edit Profile Picture
          </button>
          <dialog id="profile-edit-modal" className="modal">
            <div className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">Edit Profile Picture</h3>
              <input
                type="file"
                className="file-input file-input-bordered focus:outline-blue-500 h-[3.5rem] w-full"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    document.getElementById("profile-edit-modal").close();
                    setProfilePicture("");
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-accent"
                  onClick={handleProfilePictureUpdate}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </dialog>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Role</p>
            <p>{user?.role?.toUpperCase() || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Phone No.</p>
            <p>{user?.phoneNumber || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{user?.email || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Course</p>
            <p>{user?.course?.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Gender</p>
            <p>{user?.gender || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">City</p>
            <p>{user?.city?.cityName || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Instructor of</p>
            <p>
              {
                user?.instructorOfClass?.map((class1)=>(
                  <li key={class1._id}>{class1.name} ({class1.batch})</li>
                )) 
                || 
                "N/A"
              }
            </p>
          </div>
          <div>
            <p className="font-semibold">Campus(es)</p>
            <p>
              {
                user?.campus?.map((campus,index)=>(
                  <li key={`${campus._id+index}-${uniqueId}`}>{campus.name}</li>
                )) 
                || 
                "N/A"
              }
            </p>
          </div>
        </div>
        <div className="flex justify-start mt-8">
          <button
            className="btn btn-accent"
            onClick={() => {
              setOpen(true);
              setProfile(user);
            }}
          >
            Edit Profile Details
          </button>
        </div>
      </div>

      {open && (
        <dialog
          className="modal modal-open"
          id="edit-profile-modal"
          open={open}
        >
          <div className="modal-box flex flex-col gap-4">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <TextField
                label="Name"
                variant="outlined"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Phone No."
                variant="outlined"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                fullWidth
              />
              <Autocomplete
                disablePortal
                id="gender"
                options={["Male", "Female", "Other"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    variant="outlined"
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    fullWidth
                  />
                )}
                value={profile.gender}
                onChange={(event, newValue) => {
                  setProfile({ ...profile, gender: newValue });
                }}
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-accent"
                onClick={handleProfileDetailsUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TeacherProfile;