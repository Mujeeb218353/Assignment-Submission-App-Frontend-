import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from "../context/AppContext";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const StudentsPerformance = () => {
  const { classes, getStudentsByClass, studentsByClass, viewStudentPerformance } = useContext(GlobalContext);
  const [selectedClass, setSelectedClass] = useState(null);

  // console.log(studentsByClass);
  

  useEffect(() => {
    if (selectedClass) {
      getStudentsByClass(selectedClass._id);
    }
  }, [selectedClass]);

  // Access the students array and class details from studentsByClass
  const students = studentsByClass?.students || [];
  const className = studentsByClass?.name || '';
  const batch = studentsByClass?.batch || '';
  const enrollmentKey = studentsByClass?.enrollmentKey || '';

  return (
    <div className="p-6">
      <div className="mb-4">
        <Autocomplete
          options={classes}
          getOptionLabel={(option) => option.name || ""}
          onChange={(event, newValue) => setSelectedClass(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select Class" variant="outlined" fullWidth />
          )}
        />
      </div>
      
      {selectedClass ? (
        <>
          <div className="mb-4 flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-center ">{className}</h2>
            <p className='text-center'><strong>Batch:</strong> {batch}</p>
            <p className='text-center'><strong>Enrollment Key:</strong> {enrollmentKey}</p>
          </div>
          
          {students.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="text-center">
                  <th>Roll No.</th>
                  <th>Full Name</th>
                  <th>Father Name</th>
                  <th>Email</th>
                  <th>CNIC</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student._id} className='text-center'>
                    <td>{student?.rollNo || ""}</td>
                    <td>{student?.fullName}</td>
                    <td>{student?.fatherName}</td>
                    <td>{student?.email}</td>
                    <td>{student?.CNIC}</td>
                    <td>{student?.address}</td>
                    <td>
                      <Link 
                        to={`/students/${student._id}`}
                        className="btn btn-info btn-outline" 
                        onClick={() => {
                          viewStudentPerformance(selectedClass._id, student._id)
                          localStorage.setItem('studentId', student._id);
                          localStorage.setItem('classId', selectedClass._id);
                        }}
                        >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-center mt-4'>No students found for the selected class.</p>
          )}
        </>
      ) : (
        <p className='text-center mt-4'>Please select a class to see students.</p>
      )}
    </div>
  );
};

export default StudentsPerformance;