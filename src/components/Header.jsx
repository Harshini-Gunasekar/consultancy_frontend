
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/header.css";

// const Header = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/auth");
//   };

//   return (
//     <header className="header">
//       <h1>SRK Readymades</h1>
//       <nav>
//         <Link to="/">Home</Link>
        
//         {user && user.role === "admin" ? (
//           <>
//             <Link to="/admin">Dashboard</Link>
            
            
//           </>
//         ) : (
//           <>
//             <Link to="/cart">Add to Cart</Link>
//             <Link to="/orders">Orders</Link>
//           </>
//         )}
//         <Link to="/products">Products</Link>
//         <Link to="/about">About Us</Link>
//         {user ? (
//           <button type="button" onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         ) : (
//           <Link to="/auth">Login</Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="brand-text">SRK Readymades</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>

          {user && user.role === "admin" ? (
            <>
              <Link to="/admin">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/cart">Add to Cart</Link>
              <Link to="/orders">Orders</Link>
            </>
          )}
          
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
