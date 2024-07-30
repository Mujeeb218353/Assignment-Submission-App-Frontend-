import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField } from "@mui/material";

const AdminProfile = () => {
  const { user } = useContext(GlobalContext);
  const [profile, setProfile] = useState(user);
  const [open, setOpen] = useState(false);

  console.log(user);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <p className="text-gray-400">@{user?.username || "N/A"}</p>
            </div>
          </div>
          <button className="btn btn-accent mt-4 md:mt-0" onClick={handleOpen}>
            Edit Profile Picture
          </button>
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
            <p className="font-semibold">Gender</p>
            <p>{user?.gender || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">City</p>
            <p>{user?.city?.cityName || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Campus</p>
            <p>{user?.campus?.name || "N/A"}</p>
          </div>
        </div>
        <div className="flex justify-start mt-8">
          <button className="btn btn-accent" onClick={handleOpen}>
            Edit Profile
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <TextField
                label="CNIC"
                variant="outlined"
                name="CNIC"
                value={profile.CNIC}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Last Qualification"
                variant="outlined"
                name="lastQualification"
                value={profile.lastQualification}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Gender"
                variant="outlined"
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  // handle update logic here
                  handleClose();
                }}
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

export default AdminProfile;
