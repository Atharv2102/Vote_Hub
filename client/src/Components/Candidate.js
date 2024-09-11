import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import candidateData from '../data/candidateData.json';
import CandidateCard from './CandidateCard';
import { useParams } from 'react-router-dom';


export default function Candidate ({ }) {
  // const location = useLocation();
  const { pinCode } = useParams(); 
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const handleVote = () => {
    setHasVoted(true);
  };

  useEffect(() => {
    if (pinCode) {
      const candidates = candidateData.filter(candidate => candidate.pincode === pinCode);
      setFilteredCandidates(candidates);
    }
  }, [pinCode]);

  

  return (
    <section className="container mx-auto py-8" id="candidates">
      <h2 className="text-3xl font-semibold text-center mb-6">Candidates</h2>
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, id) => (
              <CandidateCard 
              key={id} 
              candidate={candidate} 
              hasVoted={hasVoted} 
              onVote={handleVote} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No candidates found for this pin code.</p>
      )}
    </section>
  );
};


