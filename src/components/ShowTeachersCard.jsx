import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import EditTeacherModal from "./EditTeacherModal";

const ShowTeachersCard = () => {
  const { allTeachers, user, deleteTeacher } = useContext(GlobalContext);
  const [editTeacher, setEditTeacher] = useState({})

  console.log(allTeachers);
  

  return (
    <div className=" mx-[-1.5rem] md:mx-auto mt-8 w-full md:w-auto">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Teachers</h1> */}
      {allTeachers.length === 0 ? (
        <div className="text-center text-xl mt-8">Teachers not found</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allTeachers
            .slice()
            .reverse()
            .map((teacher) => (
              <div
                key={teacher._id}
                className="p-6 rounded-lg shadow-lg flex flex-col border"
              >
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-4 flex-col sm:flex-row">
                    <div className="avatar w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                      <img
                        src={teacher.profile || "profile.png"}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col text-center sm:text-start">
                      <h2 className="text-2xl font-bold">
                        {teacher.fullName || "N/A"}
                      </h2>
                      <p className="text-gray-400">
                        {teacher.username || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-bold">Email: </span>
                      {teacher.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Phone Number: </span>
                      {teacher.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Gender: </span>
                      {teacher.gender || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">City: </span>
                      {teacher.city?.cityName || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <p>
                      <span className="font-bold">Course: </span>
                      {teacher.course?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Verified: </span>
                      {teacher.isVerified.toString() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Campuses</span>
                      {teacher.campus.length > 0 ? teacher.instructorOfClass.map((campus, id) => {
                        console.log(campus);
                        
                        return <li key={teacher._id + campus._id + id}>
                          {campus.campus?.name} - {campus.campus.city.cityName}
                        </li>
                      }) : (
                        <li className="list-none mt-2">N/A</li>
                      )}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Classes</span>
                      {teacher.instructorOfClass.length > 0 ? teacher.instructorOfClass?.map((cls, id) => (
                        <li key={teacher._id + cls._id + id}>
                          {cls.name} ({cls.batch})
                        </li>
                      )) 
                      : 
                      (<li className="list-none mt-2">N/A</li>)
                      }
                    </p>
                  </div>
                </div>
                <div className={`mt-4 flex lg:justify-end w-full gap-4 justify-evenly flex-wrap ${user.isVerified ? "visible" : "hidden"}`}>
                  <button className="btn btn-success btn-outline" onClick={() => {
                    document.getElementById(`editTeacherModal-${teacher._id}`).showModal();
                    setEditTeacher({
                      _id: teacher._id,
                      isVerified: teacher.isVerified,
                    });
                    }}>Edit</button>
                  <dialog id={`editTeacherModal-${teacher._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <EditTeacherModal
                        editTeacher={editTeacher}
                        setEditTeacher={setEditTeacher}
                      />
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() => {
                            document.getElementById(`editTeacherModal-${teacher._id}`).close();
                            setEditTeacher({}); 
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
                      document.getElementById(`deleteTeacherModal-${teacher._id}`).showModal();
                    }}
                  >
                    Delete
                  </button>
                  <dialog id={`deleteTeacherModal-${teacher._id}`} className="modal">
                    <div className="modal-box">
                      <div className="flex flex-col gap-4 items-center justify-center mt-4">
                        <p className="font-bold">
                          Are you sure want to delete?
                        </p>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteTeacher(teacher._id);
                            document.getElementById(`deleteTeacherModal-${teacher._id}`).close();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() =>
                            document.getElementById(`deleteTeacherModal-${teacher._id}`).close()
                          }
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </dialog>

                </div>
                <hr className={`my-5 border-gray-300 ${user.isVerified ? "visible" : "hidden"}`} />
                <div className={`${user.isVerified ? "visible" : "hidden"} grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4`}>
                  <div>
                  <h3 className="text-xl font-bold mb-2">Created By</h3>
                  <p>
                    <span className="font-bold">Full Name:</span>{" "}
                    {teacher.createdBy?.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {teacher.createdBy?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Gender:</span>{" "}
                    {teacher.createdBy?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Phone Number:</span>{" "}
                    {teacher.createdBy?.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">City:</span>{" "}
                    {teacher.createdBy?.city?.cityName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Campus:</span>{" "}
                    {teacher.createdBy?.campus?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Created At:</span>{" "}
                    {new Date(teacher.createdAt).toLocaleString() || "N/A"}
                  </p>
                  </div>
                  <div>
                  <h3 className="text-xl font-bold mb-2">Updated By</h3>
                  <p>
                    <span className="font-bold">Full Name:</span>{" "}
                    {teacher.updatedBy?.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {teacher.updatedBy?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Gender:</span>{" "}
                    {teacher.updatedBy?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Phone Number:</span>{" "}
                    {teacher.updatedBy?.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">City:</span>{" "}
                    {teacher.updatedBy?.city?.cityName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Campus:</span>{" "}
                    {teacher.updatedBy?.campus?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Updated At:</span>{" "}
                    {new Date(teacher.updatedAt).toLocaleString() || "N/A"}
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

export default ShowTeachersCard;