import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../../pages/Login";

const Wrapper = ({ loggedIn }) => {
  return (
    <div className="container mx-auto p-6  bg-gray-100 rounded-lg shadow-md">
      {loggedIn ? (
        <div className="content-area bg-white p-8 rounded-lg shadow-lg">
          <Outlet />
        </div>
      ) : (
        <div className="login-area bg-white p-8 rounded-lg shadow-lg">
          <Login />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser }) => ({
  loggedIn: !!authUser,
});

export default connect(mapStateToProps)(Wrapper);
