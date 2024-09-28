import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../redux/actions/polls";
import Error404 from "./Error404";

const Poll = ({ authUser, users, questions, dispatch }) => {
  const { id } = useParams();
  const authorName = users[questions[id]?.author]?.name;
  const authUserAnswer = users[authUser?.id]?.answers[id];
  const [answer, setAnswer] = useState(authUserAnswer);
  const initialVoteCount = {
    optionOne: questions[id]?.optionOne?.votes?.length,
    optionTwo: questions[id]?.optionTwo?.votes?.length,
  };
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  
  if (!questions[id]) return <Error404 />;
  
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Poll by {authorName}</h1>
      {
        users[questions[id].author].avatarURL
          ? <img
              src={users[questions[id].author].avatarURL}
              alt="avatar"
              className="rounded-full w-24 h-24 mx-auto mb-4" />
          : <div className="rounded-full w-24 h-24 mx-auto bg-gray-400 grid place-content-center mb-4">
              <span className="text-3xl font-extrabold text-white">{authorName[0]}</span>
            </div>
      }
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Would you rather</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddAnswer(id, "optionOne"));
              setAnswer("optionOne");
              setVoteCount((prev) => ({ ...prev, optionOne: prev.optionOne + 1 }));
            }}
            className={`btn btn-lg btn-outline flex flex-col gap-2 p-4 border rounded-lg transition-all duration-300 ease-in-out ${answer === 'optionOne' ? "bg-green-500 text-white" : "bg-white"}`}
          >
            <span className="font-semibold">{questions[id].optionOne.text}</span>
            {authUserAnswer && <span className="text-gray-600">
              votes: {voteCount.optionOne} {" "}
              ({((voteCount.optionOne / (voteCount.optionOne + voteCount.optionTwo)) * 100).toFixed(2)} %)
            </span>}
          </button>
          <button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddAnswer(id, "optionTwo"));
              setAnswer("optionTwo");
              setVoteCount((prev) => ({ ...prev, optionTwo: prev.optionTwo + 1 }));
            }}
            className={`btn btn-lg btn-outline flex flex-col gap-2 p-4 border rounded-lg transition-all duration-300 ease-in-out ${answer === 'optionTwo' ? "bg-green-500 text-white" : "bg-white"}`}
          >
            <span className="font-semibold">{questions[id].optionTwo.text}</span>
            {authUserAnswer && <span className="text-gray-600">
              votes: {voteCount.optionTwo} {" "}
              ({((voteCount.optionTwo / (voteCount.optionOne + voteCount.optionTwo)) * 100).toFixed(2)} %)
            </span>}
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authUser, users, questions }) => {
  return {
    authUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(Poll);
