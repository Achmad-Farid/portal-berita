import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUsersByRole } from "../redux/actions/adminAction";
import { setCurrentPage } from "../redux/reducers/articleReducer";

const UserContent = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalPages, statusFetchUsers, statusFetchUsersByRole } = useSelector((state) => state.admin); // Default value of users is set to an empty array
  const [role, setRole] = useState(""); // State to track selected role for filtering
  const [searchTerm, setSearchTerm] = useState(""); // State to track search term

  useEffect(() => {
    if (role) {
      // If role is selected, fetch users by role
      dispatch(fetchUsersByRole({ role, page: currentPage, limit: 9 }));
    } else {
      // If no role selected, fetch all users
      dispatch(fetchAllUsers({ page: currentPage, limit: 9 }));
    }
  }, [dispatch, role, currentPage]);

  // Handle change in search input (not yet implemented in the actions)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle role selection change
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User</h2>

      {/* Search and Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" value={searchTerm} onChange={handleSearchChange} />
        <select className="border p-2 rounded" value={role} onChange={handleRoleChange}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="journalist">Journalist</option>
          {/* Add more roles as needed */}
        </select>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusFetchUsers === "loading" || statusFetchUsersByRole === "loading" ? (
          <p>Loading...</p>
        ) : (
          users
            .filter((user) => user.username?.toLowerCase().includes(searchTerm.toLowerCase())) // Optional chaining
            .map((user, i) => (
              <div key={i} className="border p-4 rounded shadow bg-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{user.username}</h3>
                  <p className="text-gray-600">Role: {user.role}</p>
                </div>
                <div className="space-x-2">
                  <button className="px-2 py-1 bg-secondary text-white rounded">Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="px-4 py-2 bg-gray-300 rounded" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserContent;
