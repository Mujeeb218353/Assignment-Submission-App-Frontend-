import { useContext, useState } from "react";
import { GlobalContext } from "../context/AppContext";
import EditAdminModal from "./EditAdminModal";

const ShowAdminsCard = () => {
  const { allAdmins, user, deleteAdmin } = useContext(GlobalContext);
  const [editAdmin, setEditAdmin] = useState({});

  return (
    <div className="mx-[-1.5rem] sm:mx-auto mt-8 w-full md:w-auto">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Admins</h1> */}
      {allAdmins.length === 0 ? (
        <div className="text-center text-xl mt-8">Admins not found</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allAdmins
            .slice()
            .reverse()
            .map((admin) => 
              (
              <div
                key={admin._id}
                className="p-6 rounded-lg shadow-lg flex flex-col border"
              >
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-4 flex-col sm:flex-row">
                    <div className="avatar w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                      <img
                        src={admin.profile || "../../public/profile.png"}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col text-center sm:text-start">
                      <h2 className="text-2xl font-bold">
                        {admin.fullName || "N/A"}
                      </h2>
                      <p className="text-gray-400">{admin.username || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-bold">Email: </span>
                      {admin.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Phone Number: </span>
                      {admin.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Gender: </span>
                      {admin.gender || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">City: </span>
                      {admin.city?.cityName || "N/A"}
                    </p>
                  </div>
                  <div className={`${user.isVerified ? "visible" : "hidden"}`}>
                    <p>
                      <span className="font-bold">Verified: </span>
                      {admin?.isVerified != null ? admin.isVerified.toString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Campus: </span>
                      {admin.campus?.name || "N/A"}
                    </p>
                  </div>
                </div>
                <div
                  className={`mt-4 flex lg:justify-end w-full gap-4 justify-center flex-wrap`}
                >
                  <button
                    className="btn btn-success btn-outline"
                    onClick={() => {
                      setEditAdmin({
                        _id: admin._id,
                        isVerified: admin.isVerified,
                        campus: {
                          _id: admin.campus._id,
                          name: admin.campus.name,
                        },
                        city:{
                          _id: admin.city._id,
                          cityName: admin.city.cityName
                        },
                      });
                      // console.log(editAdmin);
                      document.getElementById(`editAdminModal-${admin._id}`).showModal();
                    }}
                  >
                    Edit
                  </button>
                  <dialog id={`editAdminModal-${admin._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <EditAdminModal
                        editAdmin={editAdmin}
                        setEditAdmin={setEditAdmin}
                      />
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() => {
                            document.getElementById(`editAdminModal-${admin._id}`).close();
                            setEditAdmin({}); 
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
                      document.getElementById(`deleteAdminModal-${admin._id}`).showModal();
                    }}
                  >
                    Delete
                  </button>
                  <dialog id={`deleteAdminModal-${admin._id}`} className="modal">
                    <div className="modal-box">
                      <div className="flex flex-col gap-4 items-center justify-center mt-4">
                        <p className="font-bold">
                          Are you sure want to delete?
                        </p>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteAdmin(admin._id);
                            document.getElementById(`deleteAdminModal-${admin._id}`).close();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() =>
                            document.getElementById(`deleteAdminModal-${admin._id}`).close()
                          }
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className={`${user.isVerified ? "visible" : "hidden"} grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4`}>
                  <div>
                  <h3 className="text-xl font-bold mb-2">Created By</h3>
                  <p>
                    <span className="font-bold">Full Name:</span>{" "}
                    {admin.createdBy?.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {admin.createdBy?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Gender:</span>{" "}
                    {admin.createdBy?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Phone Number:</span>{" "}
                    {admin.createdBy?.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">City:</span>{" "}
                    {admin.createdBy?.city?.cityName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Campus:</span>{" "}
                    {admin.createdBy?.campus?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Created At:</span>{" "}
                    {new Date(admin.createdAt).toLocaleString() || "N/A"}
                  </p>
                  </div>
                  <div>
                  <h3 className="text-xl font-bold mb-2">Updated By</h3>
                  <p>
                    <span className="font-bold">Full Name:</span>{" "}
                    {admin.updatedBy?.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {admin.updatedBy?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Gender:</span>{" "}
                    {admin.updatedBy?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Phone Number:</span>{" "}
                    {admin.updatedBy?.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">City:</span>{" "}
                    {admin.updatedBy?.city?.cityName || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Campus:</span>{" "}
                    {admin.updatedBy?.campus?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Updated At:</span>{" "}
                    {new Date(admin.updatedAt).toLocaleString() || "N/A"}
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

export default ShowAdminsCard;
