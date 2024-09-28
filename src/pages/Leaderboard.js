import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  const sortedUsers = Object.keys(users).sort((a, b) => {
    const userA = users[a];
    const userB = users[b];
    const userAScore = Object.keys(userA.answers).length + Object.keys(userA.questions).length;
    const userBScore = Object.keys(userB.answers).length + Object.keys(userB.questions).length;
    return userBScore - userAScore;
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 text-black">
      <h1 className="text-5xl font-extrabold mb-12 drop-shadow-lg">Leaderboard</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedUsers.map((user, index) => {
          const { name, avatarURL, answers, questions, id } = users[user];
          const totalScore = Object.keys(answers).length + Object.keys(questions).length;
          return (
            <div key={id} className="bg-white rounded-lg shadow-xl p-6 flex items-center gap-6">
              <img
                src={avatarURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                alt={name}
                className="w-20 h-20 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-lg text-gray-600">{`Score: ${totalScore}`}</p>
              </div>
              <div className="ml-auto text-center">
                <p className="text-lg font-semibold">{`Rank: #${index + 1}`}</p>
                <p className="text-lg">{`${Object.keys(answers).length} Answered`}</p>
                <p className="text-lg">{`${Object.keys(questions).length} Polls Created`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Leaderboard);
