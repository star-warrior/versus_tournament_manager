import React, { useEffect, useRef } from "react";
// If using npm import
// import BracketsViewer from "brackets-viewer";

const ViewBrackets = ({ tournamentData }) => {
  const bracketRef = useRef(null);

  useEffect(() => {
    if (bracketRef.current && tournamentData) {
      // If using npm import:
      window.BracketsViewer.render(
        {
          stages: tournamentData.stage,
          matches: tournamentData.match,
          matchGames: tournamentData.match_game,
          participants: tournamentData.participant,
        },
        {
          selector: `#bracket-container`,
          clear: true,
        }
      );
    }
  }, [tournamentData]);

  return (
    <div
      id="bracket-container"
      ref={bracketRef}
      className="bg-gray-50 rounded shadow p-4 overflow-x-auto"
    ></div>
  );
};

export default ViewBrackets;
