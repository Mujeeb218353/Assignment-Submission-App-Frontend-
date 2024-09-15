import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/AppContext";

const ViewStudentPerformance = (props) => {
  const { viewStudentPerformance, studentPerformance, formatDate } =
    useContext(GlobalContext);

  useEffect(() => {
    if (props.classId && props.studentId) {
      viewStudentPerformance(props.classId, props.studentId);
    }
  }, [props.classId, props.studentId, viewStudentPerformance]);

  // Check if studentPerformance or studentInfo is null/undefined
  if (!studentPerformance || !studentPerformance.studentInfo) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getBackgroundColor = () => {
    const percentage = totalAssignments === 0 ? 0 : (submittedAssignmentsCount / totalAssignments) * 100;
    
    if (percentage === 100) return 'bg-accent text-accent-content';
    if (percentage > 75) return 'bg-secondary text-secondary-content';
    if (percentage > 50) return 'bg-info text-info-content';
    if (percentage === 50) return 'bg-warning text-warning-content';
    if (percentage < 50) return 'bg-error text-error-content';
    
    return 'bg-base-100 text-base-content'; 
  };
  

  const {
    studentInfo,
    totalAssignments,
    submittedAssignmentsCount,
    submittedAssignments,
  } = studentPerformance;

  return (
    <div className="min-h-screen container mx-auto pt-24 px-4 flex flex-col justify-center items-center">
      {/* Student Info Section */}
      <div className="flex flex-col items-center bg-base-100 shadow-lg rounded-lg p-6 mb-10 w-full">
        {studentInfo.profile ? (
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
              <img src={studentInfo.profile} alt={studentInfo.fullName} />
            </div>
          </div>
        ) : (
          <p>No Profile Image Available</p>
        )}
        <h2 className="text-3xl font-bold text-accent mb-2">
          {studentInfo.fullName}
        </h2>
        <p className="text-lg text-gray-600 mb-1">
          Father's Name: {studentInfo.fatherName}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          Username: {studentInfo.username}
        </p>
        <p className="text-lg text-gray-600 mb-1">Email: {studentInfo.email}</p>
        <p className="text-lg text-gray-600 mb-1">CNIC: {studentInfo.CNIC}</p>
        <p className="text-lg text-gray-600 mb-1">
          Address: {studentInfo.address}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          Date of Birth: {new Date(studentInfo.dob).toLocaleDateString()}
        </p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-10 w-full">
        <div className="stat bg-accent text-accent-content p-6 rounded-lg shadow-md">
          <div className="stat-title text-black text-center">
            Total Assignments
          </div>
          <div className="stat-value text-center text-4xl">
            {totalAssignments}
          </div>
        </div>
        <div
          className={`stat p-6 rounded-lg shadow-md ${getBackgroundColor()}`}
        >
          <div className="stat-title text-black text-center">
            Submitted Assignments
          </div>
          <div className="stat-value text-center text-4xl">
            {submittedAssignmentsCount}
          </div>
        </div>
      </div>

      {/* Submitted Assignments Table */}
      <div className="card bg-base-100 shadow-xl p-6 w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-accent">
          Submitted Assignments
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Description</th>
                <th>Marks</th>
                <th>Submission Date</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {submittedAssignments.length > 0 ? (
                submittedAssignments.map((assignment, index) => (
                  <tr key={index} className="text-center">
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td>{assignment.marks}</td>
                    <td>
                      {assignment.submissionDate
                        ? formatDate(assignment.submissionDate)
                        : ""}
                    </td>
                    <td>
                      <a
                        href={assignment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent btn-outline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No assignments submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentPerformance;
