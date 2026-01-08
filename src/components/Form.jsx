import Button from './Button';
const Form = ({ onSubmit, formData, setFormData, editIndex, onCancel }) => {
  const handleSubmit = (e) => {
    if (formData.name && formData.email && formData.role) {
      onSubmit(e);
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editIndex !== null ? 'Edit User' : 'New User'}
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
        <Button btnType="submit" onClick={(e)=>{handleSubmit(e)}}  variant="success">
          {editIndex !== null ? 'Update' : 'Submit'}
        </Button>
        {editIndex !== null && (
          <Button onClick={onCancel} btnType="button" variant="danger">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
export default Form;