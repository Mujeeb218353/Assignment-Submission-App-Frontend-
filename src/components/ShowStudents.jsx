import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import { Autocomplete, TextField } from "@mui/material";

const ShowStudents = () => {
  const { allStudents, editStudentVerification, deleteStudent } =
    useContext(GlobalContext);
  const [verification, setVerification] = useState("false");
  console.log(allStudents);

  return (
    <div className="mx-auto mt-8 w-full md:w-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {allStudents && allStudents.length > 0 ? (
        allStudents.map((student) => (
          <div
            key={student._id}
            className="p-6 rounded-lg shadow-lg flex flex-col border"
          >
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={student.profile}
                alt={`${student.fullName}'s profile`}
              />
              <div>
                <h2 className="text-2xl font-semibold">{student.fullName}</h2>
                <p className="text-gray-400 text-center sm:text-start">
                  {student.username}
                </p>
              </div>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="">
                <span className="font-bold">Email: </span> {student.email}
              </p>
              <p className="">
                <span className="font-bold">Ph. No: </span>{" "}
                {student.phoneNumber}
              </p>
              <p className="">
                <span className="font-bold">CNIC: </span> {student.CNIC}
              </p>
              <p className="">
                <span className="font-bold">Gender: </span> {student.gender}
              </p>
              <p className="">
                <span className="font-bold">DoB: </span>{" "}
                {new Date(student.dob).toLocaleDateString()}
              </p>
              <p className="">
                <span className="font-bold">Verified: </span>{" "}
                {student?.isVerified?.toString()}
              </p>

              <p className="">
                <span className="font-bold">Last Qualification: </span>{" "}
                {student.lastQualification}
              </p>
              <p className="">
                <span className="font-bold">Role: </span> {student.role}
              </p>
              <p className="">
                <span className="font-bold">City: </span>{" "}
                {student.city.cityName}
              </p>
              <p className="">
                <span className="font-bold">Campus: </span>{" "}
                {student.campus.name}
              </p>
              <p className="">
                <span className="font-bold">Course: </span>{" "}
                {student.course.name}
              </p>
              <p>
                <span className="font-bold">Class: </span>{" "}
                {student?.enrolledInClass?.name || "N/A"}
              </p>
              <p>
                <span className="font-bold">Batch: </span>{" "}
                {student?.enrolledInClass?.batch || "N/A"}
              </p>
              <p>
                <span className="font-bold">Teacher: </span>{" "}
                {student?.enrolledInClass?.teacher?.fullName || "N/A"}
              </p>
              <p className="col-span-1 md:col-span-2">
                <span className="font-bold">Address: </span> {student.address}
              </p>
              <p className="">
                <span className="font-bold">Created At: </span>{" "}
                {new Date(student.createdAt).toLocaleString()}
              </p>
              <p className="">
                <span className="font-bold">Updated At: </span>{" "}
                {new Date(student.updatedAt).toLocaleString()}
              </p>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-around">
              <button
                className="btn btn-success btn-outline"
                onClick={() => {
                  document
                    .getElementById(`editStudentModal-${student._id}`)
                    .showModal();
                  setVerification(student.isVerified.toString());
                }}
              >
                Edit
              </button>
              <dialog id={`editStudentModal-${student._id}`} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">
                    Edit Student
                  </h3>
                  <Autocomplete
                    disablePortal
                    id={`editStudentVerification-${student._id}`}
                    options={["true", "false"]}
                    sx={{ width: "100%", marginTop: "1rem" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Verification" />
                    )}
                    onChange={(event, value) => {
                      setVerification(value);
                    }}
                    value={verification}
                    autoComplete
                  />
                  <div className="modal-action">
                    <button
                      className="btn btn-accent w-full"
                      onClick={() => {
                        editStudentVerification(
                          student._id,
                          verification
                            ? verification
                            : student.isVerified.toString()
                        );
                        document
                          .getElementById(`editStudentModal-${student._id}`)
                          .close();
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => {
                        document
                          .getElementById(`editStudentModal-${student._id}`)
                          .close();
                        setVerification("false");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </dialog>
              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  document
                    .getElementById(`deleteStudentModal-${student._id}`)
                    .showModal();
                }}
              >
                Delete
              </button>
              <dialog
                id={`deleteStudentModal-${student._id}`}
                className="modal"
              >
                <div className="modal-box">
                  <p className="font-bold text-center">
                    Are you sure want to delete?
                  </p>
                  <div className="modal-action">
                    <button
                      className="btn btn-error mx-auto"
                      onClick={() => {
                        document
                          .getElementById(`deleteStudentModal-${student._id}`)
                          .close();
                        if (student.enrolledInClass) {
                          deleteStudent(student._id);
                        } else {
                          setAlert({
                            message:
                              "Student is enrolled in any class and cannot be deleted",
                            type: "error",
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => {
                        document
                          .getElementById(`deleteStudentModal-${student._id}`)
                          .close();
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-xl mt-8">Students not found</div>
      )}
    </div>
  );
};

export default ShowStudents;
