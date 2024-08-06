import React, { useContext } from "react";
import { GlobalContext } from "../context/AppContext";

const ShowClassesCard = () => {
  const { allClasses } = useContext(GlobalContext);

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Classes</h1> */}
      {allClasses.length === 0 ? (
        <div className="text-center text-xl mt-8">Classes not found</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allClasses
            .slice()
            .reverse()
            .map((cls) => (
              <div
                key={cls._id}
                className="p-6 rounded-lg shadow-lg flex flex-col border"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">
                  {cls.name}
                </h2>
                <hr className="my-4 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Class Info</h2>
                    <p>
                      <span className="font-bold">Enrollment Key: </span>
                      {cls.enrollmentKey || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Batch: </span>
                      {cls.batch || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">City: </span>
                      {cls.city?.cityName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Campus: </span>
                      {cls.campus?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Course: </span>
                      {cls.course?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">No. of Students: </span>
                      {cls.students.length || 0}
                    </p>
                    <p>
                      <span className="font-bold">Assignments: </span>
                      {cls.assignments.length || 0}
                    </p>
                    <p>
                      <span className="font-bold">Quizzes: </span>
                      {cls.quizzes.length || 0}
                    </p>
                    <p>
                      <span className="font-bold">Attendances: </span>
                      {cls.attendances.length || 0}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Teacher Info</h2>
                    <p>
                      <span className="font-bold">Full Name: </span>
                      {cls.teacher.fullName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Email: </span>
                      {cls.teacher.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Phone Number: </span>
                      {cls.teacher.phoneNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Gender: </span>
                      {cls.teacher.gender || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">City: </span>
                      {cls.teacher.city?.cityName || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex lg:justify-end w-full gap-4 justify-center flex-wrap">
                  <button className="btn btn-success btn-outline">Edit</button>
                  <button className="btn btn-error btn-outline">Delete</button>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Created By</h3>
                    <p>
                      <span className="font-bold">Full Name:</span>{" "}
                      {cls.createdBy.fullName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>{" "}
                      {cls.createdBy.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Gender:</span>{" "}
                      {cls.createdBy.gender || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Phone Number:</span>{" "}
                      {cls.createdBy.phoneNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">City:</span>{" "}
                      {cls.createdBy.city.cityName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Campus:</span>{" "}
                      {cls.createdBy.campus.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Updated By</h3>
                    <p>
                      <span className="font-bold">Full Name:</span>{" "}
                      {cls.updatedBy?.fullName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>{" "}
                      {cls.updatedBy?.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Gender:</span>{" "}
                      {cls.updatedBy?.gender || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Phone Number:</span>{" "}
                      {cls.updatedBy?.phoneNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">City:</span>{" "}
                      {cls.updatedBy?.city?.cityName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Campus:</span>{" "}
                      {cls.updatedBy?.campus?.name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShowClassesCard;
