import "regenerator-runtime/runtime";
import React from "react";
import PropTypes from "prop-types";
import YatziGame from "./Game";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Yatzi App");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-12 w-24"
            src="https://docs.near.org/img/near_logo.svg"
            alt="ChitChat Logo"
          />
          {currentUser ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={signOut}
            >
              Log out
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={signIn}
            >
              Log in
            </button>
          )}
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            NCD II: Yatzy Game
          </div>
          {currentUser ? (
            <div>
              <p className="text-gray-500">
                Account ID: {currentUser.accountId}{" "}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500">Sign In To Use The App</p>
            </div>
          )}
        </div>
      </div>
      {currentUser && <YatziGame contract={contract} />}
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    current_points: PropTypes.func.isRequired,
    current_turn: PropTypes.func.isRequired,
    start_round: PropTypes.func.isRequired,
    end_round: PropTypes.func.isRequired,
    reset_game: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
