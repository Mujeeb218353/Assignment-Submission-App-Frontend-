import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";

const ShowStudents = () => {
  const { allStudents, deleteStudent } = useContext(GlobalContext);
  console.log(allStudents);

  return (
    <div className="mx-auto mt-8 w-full md:w-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {allStudents && allStudents.length > 0 ? (
        allStudents.map((student) => (
          <div
            key={student._id}
            className="p-6 rounded-lg shadow-lg flex flex-col border"
          >
            <div className="flex items-center justify-center flex-col sm:flex-row  gap-4">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={student.profile}
                alt={`${student.fullName}'s profile`}
              />
              <div>
              <h2 className="text-2xl font-semibold">
                {student.fullName}
              </h2>
              <p className="text-gray-400 text-center sm:text-start">
               {student.username}
              </p>
              </div>
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className=""><span className="font-bold">Email: </span> {student.email}</p>
              <p className=""><span className="font-bold">Ph. No.: </span> {student.phoneNumber}</p>
              <p className=""><span className="font-bold">CNIC: </span> {student.CNIC}</p>
              <p className=""><span className="font-bold">Gender: </span> {student.gender}</p>
              <p className="">
              <span className="font-bold">DoB: </span> {new Date(student.dob).toLocaleDateString()}
              </p>
              <p className="">
              <span className="font-bold">Verified: </span> {student?.isVerified?.toString()}
              </p>
              
              <p className="">
              <span className="font-bold">Last Qualification: </span> {student.lastQualification}
              </p>
              <p className=""><span className="font-bold">Role: </span> {student.role}</p>
              <p className=""><span className="font-bold">City: </span> {student.city.cityName}</p>
              <p className=""><span className="font-bold">Campus: </span> {student.campus.name}</p>
              <p className=""><span className="font-bold">Course: </span> {student.course.name}</p>
              <p><span className="font-bold">Class: </span> {student.enrolledInClass.name}</p>
              <p><span className="font-bold">Batch: </span> {student.enrolledInClass.batch}</p>
              <p><span className="font-bold">Teacher: </span> {student.enrolledInClass.teacher.fullName}</p>
             <p className="col-span-1 md:col-span-2"><span className="font-bold">Address: </span> {student.address}</p>
              <p className="">
              <span className="font-bold">Created At: </span> {new Date(student.createdAt).toLocaleString()}
              </p>
              <p className="">
              <span className="font-bold">Updated At: </span> {new Date(student.updatedAt).toLocaleString()}
              </p>
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="flex justify-around">
              <button className="btn btn-success btn-outline">Edit</button>
              <button className="btn btn-error btn-outline">Delete</button>
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
