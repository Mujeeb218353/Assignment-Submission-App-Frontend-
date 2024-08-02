import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

const ShowAdminsCard = () => {
  const { allAdmins } = useContext(GlobalContext);

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admins</h1>
      {allAdmins.length === 0 ? (
        <div className="text-center text-xl mt-8">Admins not found</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allAdmins.slice().reverse().map((admin) => (
            <div key={admin._id} className="p-6 rounded-lg shadow-lg flex flex-col border">
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center gap-4 flex-col sm:flex-row">
                  <div className="avatar w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                    <img
                      src={admin.profile || '../../public/profile.png'}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col text-center sm:text-start">
                    <h2 className="text-2xl font-bold">{admin.fullName || 'N/A'}</h2>
                    <p className="text-gray-400">{admin.username || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-bold">Email: </span>{admin.email || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-bold">Phone Number: </span>{admin.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-bold">Gender: </span>{admin.gender || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-bold">City: </span>{admin.city?.cityName || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-bold">Verified: </span>{admin.isVerified.toString() || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-bold">Campus: </span>{admin.campus?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-4 flex lg:justify-end w-full gap-4 justify-center flex-wrap">
                <button className="btn btn-success btn-outline">Edit</button>
                <button className="btn btn-error btn-outline">Delete</button>
                <button className="btn btn-warning btn-outline">Delete Complete</button>
              </div>
              <hr className="my-4 border-gray-300" />
              <div>
                <h3 className="text-xl font-bold mb-2">Created By</h3>
                <p><span className="font-bold">Full Name:</span> {admin.createdBy?.fullName || "N/A"}</p>
                <p><span className="font-bold">Email:</span> {admin.createdBy?.email || "N/A"}</p>
                <p><span className="font-bold">Gender:</span> {admin.createdBy?.gender || "N/A"}</p>
                <p><span className="font-bold">Phone Number:</span> {admin.createdBy?.phoneNumber || "N/A"}</p>
                <p><span className="font-bold">City:</span> {admin.createdBy?.city?.cityName || "N/A"}</p>
                <p><span className="font-bold">Campus:</span> {admin.createdBy?.campus?.name || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAdminsCard;