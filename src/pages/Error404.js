import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login";

const Error404 = ({ loggedIn }) => {
  if (!loggedIn) return <Login />;
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</p>
      <Link
        to="/login"
        className="mt-8 px-6 py-2 text-xl font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Go to Login
      </Link>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => ({
  loggedIn: !!authUser,
});

export default connect(mapStateToProps)(Error404);
