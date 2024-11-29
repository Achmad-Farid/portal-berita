import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers, fetchUsersByRole, updateUserRole } from "../redux/actions/adminAction";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import Pagination from "../components/Pagination";

const UserContent = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalPages, statusFetchUsers, statusFetchUsersByRole } = useSelector((state) => state.admin);
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (role) {
      dispatch(fetchUsersByRole({ role, page: currentPage, limit: 9 }));
    } else {
      dispatch(fetchAllUsers({ page: currentPage, limit: 9 }));
    }
  }, [dispatch, role, currentPage]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [role, searchTerm, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleEditChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, role: newRole }));
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
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
                  <p className="text-gray-600">email: {user.email}</p>
                </div>
                <div className="space-x-2 flex flex-col items-center gap-2">
                  <select value={user.role} onChange={(e) => handleEditChange(user._id, e.target.value)} className="px-2 py-1 bg-secondary text-white rounded">
                    <option value="user">User</option>
                    <option value="journalist">Journalist</option>
                  </select>

                  <button onClick={() => handleDelete(user._id)} className="px-2 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}></Pagination>
    </div>
  );
};

export default UserContent;
