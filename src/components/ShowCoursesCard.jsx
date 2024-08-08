import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import EditCourseModal from "./EditCourseModal";

const ShowCoursesCard = () => {
  const { 
    allCourses, 
    deleteCourse, 
    deleteCourseCity, 
    deleteCourseCampus,
    user,
   } = useContext(GlobalContext);
  const [editCourse, setEditCourse] = useState({});
  const [cityId, setCityId] = useState("");
  const [campusId, setCampusId] = useState("");
  const [courseId, setCourseId] = useState("");


  const handelCityDelete = () => {
    document.getElementById("deleteCourseCityModal").close();
    deleteCourseCity(cityId, courseId);
    setCityId("");
  };
  const handelCampusDelete = () => {
    document.getElementById("deleteCourseCampusModal").close();
    deleteCourseCampus(campusId, courseId);
    setCampusId("");
  };

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8 w-full md:w-auto">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">All Courses</h2> */}
      {allCourses.length === 0 ? (
        <div className="text-center text-xl mt-8">Courses not found</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 xs:mx-4">
          {allCourses
            .slice()
            .reverse()
            .map((course) => (
              <div
                key={course._id}
                className="w-full shadow-xl mb-8 border rounded-lg p-4 lg:p-8"
              >
                <h2 className="text-2xl font-bold text-center my-4">
                  {course.name}
                </h2>
                <div className="">
                  <div className="flex flex-col xs:flex-row gap-4 items-center justify-between">
                    <div>
                      <div className="text-center xs:text-start mb-4">
                        <p className="font-bold mb-1">Created At</p>
                        <p>{new Date(course.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="text-center xs:text-start mb-4">
                        <p className="font-bold mb-1">Updated At</p>
                        <p>{new Date(course.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-evenly xs:justify-center w-full xs:w-auto">
                      <button
                        className="btn btn-success btn-outline"
                        onClick={() => {
                          setEditCourse({
                            name: course.name,
                            courseId: course._id,
                          });
                          document
                            .getElementById(`editCourseModal-${course._id}`)
                            .showModal();
                        }}
                      >
                        Edit
                      </button>
                      <dialog id={`editCourseModal-${course._id}`} className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                          <EditCourseModal
                            editCourse={editCourse}
                            setEditCourse={setEditCourse}
                          />
                          <div className="modal-action">
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={() =>
                                document
                                  .getElementById(`editCourseModal-${course._id}`)
                                  .close()
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </dialog>
                      <button
                        className={`btn btn-error btn-outline ${user.isVerified ? 'visible' : 'hidden'}`}
                        onClick={() => {
                          document
                            .getElementById(`deleteCourseModal-${course._id}`)
                            .showModal();
                        }}
                      >
                        Delete
                      </button>
                      <dialog id={`deleteCourseModal-${course._id}`} className="modal">
                        <div className="modal-box">
                          <div className="flex flex-col gap-4 items-center justify-center mt-4">
                            <p className="font-bold">
                              Are you sure want to delete?
                            </p>
                            <button
                              className="btn btn-error"
                              onClick={() => {
                                deleteCourse(course._id);
                                document
                                  .getElementById(`deleteCourseModal-${course._id}`)
                                  .close();
                              }}
                            >
                              Delete
                            </button>
                          </div>
                          <div className="modal-action">
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={() =>
                                document
                                  .getElementById(`deleteCourseModal-${course._id}`)
                                  .close()
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-center xs:text-start">
                      Location Info
                    </h3>
                    <div>
                      <p className="font-bold mb-4">Cities</p>
                      {course.city
                        ? course.city.map((city) => (
                            <div
                              className="w-full flex justify-between mb-2 flex-col xs:flex-row gap-4"
                              key={city._id}
                            >
                              <li>{city.cityName}</li>
                              <div className="w-full xs:w-auto flex justify-center">
                                <button className="btn btn-error btn-outline" onClick={() => {
                                  setCityId(city._id)
                                  setCourseId(course._id)
                                  document.getElementById("deleteCourseCityModal").showModal()
                                  }}>
                                  Delete
                                </button>
                                <dialog
                                  id="deleteCourseCityModal"
                                  className="modal"
                                >
                                  <div className="modal-box">
                                    <div className="flex flex-col gap-4 items-center justify-center mt-4">
                                      <p className="font-bold">
                                        Are you sure want to delete?
                                      </p>
                                      <button
                                        className="btn btn-error"
                                        onClick={handelCityDelete}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                    <div className="modal-action">
                                      <button
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                        onClick={() =>
                                          document
                                            .getElementById(
                                              "deleteCourseCityModal"
                                            )
                                            .close()
                                        }
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>
                                </dialog>
                              </div>
                            </div>
                          ))
                        : "Not Found"}
                    </div>
                    <div>
                      <p className="font-bold mb-4">Campuses</p>
                      {course.campus ? (
                        course.campus.map((campus) => (
                          <div
                            className="w-full flex justify-between mb-2 flex-col xs:flex-row gap-4"
                            key={campus._id}
                          >
                            <li>{campus.name}</li>
                            <div className="w-full xs:w-auto flex justify-center">
                              <button className="btn btn-error btn-outline" onClick={() => {
                                setCampusId(campus._id)
                                setCourseId(course._id)
                                document.getElementById("deleteCourseCampusModal").showModal()
                                }}>
                                Delete
                              </button>
                              <dialog
                                id="deleteCourseCampusModal"
                                className="modal"
                              >
                                <div className="modal-box">
                                  <div className="flex flex-col gap-4 items-center justify-center mt-4">
                                    <p className="font-bold">
                                      Are you sure want to delete?
                                    </p>
                                    <button
                                      className="btn btn-error"
                                      onClick={handelCampusDelete}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                  <div className="modal-action">
                                    <button
                                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                      onClick={() =>
                                        document
                                          .getElementById(
                                            "deleteCourseCampusModal"
                                          )
                                          .close()
                                      }
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
                        <p>Not Found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShowCoursesCard;