import React, { useEffect, useState } from "react";

export default function Scoreboard({ user }) {
  const [totalPoints, setTotalPoints] = useState(11);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerName, setPlayerName] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });
  const [gameMeassage, setGameMessage] = useState(null);
  const [shuttlePosition, setShuttlePosition] = useState(true);

  const handleScore = (player, delta) => {
    setScores((prev) => ({
      ...prev,
      [player]: prev[player] + delta,
    }));

    player === "player1" ? setShuttlePosition(true) : setShuttlePosition(false);
  };

  //! Points Logic

  useEffect(() => {
    // Game Point Logic
    if (
      scores.player1 == totalPoints - 1 ||
      scores.player2 == totalPoints - 1
    ) {
      setGameMessage(
        `Game Point! ${
          scores.player1 == totalPoints - 1 ? "Player 1" : "Player 2"
        }`
      );
    }

    // Duece Logic

    if (
      scores.player1 == totalPoints - 1 &&
      scores.player2 == totalPoints - 1
    ) {
      setTotalPoints((prev) => {
        let i = 0;
        if (i < 1) {
          i++;
          return prev + 1;
        } else {
          return prev + 2;
        }
      });
      setGameMessage(`Duece !! Win next 2 Consecutive Points to win!`);
    }

    // Winning Logic
    if (scores.player1 >= totalPoints || scores.player2 >= totalPoints) {
      setGameMessage(
        `Game Over! ${
          scores.player1 >= totalPoints ? "Player 1" : "Player 2"
        } Wins!`
      );
      setTimeout(() => {
        setScores({ player1: 0, player2: 0 });
        setTotalPoints(21);
        setGameMessage(null);
      }, 3000);
    }
  }, [scores]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <span className="text-xl text-white mb-2 p-2  rounded-lg">
        {gameMeassage}{" "}
      </span>
      <div className="bg-[#191a23] rounded-2xl shadow-lg px-10 py-8 flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        {/* Player 1 */}

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <img
              className="rounded-full"
              src="../assets/pictures/image.png"
              alt="Profile Picture"
            />
          </div>
          <div className="flex flex-row gap-3">
            <span className="text-gray-300 font-medium mb-3">
              {playerName.player1}
            </span>
            {shuttlePosition && (
              <img
                className="h-5"
                src="../assets/pictures/shuttle.png"
                alt="(serving)"
              />
            )}
          </div>

          <div className="bg-black rounded-xl px-8 py-4 mb-4">
            <span className="text-white text-5xl font-extrabold font-mono">
              {scores.player1}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => handleScore("player1", 1)}
            >
              +
            </button>
            <button
              className="bg-red-700 hover:bg-red-800 text-white text-2xl font-bold rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => handleScore("player1", -1)}
            >
              -
            </button>
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <img
              className="rounded-full"
              src="../assets/pictures/image.png"
              alt="Profile Picture"
            />
          </div>
          <div className="flex flex-row gap-3">
            <span className="text-gray-300 font-medium mb-3">
              {playerName.player2}
            </span>
            {!shuttlePosition && (
              <img
                className="h-5"
                src="../assets/pictures/shuttle.png"
                alt="(serving)"
              />
            )}
          </div>
          <div className="bg-black rounded-xl px-8 py-4 mb-4">
            <span className="text-white text-5xl font-extrabold font-mono">
              {scores.player2}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => handleScore("player2", 1)}
            >
              +
            </button>
            <button
              className="bg-red-700 hover:bg-red-800 text-white text-2xl font-bold rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => handleScore("player2", -1)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
