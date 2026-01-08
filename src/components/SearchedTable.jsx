import Button from './Button';
const Table = ({ toggle, data, onEdit, onDelete }) => {
  return (
    
    <div className="overflow-x">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
              Name
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
              Role
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
              Email
            </th>
            <th className="w-max px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className=" border-2 border-blue-200 px-6 py-4 text-center text-gray-500">
                Search for users
              </td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-center text-gray-800">{user.name}</td>
                <td className="px-6 py-4 border-b text-center text-gray-800">{user.role}</td>
                <td className="px-6 py-4 border-b text-center text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-center border-b space-x-2">
                  <Button onClick={() => onEdit(user.id)} variant="primary">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(user.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  
  )
};
export default Table;
