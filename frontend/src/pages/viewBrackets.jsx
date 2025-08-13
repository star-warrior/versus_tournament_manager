import React, { useEffect, useState } from "react";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";

import { generateBracket } from "../utils/makeBrackets.js";

import "brackets-viewer/dist/brackets-viewer.min.css";
import "brackets-viewer/dist/brackets-viewer.min.js";
import "../Stylesheet/bracketStyle.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage);

const ViewBrackets = () => {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        console.log("Fetching players for tournament:", id);
        const response = await axios.get(`/api/player/find/tournament/${id}`, {
          withCredentials: true,
        });

        const data = response.data.players;

        console.log(data);

        // Process all players at once instead of multiple setState calls
        const processedPlayers = data.map((player) => {
          if (player.seed > 0) {
            return { name: player.name, seed: player.seed };
          } else {
            return { name: player.name };
          }
        });

        console.log(processedPlayers);

        setPlayerData(processedPlayers);
      } catch (error) {
        // setError(error.message);
        console.log(error);
      } finally {
        // setLoading(false);
        // console.log("Player Data", playerData);
      }
    };
    fetchPlayers();
  }, [id]);

  useEffect(() => {
    console.log("playerData state updated:", playerData);
  }, [playerData]);

  //! Tournament Data Hook
  const [data, setData] = useState();

  const handleParticipantClick = async (participantId, matchId) => {
    console.log("Participant clicked:", participantId, "in match:", matchId);

    try {
      // Find the match data
      const match = data.match.find((m) => m.id === parseInt(matchId));
      if (!match) {
        console.log("Match not found");
        return;
      }

      // Determine which opponent was clicked and set them as winner
      let updateData = {};

      if (match.opponent1 && match.opponent1.id === parseInt(participantId)) {
        // Opponent 1 was clicked - set them as winner
        updateData = {
          id: match.id,
          opponent1: {
            score: 2,
            result: "win",
          },
          opponent2: {
            score: 0,
          },
        };
      } else if (
        match.opponent2 &&
        match.opponent2.id === parseInt(participantId)
      ) {
        // Opponent 2 was clicked - set them as winner
        updateData = {
          id: match.id,
          opponent1: {
            score: 0,
          },
          opponent2: {
            score: 2,
            result: "win",
          },
        };
      } else {
        console.log("Could not determine which opponent was clicked");
        return;
      }

      await manager.update.match(updateData);

      // Refresh the tournament data
      const tournamentData = await manager.get.stageData(0);
      setData(tournamentData);

      console.log("Match updated successfully");
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  const Rerendering = async () => {
    const bracketsViewerNode = document.querySelector(".brackets-viewer");
    bracketsViewerNode?.replaceChildren();

    // Handle match clicks (for general match interaction)
    window.bracketsViewer.onMatchClicked = async (match) => {
      console.log("A match was clicked", match);

      console.log(match.id);
      console.log(data.match[data.match.length - 1].id);
      console.log(match.status);

      // console.log (await)

      if (
        match.id == data.match[data.match.length - 1].id &&
        match.status == 2
      ) {
        const finalStand = await manager.get.finalStandings(0);

        console.log(finalStand);
      }
    };

    // Add custom CSS to make participants clickable
    // const style = document.createElement("style");
    // style.textContent = `
    //   .participant {
    //     cursor: pointer !important;
    //     transition: background-color 0.2s ease;
    //   }
    //   .participant:hover {
    //     background-color: rgba(0, 123, 255, 0.1) !important;
    //     border-radius: 3px;
    //   }
    //   .participant .participant-name {
    //     pointer-events: auto;
    //   }
    // `;
    // if (!document.getElementById("participant-click-styles")) {
    //   style.id = "participant-click-styles";
    //   document.head.appendChild(style);
    // }

    if (data && data.participant !== null) {
      // Set participant images
      window.bracketsViewer.setParticipantImages(
        data.participant.map((participant) => ({
          participantId: participant.id,
          imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
        }))
      );

      window.bracketsViewer.render(
        {
          stages: data.stage,
          matches: data.match,
          matchGames: data.match_game,
          participants: data.participant,
        },
        {
          customRoundName: (info, t) => {
            if (info.fractionOfFinal === 1 / 2) {
              if (info.groupType === "single-bracket") {
                return "Semi Finals";
              } else {
                return `${t(`abbreviations.${info.groupType}`)} ESemi Finals`;
              }
            }
            if (info.fractionOfFinal === 1 / 4) {
              return "Quarter Finals";
            }

            if (info.finalType === "grand-final") {
              if (info.roundCount > 1) {
                return `${t(`abbreviations.${info.finalType}`)} Final Round ${
                  info.roundNumber
                }`;
              }
              return `Grand Final`;
            }
          },
          participantOriginPlacement: "before",
          separatedChildCountLabel: true,
          showSlotsOrigin: true,
          showLowerBracketSlotsOrigin: true,
          highlightParticipantOnHover: true,
        }
      );

      // Add click event listeners to participants after render
      setTimeout(() => {
        const participantElements = document.querySelectorAll(".participant");
        participantElements.forEach((element) => {
          element.addEventListener("click", (e) => {
            // event.stopPropagation(); // Prevent match click from firing

            // Get participant ID and match ID from data attributes or DOM structure
            const participantId = element.getAttribute("data-participant-id");
            const matchElement = element.closest(".match");
            const matchId = matchElement
              ? matchElement.getAttribute("data-match-id")
              : null;

            // If data attributes aren't available, try to extract from DOM structure
            if (!participantId || !matchId) {
              console.log("Could not find participant or match ID from DOM");

              // Alternative: try to find by participant name
              const participantNameElement =
                element.querySelector(".participant-name");
              if (participantNameElement) {
                const participantName =
                  participantNameElement.textContent.trim();
                const participant = data.participant.find(
                  (p) => p.name === participantName
                );

                // Find match by looking at the DOM hierarchy
                const matchContainer = element.closest("[data-match-id]");
                if (participant && matchContainer) {
                  const foundMatchId =
                    matchContainer.getAttribute("data-match-id");
                  handleParticipantClick(participant.id, foundMatchId);
                } else {
                  // Fallback: find match by participant
                  const match = data.match.find(
                    (m) =>
                      (m.opponent1 && m.opponent1.id === participant?.id) ||
                      (m.opponent2 && m.opponent2.id === participant?.id)
                  );
                  if (match && participant) {
                    handleParticipantClick(participant.id, match.id);
                  }
                }
              }
            } else {
              handleParticipantClick(participantId, matchId);
            }
          });
        });
      }, 500); // Increased timeout to ensure DOM is fully rendered
    }
    console.log(data);
  };

  const rendering = async () => {
    const data = await manager.get.tournamentData(0);
    if (data.stage.length > 0) {
      // console.log(data);
      setData(data);
    }

    console.log("Fetching Participants");

    const participants = generateBracket(playerData);
    console.log(participants);

    const size = participants.length;

    await manager.create.stage({
      name: "Test",
      tournamentId: 0, //
      type: "single_elimination",
      seeding: participants,
      settings: {
        seedOrdering: ["natural"],
        balanceByes: false,
        size: size,
        matchesChildCount: 1,
        skipFirstRound: true,
        consolationFinal: false,
      },
    });
    const tournamentData = await manager.get.stageData(0);
    setData(tournamentData);
  };

  useEffect(() => {
    rendering();
  }, [playerData]);

  useEffect(() => {
    Rerendering();
  }, [data]);

  return (
    <div className="ViewBrackets">
      <div className="brackets-viewer"></div>
    </div>
  );
};

export default ViewBrackets;
