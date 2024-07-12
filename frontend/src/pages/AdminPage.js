
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { UserState } from '../context/UserProvider';

// const AdminDashboard = () => {
//   const { token } = UserState();
//   const navigate = useNavigate();
//   const baseURL = 'http://localhost:8000';

//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
//   const [editingUser, setEditingUser] = useState(null);
//   const [editedUser, setEditedUser] = useState({});

//   // Fetch users from API
//   const fetchUsers = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(`${baseURL}/admin/users`, config);
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }, [token, baseURL]);

//   useEffect(() => {
//     const isAdmin = localStorage.getItem('isAdmin') === 'true';
//     if (!isAdmin) {
//       navigate('/home');
//     }
//     if (token) {
//       fetchUsers();
//     } else {
//       navigate('/login');
//     }
//   }, [token, navigate, fetchUsers]);

//   // Add a new user
//   const addUser = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.post(`${baseURL}/admin/users`, newUser, config);
//       setUsers([...users, response.data]);
//       setNewUser({ name: '', email: '', password: '', role: 'user' });

//       // Scroll to the bottom of the user list
//       const userList = document.getElementById('user-list');
//       if (userList) {
//         userList.scrollTop = userList.scrollHeight;
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   // Delete a user
//   const deleteUser = async (id) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.delete(`${baseURL}/admin/users/${id}`, config);
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Edit a user
//   const saveEditUser = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.put(`${baseURL}/admin/users/${editingUser._id}`, editedUser, config);
//       const updatedUsers = users.map((user) => (user._id === editingUser._id ? response.data : user));
//       setUsers(updatedUsers);
//       setEditingUser(null);
//       setEditedUser({});
//     } catch (error) {
//       console.error('Error editing user:', error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('signedJWT');
//     localStorage.removeItem('isAdmin');
//     navigate('/');
//   };

//   // Start editing user
//   const startEditUser = (user) => {
//     setEditingUser(user);
//     setEditedUser(user);
//   };

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//       <div className="flex flex-col md:flex-row justify-between">
//         <div className="w-full md:w-3/4">
//           <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">User List:</h3>
//           <div className="overflow-y-auto max-h-96" id="user-list">
//             <table className="min-w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-200 px-4 py-2">Name</th>
//                   <th className="border border-gray-200 px-4 py-2">Email</th>
//                   <th className="border border-gray-200 px-4 py-2">Role</th>
//                   <th className="border border-gray-200 px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id} className="border-t border-gray-200">
//                     <td className="border border-gray-200 px-4 py-2">{user.name}</td>
//                     <td className="border border-gray-200 px-4 py-2">{user.email}</td>
//                     <td className="border border-gray-200 px-4 py-2">{user.role}</td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       <button className="text-sm text-blue-500 hover:text-blue-700 mr-2" onClick={() => startEditUser(user)}>Edit</button>
//                       <button className="text-sm text-red-500 hover:text-red-700" onClick={() => deleteUser(user._id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="w-full md:w-1/4 mt-4 md:mt-0">
//           <div className="bg-white p-4 rounded shadow-md">
//             <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">Add New User:</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={newUser.name || ''}
//               onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//               className="border rounded py-1 px-2 mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Email"
//               value={newUser.email || ''}
//               onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//               className="border rounded py-1 px-2 mb-2"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={newUser.password || ''}
//               onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//               className="border rounded py-1 px-2 mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Role"
//               value={newUser.role || 'user'}
//               onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//               className="border rounded py-1 px-2 mb-2"
//             />
//             <button
//               onClick={addUser}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Add User
//             </button>
//           </div>
//         </div>
//       </div>

//       {editingUser && (
//         <div className="mt-4 md:pl-4 overflow-x-auto">
//           <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">Edit User:</h3>
//           <input
//             type="text"
//             placeholder="Name"
//             value={editedUser.name || ''}
//             onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
//             className="border rounded py-1 px-2 mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Email"
//             value={editedUser.email || ''}
//             onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
//             className="border rounded py-1 px-2 mb-2"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={editedUser.password || ''}
//             onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
//             className="border rounded py-1 px-2 mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Role"
//             value={editedUser.role || 'user'}
//             onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
//             className="border rounded py-1 px-2 mb-2"
//           />
//           <div className="flex space-x-2">
//             <button
//               onClick={saveEditUser}
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditingUser(null)}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../context/UserProvider';

const AdminDashboard = () => {
  const { token } = UserState();
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000';

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${baseURL}/admin/users`, config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [token, baseURL]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/home');
    }
    if (token) {
      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [token, navigate, fetchUsers]);

  // Add a new user
  const addUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${baseURL}/admin/users`, newUser, config);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', password: '', role: 'user' });

      // Scroll to the bottom of the user list
      const userList = document.getElementById('user-list');
      if (userList) {
        userList.scrollTop = userList.scrollHeight;
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${baseURL}/admin/users/${id}`, config);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Edit a user
  const saveEditUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${baseURL}/admin/users/${editingUser._id}`, editedUser, config);
      const updatedUsers = users.map((user) => (user._id === editingUser._id ? response.data : user));
      setUsers(updatedUsers);
      setEditingUser(null);
      setEditedUser({});
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('signedJWT');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Start editing user
  const startEditUser = (user) => {
    setEditingUser(user);
    setEditedUser(user);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-3/4">
          <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">User List:</h3>
          <div className="overflow-y-auto max-h-96" id="user-list">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Name</th>
                  <th className="border border-gray-200 px-4 py-2">Email</th>
                  <th className="border border-gray-200 px-4 py-2">Role</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-gray-200">
                    <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button className="text-sm text-blue-500 hover:text-blue-700 mr-2" onClick={() => startEditUser(user)}>Edit</button>
                      <button className="text-sm text-red-500 hover:text-red-700" onClick={() => deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-1/4 mt-4 md:mt-0">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">Add New User:</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name || ''}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border rounded py-1 px-2 mb-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={newUser.email || ''}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border rounded py-1 px-2 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password || ''}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border rounded py-1 px-2 mb-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={newUser.role || 'user'}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border rounded py-1 px-2 mb-2"
            />
            <button
              onClick={addUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {editingUser && (
        <div className="mt-4 md:pl-4 overflow-x-auto">
          <h3 className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-2">Edit User:</h3>
          <input
            type="text"
            placeholder="Name"
            value={editedUser.name || ''}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            className="border rounded py-1 px-2 mb-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={editedUser.email || ''}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            className="border rounded py-1 px-2 mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={editedUser.password || ''}
            onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
            className="border rounded py-1 px-2 mb-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={editedUser.role || ''}
            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
            className="border rounded py-1 px-2 mb-2"
          />
          <button
            onClick={saveEditUser}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingUser(null)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
