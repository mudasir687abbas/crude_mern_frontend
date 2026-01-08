
const Header = ({ onSearch,onFocus}) => {
  return (
   <header className="bg-blue-600 text-white p-3.5 shadow-md flex justify-between items-center">
    <div>
        <h1 className="text-white text-lg font-bold">
            Crude App                                                                                              
        </h1>
        <h4 className="text-sm text-blue-100">MERN with MYSQL</h4>
    </div>   
    
    <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {onSearch(e.target.value)}}
        onFocus={() => {onFocus(true)}}
        onBlur={(e) => {onFocus(false);e.target.value='';}}
    
        className="h-max bg-white px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
    /> 
</header>
  );
};

export default Header;