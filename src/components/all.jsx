import React, { useState } from 'react';

// Header Component





const Header = ({ onSearch }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white text-blue-600 font-bold px-4 py-2 rounded">
            LOGO
          </div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </header>
  );
};

// Button Component
const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

// Table Component
const Table = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-gray-800">{user.name}</td>
                <td className="px-6 py-4 border-b text-gray-800">{user.email}</td>
                <td className="px-6 py-4 border-b space-x-2">
                  <Button onClick={() => onEdit(index)} variant="primary">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(index)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// UserForm Component
const UserForm = ({ onSubmit, formData, setFormData, editIndex, onCancel }) => {
  const handleSubmit = () => {
    if (formData.name && formData.email && formData.role) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editIndex !== null ? 'Edit User' : 'Add New User'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleSubmit} variant="success">
          {editIndex !== null ? 'Update' : 'Submit'}
        </Button>
        {editIndex !== null && (
          <Button onClick={onCancel} variant="danger">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (query) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = formData;
      setUsers(updated);
      setFilteredUsers(updated);
      setEditIndex(null);
    } else {
      const newUsers = [...users, formData];
      setUsers(newUsers);
      setFilteredUsers(newUsers);
    }
    setFormData({ name: '', email: '', role: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    setFilteredUsers(updated);
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', role: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} variant="success">
            {showForm ? 'Hide Form' : 'Add User'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-6">
            <UserForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              editIndex={editIndex}
              onCancel={handleCancel}
            />
          </div>
        )}

        <Table
          data={filteredUsers.length > 0 || users.length === 0 ? filteredUsers : users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}