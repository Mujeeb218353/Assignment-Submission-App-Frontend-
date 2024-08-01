import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

const ShowTeachersCard = () => {
  const { allTeachers } = useContext(GlobalContext);

  return (
    <div className=" mx-[-1.5rem] sm:mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Teachers</h1>
      {allTeachers.length === 0 ? (
        <div className="text-center text-xl mt-8">Teachers not found</div>
      ) : (
        <div className="flex flex-col gap-8">
          {allTeachers.slice().reverse().map((teacher) => (
            <div key={teacher._id} className="p-6 rounded-lg shadow-lg flex flex-col border">
              <div className="flex flex-col  items-center justify-between">
                <div className="flex items-center gap-4 flex-col sm:flex-row">
                  <div className="avatar w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                    <img
                      src={teacher.profile || '../../public/profile.png'}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col text-center sm:text-start">
                    <h2 className="text-2xl font-bold">{teacher.fullName || 'N/A'}</h2>
                    <p className="text-gray-400">{teacher.username || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-semibold">Email: </span>{teacher.email || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Phone Number: </span>{teacher.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Gender: </span>{teacher.gender || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">City: </span>{teacher.city?.cityName || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Verified: </span>{teacher.isVerified.toString() || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Course: </span>{teacher.course?.name || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Campuses: </span>{teacher.campus.map((campus, id) => (<li key={id}>{campus.name}</li>)) || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Classes: </span>{teacher.instructorOfClass.map((cls, id) => ( <li key={id}>{cls.name} ({cls.batch})</li> )) || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-4 flex sm:justify-end w-full gap-4 justify-center flex-wrap">
                <button className="btn btn-success btn-outline">Edit</button>
                <button className="btn btn-error btn-outline">Delete</button>
                <button className="btn btn-warning btn-outline">Delete Complete</button>
              </div>
              <hr className="my-4 border-gray-300" />
              <div>
                  <h3 className="text-xl font-semibold mb-2">Created By</h3>
                  <p><span className="font-bold">Full Name:</span> {teacher.createdBy.fullName}</p>
                  <p><span className="font-bold">Email:</span> {teacher.createdBy.email}</p>
                  <p><span className="font-bold">Gender:</span> {teacher.createdBy.gender}</p>
                  <p><span className="font-bold">Phone Number:</span> {teacher.createdBy.phoneNumber}</p>
                  <p><span className="font-bold">City:</span> {teacher.createdBy.city.cityName}</p>
                  <p><span className="font-bold">Campus:</span> {teacher.createdBy.campus.name}</p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowTeachersCard;