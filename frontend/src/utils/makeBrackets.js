// Tournament Bracket Generator - Fixed Version

function nextPowerOfTwo(n) {
    return Math.pow(2, Math.ceil(Math.log2(n)));
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateBracket(players) {
    // Separate seeded and unseeded players
    const seededPlayers = players.filter(
        (p) => p.seed !== null && p.seed !== undefined && p.seed !== ""
    );
    const unseededPlayers = players.filter(
        (p) => p.seed === null || p.seed === undefined || p.seed === ""
    );

    // Sort seeded players by seed
    seededPlayers.sort((a, b) => a.seed - b.seed);

    const totalPlayers = players.length;
    const bracketSize = nextPowerOfTwo(totalPlayers);
    const bracket = new Array(bracketSize).fill(null);
    const byesNeeded = bracketSize - totalPlayers;

    // Standard tournament seeding positions for a power-of-2 bracket
    function getSeededPositions(bracketSize, numSeeds) {
        const positions = [];

        if (numSeeds >= 1) positions.push(0); // Seed 1: First position
        if (numSeeds >= 2) positions.push(bracketSize - 1); // Seed 2: Last position
        if (numSeeds >= 3) positions.push(Math.floor(bracketSize / 2)); // Seed 3: Middle
        if (numSeeds >= 4) positions.push(Math.floor(bracketSize / 2) - 1); // Seed 4: Before middle

        // For additional seeds, distribute them evenly across bracket sections
        if (numSeeds > 4) {
            const sectionsNeeded = Math.ceil(Math.log2(numSeeds));
            const sectionSize = bracketSize / Math.pow(2, sectionsNeeded);

            for (let i = 4; i < numSeeds; i++) {
                // Calculate section for this seed
                const section = i % Math.pow(2, sectionsNeeded);
                const basePos = Math.floor(section * sectionSize);

                // Find an available position in this section
                let pos = basePos;
                while (positions.includes(pos) && pos < basePos + sectionSize) {
                    pos++;
                }
                if (pos < bracketSize) {
                    positions.push(pos);
                }
            }
        }

        return positions.slice(0, numSeeds);
    }

    // Place seeded players in strategic positions
    const seededPositions = getSeededPositions(bracketSize, seededPlayers.length);
    seededPlayers.forEach((player, index) => {
        if (seededPositions[index] !== undefined) {
            bracket[seededPositions[index]] = player;
        }
    });

    // Allocate byes - prioritize seeded players
    let byesAllocated = 0;
    const byePositions = [];

    // First, try to give byes to seeded players by leaving adjacent positions empty
    for (
        let i = 0;
        i < seededPositions.length && byesAllocated < byesNeeded;
        i++
    ) {
        const seededPos = seededPositions[i];
        const partnerPos = seededPos % 2 === 0 ? seededPos + 1 : seededPos - 1;

        if (
            partnerPos >= 0 &&
            partnerPos < bracketSize &&
            bracket[partnerPos] === null
        ) {
            // This seeded player can get a bye
            byePositions.push(partnerPos);
            byesAllocated++;
        }
    }

    // Fill remaining positions with unseeded players
    const availablePositions = [];
    for (let i = 0; i < bracketSize; i++) {
        if (bracket[i] === null && !byePositions.includes(i)) {
            availablePositions.push(i);
        }
    }

    // Randomly distribute unseeded players
    const shuffledUnseeded = shuffleArray(unseededPlayers);
    const unseededToPlace = Math.min(
        shuffledUnseeded.length,
        availablePositions.length
    );

    for (let i = 0; i < unseededToPlace; i++) {
        bracket[availablePositions[i]] = shuffledUnseeded[i];
    }

    // Mark remaining empty positions as byes
    for (let i = 0; i < bracketSize; i++) {
        if (bracket[i] === null) {
            bracket[i] = null; // Keep as null for brackets-manager
        }
    }

    // console.log("TOurnament Bracket: ======");

    // console.log(bracket);

    const playerNames = [];
    bracket.forEach((player) => {
        if (player === null) {
            playerNames.push(null); // Push null for byes
        } else {
            playerNames.push({ name: player.name }); // Push player name
        }
    });

    console.log(playerNames);

    return playerNames;
}

// Function to display bracket with position numbers
function displayBracket(bracket) {
    console.log("Tournament Bracket:");
    console.log("==================");
    bracket.forEach((player, index) => {
        if (player.isBye) {
            console.log(`Position ${index + 1}: BYE`);
        } else {
            const playerText = `${player.name}${player.seed ? ` (Seed ${player.seed})` : " (Unseeded)"
                }`;
            console.log(`Position ${index + 1}: ${playerText}`);
        }
    });
}

// Function to show first round matchups
function showFirstRoundMatchups(bracket) {
    console.log("\nFirst Round Matchups:");
    console.log("=====================");

    let seededByes = 0;
    let totalByes = 0;

    for (let i = 0; i < bracket.length; i += 2) {
        const p1 = bracket[i];
        const p2 = bracket[i + 1];

        const p1Text = p1.isBye
            ? "BYE"
            : `${p1.name}${p1.seed ? ` (Seed ${p1.seed})` : ""}`;
        const p2Text = p2.isBye
            ? "BYE"
            : `${p2.name}${p2.seed ? ` (Seed ${p2.seed})` : ""}`;

        let matchText = `Match ${Math.floor(i / 2) + 1}: ${p1Text} vs ${p2Text}`;

        // Check for seeded player byes
        if (p1.isBye && p2.seed) {
            matchText += " ⭐";
            seededByes++;
            totalByes++;
        } else if (p2.isBye && p1.seed) {
            matchText += " ⭐";
            seededByes++;
            totalByes++;
        } else if (p1.isBye || p2.isBye) {
            totalByes++;
        }

        console.log(matchText);
    }

    console.log(
        `\nBye Summary: ${totalByes} total byes, ${seededByes} seeded player byes ⭐`
    );
}

// Example usage with your data (13 players, 4 seeded):
// const players = [];
// for (let i = 1; i <= 120; i++) {
//   players.push({ name: `Player ${i}`, seed: i <= 32 ? i : null });
// }

// console.log(`Tournament Setup: ${players.length} total players`);
// console.log(`Seeded: ${players.filter(p => p.seed).length}, Unseeded: ${players.filter(p => !p.seed).length}`);
// console.log(`Bracket size: ${nextPowerOfTwo(players.length)} (next power of 2)\n`);

// Generate and display the bracket
// const bracket = generateBracket(players);
// displayBracket(bracket);
// showFirstRoundMatchups(bracket);

// Export the main function for use in other files
export { generateBracket, displayBracket, showFirstRoundMatchups };
