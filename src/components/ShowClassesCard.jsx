import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import EditClassModal from "./EditClassModal";

const ShowClassesCard = () => {
  const { allClasses, user, deleteClass } = useContext(GlobalContext);
  const [editClass, setEditClass] = useState({})

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8 w-full md:w-auto">
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
                <div className="mt-4 flex lg:justify-end w-full gap-4 justify-evenly flex-wrap">
                <button
                    className="btn btn-success btn-outline"
                    onClick={() => {
                      setEditClass({
                        _id: cls._id,
                        name: cls.name,
                        enrollmentKey: cls.enrollmentKey,
                        batch: cls.batch,
                        campus: {
                          _id: cls.campus._id,
                          name: cls.campus.name,
                        },
                        city:{
                          _id: cls.city._id,
                          cityName: cls.city.cityName
                        },
                        course:{
                          _id: cls.course._id,
                          name: cls.course.name
                        },
                        teacher:{
                          _id: cls.teacher._id,
                          fullName: cls.teacher.fullName
                        }
                      });
                      // console.log(editClass);
                      document.getElementById(`editClassModal-${cls._id}`).showModal();
                    }}
                  >
                    Edit
                  </button>
                  <dialog id={`editClassModal-${cls._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <EditClassModal
                        editClass_s={editClass}
                        setEditClass_s={setEditClass}
                      />
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() => {
                            document.getElementById(`editClassModal-${cls._id}`).close();
                            setEditClass({}); 
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </dialog>
                  <button
                    className={`btn btn-error btn-outline ${
                      user.isVerified ? "visible" : "hidden"
                    }`}
                    onClick={() => {
                      document.getElementById(`deleteClassModal-${cls._id}`).showModal();
                    }}
                  >
                    Delete
                  </button>
                  <dialog id={`deleteClassModal-${cls._id}`} className="modal">
                    <div className="modal-box">
                      <div className="flex flex-col gap-4 items-center justify-center mt-4">
                        <p className="font-bold">
                          Are you sure want to delete?
                        </p>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteClass(cls._id);
                            document.getElementById(`deleteClassModal-${cls._id}`).close();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() =>
                            document.getElementById(`deleteClassModal-${cls._id}`).close()
                          }
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </dialog>
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
                      {cls.createdBy?.city?.cityName || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Campus:</span>{" "}
                      {cls.createdBy?.campus?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Created At:</span>{" "}
                      {new Date(cls.createdAt).toLocaleString() || "N/A"}
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
                    <p>
                      <span className="font-bold">Updated At:</span>{" "}
                      {new Date(cls.updatedAt).toLocaleString() || "N/A"}
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
