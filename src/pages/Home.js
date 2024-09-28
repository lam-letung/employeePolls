import { useState } from "react";
import { connect } from "react-redux";
import PollCard from "../components/home/PollCard";

const Home = ({ answeredPolls, unansweredPolls, users }) => {
  const [showPoll, setShowPoll] = useState(0);

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-700 mb-8">Dashboard</h1>

      <div className="tabs w-full flex justify-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => setShowPoll(0)}
            className={`py-2 px-4 rounded-full ${showPoll === 0 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
          >
            Unanswered Polls
          </button>
          <button
            onClick={() => setShowPoll(1)}
            className={`py-2 px-4 rounded-full ${showPoll === 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
          >
            Answered Polls
          </button>
        </div>
      </div>

      {showPoll === 0 ? (
        <div>
          <h2 className="text-blue-600 text-xl mb-4">Unanswered Polls</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unansweredPolls.map(poll => (
              <PollCard key={poll.id} poll={poll} author={users[poll.author]} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-blue-600 text-xl mb-4">Answered Polls</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {answeredPolls.map(poll => (
              <PollCard key={poll.id} poll={poll} author={users[poll.author]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser, questions, users }) => {
  const answeredPolls = Object.values(questions)
    .filter(poll => poll.optionOne.votes.includes(authUser.id) || poll.optionTwo.votes.includes(authUser.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredPolls = Object.values(questions)
    .filter(poll => !poll.optionOne.votes.includes(authUser.id) && !poll.optionTwo.votes.includes(authUser.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredPolls,
    unansweredPolls,
    users,
  };
};

export default connect(mapStateToProps)(Home);
