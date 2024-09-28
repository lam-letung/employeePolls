import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogoutAuthedUser } from "../../redux/actions/authedUser";
import { FaHome, FaPollH, FaTrophy, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = ({ dispatch, authUser }) => {
  const logoutHandle = () => {
    dispatch(handleLogoutAuthedUser());
  };

  return (
    <nav className="navbar bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg text-white">
      <div className="flex-1">
        <Link data-testid="logo" to="/" className="btn btn-ghost normal-case text-2xl text-white font-bold">
          Employee Polls
        </Link>
      </div>
      <div className="flex-none mx-auto">
        {authUser && (
          <h2 data-testid="authUserName" className="text-2xl font-semibold">
            {authUser?.name}
          </h2>
        )}
      </div>
      <div className="flex-none">
        <ul data-testid="navbuttons" className="menu menu-horizontal space-x-4">
          <li>
            <Link data-testid="home-link" to="/" className="flex items-center space-x-2 hover:text-gray-200">
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link data-testid="new-poll-link" to="/add" className="flex items-center space-x-2 hover:text-gray-200">
              <FaPollH /> <span>New Poll</span>
            </Link>
          </li>
          <li>
            <Link data-testid="leaderboard-link" to="/leaderboard" className="flex items-center space-x-2 hover:text-gray-200">
              <FaTrophy /> <span>Leaderboard</span>
            </Link>
          </li>
          {authUser ? (
            <li>
              <button data-testid="logout-link" onClick={logoutHandle} className="flex items-center space-x-2 hover:text-gray-200">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </li>
          ) : (
            <li>
              <Link data-testid="login-link" to="/login" className="flex items-center space-x-2 hover:text-gray-200">
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps)(Navbar);
