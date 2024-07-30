import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import { TextField, Autocomplete } from "@mui/material";

const StudentProfile = () => {
  const { user, setAlert, updateProfilePicture, updateProfileDetails } =
    useContext(GlobalContext);
  const [profilePicture, setProfilePicture] = useState(user?.profile);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  console.log(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

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
 
    if(!profile.fullName){
      setAlert({ message: "Name is required", type: "error" });
      return;
    }

    if(!profile.username){
      setAlert({ message: "Username is required", type: "error" });
      return;
    }

    if(!profile.email){
      setAlert({ message: "Email is required", type: "error" });
      return;
    }

    if(!profile.phoneNumber){
      setAlert({ message: "Phone Number is required", type: "error" });
      return;
    }

    if(!profile.address){
      setAlert({ message: "Address is required", type: "error" });
      return;
    }

    if(!profile.gender){
      setAlert({ message: "Gender is required", type: "error" });
      return;
    }

    if(!profile.CNIC){
      setAlert({ message: "CNIC is required", type: "error" });
      return;
    }

    if(!profile.lastQualification){
      setAlert({ message: "Last Qualification is required", type: "error" });
      return;
    }

    if(!profile.dob){
      setAlert({ message: "Date of Birth is required", type: "error" });
      return;
    }

    try {
      updateProfileDetails(profile).then(() => {
        setProfile({
          fullName: "",
          username: "",
          email: "",
          phoneNumber: "",
          address: "",
          gender: "",
          CNIC: "",
          lastQualification: "",
          dob: "",
        });
        handleClose();
      });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <p className="font-semibold">Date of Birth</p>
            <p>
              {new Date(user?.dob).toLocaleDateString() === "Invalid Date"
                ? "N/A"
                : new Date(user?.dob).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="font-semibold">CNIC</p>
            <p>{user?.CNIC || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Last Qualification</p>
            <p>{user?.lastQualification || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Address</p>
            <p>{user?.address || "N/A"}</p>
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
            <p className="font-semibold">Campus</p>
            <p>{user?.campus?.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Class</p>
            <p>{user?.enrolledInClass?.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Batch</p>
            <p>{user?.enrolledInClass?.batch || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Teacher</p>
            <p>{user?.enrolledInClass?.teacher?.fullName || "N/A"}</p>
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
          <div className="modal-box w-11/12 flex flex-col gap-4">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            <div className="grid grid-cols-1 gap-4">
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
              <Autocomplete
                disablePortal
                id="last-qualification"
                options={[
                  "Matric",
                  "Intermediate",
                  "Bachelors",
                  "Masters",
                  "PhD",
                  "Other",
                ]}
                isOptionEqualToValue={(option, value) => option === value}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Last Qualification" />
                )}
                onChange={(event, value) =>
                  setProfile({ ...profile, lastQualification: value })
                }
                value={profile.lastQualification}
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
                onChange={(event, value) => {
                  setProfile({ ...profile, gender: value });
                }}
              />
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                id="dob"
                name="dob"
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
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

export default StudentProfile;
