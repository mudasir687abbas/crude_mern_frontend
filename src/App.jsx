import { useState, useEffect } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import SearchedTable from './components/SearchedTable';
import UserForm from './components/Form';
import Button from './components/Button';
import { createUser, getUsers, deleteUser, updateUser, getUserById } from './api/crudeApi';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchedTable, setSearchedTable] = useState(false);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setFilteredUsers([]); // or show all users: setFilteredUsers(users)
      return;
    }

    const filtered = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(trimmedQuery)
      )
    );

    setFilteredUsers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const res = await updateUser(editIndex, formData);
        if (res && (res.status === 200 || res.status === 204)) {
          await fetchUsers();
        }
        setEditIndex(null);
      } else {
        const res = await createUser(formData);
        if (res && (res.status === 201 || res.status === 200)) {
          await fetchUsers();
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setFormData({ name: '', email: '', role: '' });
      setShowForm(false);
    }
  };

  const handleEdit = async (uid) => {
    try {
      const res = await getUserById(uid);
      // Support response shapes like res.data or res.data.data
      const userData = res?.data?.data ?? res?.data ?? {};
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || ''
      });
      setEditIndex(uid);
      setShowForm(true);
    } catch (err) {
      console.error('Error fetching user by id:', err);
    }
  };

  const handleDelete = async (delId) => {
    try {
      const delRes = await deleteUser(delId);
      console.log(delRes);
      if (delRes && (delRes.status === 200 || delRes.status === 204)) {
        await fetchUsers();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', role: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log('getUsers response:', response);
      // Support response shapes like response.data (array) or response.data.data (object with data)
      const usersData = response?.data?.data ?? response?.data ?? [];
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(filteredUsers);
  }, [filteredUsers]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} onFocus={setSearchedTable} />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} btnType="button" variant="success">
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
          data={searchedTable ? filteredUsers : users}
          toggleCaption={searchedTable}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {/* <SearchedTable
          toggle={searchedTable}
          data={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        /> */}
      </div>
    </div>
  );
};

export default App;
