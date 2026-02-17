import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import '../Styles/Navbar.module.css'
const Navbar = ({ setQuery }) => {

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update the query with the input value
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally, you can redirect to the search route if needed
  };
  return (
    <>
        <nav
          className="navbar fixed-top navbar-expand-lg navbar-dark "
          style={{
            background: "transparent",
            backdropFilter: "blur(2px) saturate(180%)",
            WebkitBackdropFilter: "blur(2px) saturate(180%)",
          }}
        >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TrendBeat 
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/General">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Technology">
                  Technology
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                placeholder="Search on TrendBeat "
                onChange={handleSearchChange}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  color: "white",
                  WebkitTextFillColor: "white",
                  opacity: 1,
                }}
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Navbar;
