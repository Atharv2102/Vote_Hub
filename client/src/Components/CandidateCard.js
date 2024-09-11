import React from 'react';
import { useState } from 'react';

const CandidateCard = ({ candidate, hasVoted, onVote }) => {

// const [vote,setvote]=useState(candidate.votes)
console.log(candidate.votes);
  const handleVote = () => {
    onVote(); 
    candidate.votes+=1;
    console.log(candidate.votes)
    // Call the parent function to set the global vote state
    // Add your voting logic here, like sending a request to the server
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center transform transition-all duration-300 hover:scale-105">
      <img 
        src={candidate.image} 
        alt={candidate.name} 
        className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-500" 
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{candidate.name}</h3>
      <p className="text-gray-600 mb-1">Pincode: {candidate.pincode}</p>
      <p className="text-gray-600 mb-1">Age: {candidate.age}</p>
      <p className="text-gray-600 mb-1">Party: {candidate.partyName}</p>
      <img 
        src={candidate.partySymbol} 
        alt={candidate.partyName} 
        className="w-12 h-12 object-contain mt-2 mb-4"
      />
      <button 
        onClick={handleVote}
        disabled={hasVoted}
        className={`w-full px-4 py-2 rounded-md text-white font-semibold transition-all ${
          hasVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {hasVoted ? 'Voted' : 'Vote'}
      </button>
    </div>
  );
};

export default CandidateCard;


