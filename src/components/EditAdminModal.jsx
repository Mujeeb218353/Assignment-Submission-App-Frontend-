import React from 'react'

const EditAdminModal = ({ editAdmin = {isVerified: false, campus: {name: '', _id: ''}}, setEditAmin}) => {
    console.log(editAdmin);
    
  return (
    <div>
      <p>Verified:{editAdmin.isVerified.toString()}</p>
      <p>Name: {editAdmin.campus.name}</p>
      <p>ID: {editAdmin.campus._id}</p>
    </div>
  )
}

export default EditAdminModal;