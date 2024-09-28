import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../redux/actions/polls";

const NewPoll = ({ dispatch }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    firstOption: '',
    secondOption: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.firstOption === '' || options.secondOption === '') {
      alert("Please enter both options");
      return;
    }
    dispatch(handleAddQuestion(options.firstOption, options.secondOption));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl text-center text-blue-600 mb-8">Create a New Poll</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <label data-testid="firstOptionLabel" className="block text-lg font-semibold mb-2" htmlFor="firstOption">First Option</label>
          <input
            value={options.firstOption}
            onChange={(e) => setOptions({ ...options, firstOption: e.target.value })}
            type="text"
            name="firstOption"
            id="firstOption"
            data-testid="firstOption"
            className="input w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter first option..."
          />
        </div>

        <div className="mb-6">
          <label data-testid="secondOptionLabel" className="block text-lg font-semibold mb-2" htmlFor="secondOption">Second Option</label>
          <input
            value={options.secondOption}
            onChange={(e) => setOptions({ ...options, secondOption: e.target.value })}
            type="text"
            name="secondOption"
            id="secondOption"
            data-testid="secondOption"
            className="input w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter second option..."
          />
        </div>

        <button type="submit" data-testid="submit-poll" className="btn bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200">
          Add Poll
        </button>
      </form>
    </div>
  );
}

export default connect()(NewPoll);
