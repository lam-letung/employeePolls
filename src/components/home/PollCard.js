import { Link } from "react-router-dom";

const PollCard = ({ poll, author }) => {
  const date = new Date(poll.timestamp).toLocaleDateString();

  return (
    <div className="flex items-center gap-4 shadow-lg rounded-lg overflow-hidden w-64 bg-white p-3 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <figure className="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center shadow-sm">
        {author?.avatarURL ? (
          <img src={author.avatarURL} alt="avatar" className="rounded-full object-cover w-full h-full" />
        ) : (
          <img src="https://via.placeholder.com/150" alt="avatar" className="rounded-full object-cover w-full h-full" />
        )}
      </figure>
      <div className="flex flex-col justify-between">
        <h2 className="text-sm font-bold text-gray-800">{author?.name}</h2>
        <p className="text-xs text-gray-500 italic">Date: {date}</p>
        <Link
          to={`/questions/${poll.id}`}
          className="mt-2 text-xs bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-3 py-1 rounded-full hover:from-indigo-500 hover:to-purple-600 transition-colors duration-300"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default PollCard;
