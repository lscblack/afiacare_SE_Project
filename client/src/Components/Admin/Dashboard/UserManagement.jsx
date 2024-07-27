import React from 'react';

const UserManagement = () => {
  // Dummy user data
  const users = [
    { id: 1, name: 'Admin User', role: 'Admin' },
    { id: 2, name: 'Doctor User', role: 'Doctor' },
    { id: 3, name: 'Patient User', role: 'Patient' },
  ];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="border-b py-2 ">
            <span className="font-semibold">{user.name}</span>
            <br />
            <span className="text-gray-600">Role: {user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
