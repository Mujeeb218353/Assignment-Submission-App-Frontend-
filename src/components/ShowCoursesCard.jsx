import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext'; 

const ShowTeachersCard = () => {
  const { allCourses } = useContext(GlobalContext);

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8">
      <div className="text-3xl font-bold mb-8 text-center">All Courses</div>
      {allCourses.length === 0 ? (
        <div className="text-center text-xl mt-8">Courses not found</div>
      ) : (
        allCourses.map((course) => (
          <div key={course._id} className="card w-full shadow-xl mb-4 border">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">Course Information</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Course Info</h3>
                  <p><span className="font-bold">Course:</span> {course.name}</p>
                  <p><span className="font-bold">Created At:</span> {new Date(course.createdAt).toLocaleString()}</p>
                  <p><span className="font-bold">Updated At:</span> {new Date(course.updatedAt).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Created By</h3>
                  <p><span className="font-bold">Full Name:</span> {course.createdBy.fullName}</p>
                  <p><span className="font-bold">Email:</span> {course.createdBy.email}</p>
                  <p><span className="font-bold">Gender:</span> {course.createdBy.gender}</p>
                  <p><span className="font-bold">Phone Number:</span> {course.createdBy.phoneNumber}</p>
                  <p><span className="font-bold">City:</span> {course.createdBy.city.cityName}</p>
                  <p><span className="font-bold">Campus:</span> {course.createdBy.campus.name}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Location Info</h3>
                  <p><span className="font-bold">Cities:</span> {
                    course.city ? 
                    course.city.map((city)=> <li key={city._id}>{city.cityName}</li>) 
                    : 
                    "Not Found"
                  }</p>
                  <p><span className="font-bold">Campuses:</span> {
                    course.campus ? 
                    course.campus.map((campus)=> <li key={campus._id}>{campus.name}</li>) 
                    : 
                    "Not Found"
                  }</p>
                </div>
              </div>
              <div className="card-actions justify-center sm:justify-end mt-4">
                <button className="btn btn-success btn-outline" onClick={() => handleEdit(course)}>Edit</button>
                <button className="btn btn-error btn-outline" onClick={() => handleDelete(course)}>Delete</button>
                <button className="btn btn-warning btn-outline" onClick={() => handleDelete(course)}>Delete Complete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Example functions for edit and delete
const handleEdit = (course) => {  
  console.log(`Editing course: ${course.name}`);
};

const handleDelete = (course) => {
  console.log(`Deleting course: ${course.name}`);
};

export default ShowTeachersCard;