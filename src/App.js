import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { receiveInitialData } from "./redux/actions/initialData";
import Navbar from "./components/_layouts/Navbar";
import Wrapper from "./components/_wrappers/Wrapper";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NewPoll from "./pages/NewPoll";
import Poll from "./pages/Poll";

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(receiveInitialData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Wrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/questions/:id" element={<Poll />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} My Leaf
      </footer>
    </div>
  );
};

export default connect()(App);
