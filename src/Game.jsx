import { useEffect, useState } from "react";
import ErrorPopup from "./ErrorPupop";

const YatziGame = ({ contract }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState("");
  const [dice, setDice] = useState("");
  const [error, setError] = useState("");
  const [howToPlay, setHowToPlay] = useState("");
  const [currentTurn, setCurrentTurn] = useState("");

  useEffect(() => {
    contract.how_to_play().then((text) => setHowToPlay(text));
    contract.current_points().then((points) => setScore(points));
    contract.current_turn().then((turn) => setCurrentTurn(turn));
  });

  const resetGame = () => {
    setIsLoading(true);
    contract.reset_game().then(
      () => {
        setIsLoading(false);
      },
      (err) => {
        setError(`${err}`);
        setIsLoading(false);
      }
    );
  };

  const isValidDice = () =>
    dice !== "" &&
    (dice === "1" ||
      dice === "1" ||
      dice === "2" ||
      dice === "3" ||
      dice === "4" ||
      dice === "5" ||
      dice === "6");

  const chooseCombination = () => {
    setIsLoading(true);
    if (isValidDice()) {
      contract.end_round({ combination: parseInt(dice) }).then(
        () => {
          setIsLoading(false);
          setDice("");
        },
        (err) => {
          setError(`${err}`);
          setIsLoading(false);
        }
      );
    }
  };
  const rollTheDice = () => {
    setIsLoading(true);
    contract.start_round().then(
      () => {
        setIsLoading(false);
      },
      (err) => {
        setError(`${err}`);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="md:container md:mx-auto">
      {isLoading ? (
        <div className="mt-4 mx-auto loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-20 w-20"></div>
      ) : (
        <div className="mt-4 h-20 w-20"></div>
      )}
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          How to play
        </div>
        <p className="mt-2 text-gray-500">{howToPlay}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Current turn
            </div>
            <p className="mt-2 text-gray-500">
              {currentTurn === ""
                ? "Click roll the dice button"
                : currentTurn.split("").join(" ")}
            </p>
          </div>
        </div>
        <div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Current score
            </div>
            <p className="mt-2 text-gray-500">
              {score ? score.split(".")[0] : "No score available"}
            </p>
            <p className="mt-2 text-gray-500">
              {score ? score.replace(`${score.split(".")[0]}.`, "") : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Game Actions
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={rollTheDice}
              >
                Roll the dice
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={resetGame}
              >
                Reset game
              </button>
              <button
                disabled={!isValidDice()}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={chooseCombination}
              >
                Choose Combination
              </button>
              <input
                type="text"
                className="border-2 p-1 border-green-500 rounded"
                value={dice}
                placeholder="Enter Dice from 1 to 6"
                onChange={(event) => setDice(event.target.value)}
              />
            </div>
            <ErrorPopup error={error} callback={() => setError("")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YatziGame;
