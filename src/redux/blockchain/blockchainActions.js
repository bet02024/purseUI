// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
let Token = '/token.json';
let PurseManager = '/purse.json';

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};
const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  console.log(payload);
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};


export const connect = () => {
  return async (dispatch) => {
    console.log("$$###");
    dispatch(connectRequest());
    console.log("%%###");

    const abiToeknResponse = await fetch(Token, {
      headers: {"Content-Type": "application/json",Accept: "application/json", },
    });
    const abiToken = await abiToeknResponse.json();

    const abiAPurseResponse = await fetch(PurseManager, {
      headers: {"Content-Type": "application/json",Accept: "application/json", },
    });
    const abiPurseManager = await abiAPurseResponse.json();


    const configResponse = await fetch("/config.json", {
      headers: { "Content-Type": "application/json", Accept: "application/json", },
    });
    const CONFIG = await configResponse.json();

    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);

      try {
        console.log("###");
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });

        console.log("###networkId ", networkId);
        if (networkId == CONFIG.NETWORK.ID) {

          const SmartContractToken = new Web3EthContract(
            abiToken,
            CONFIG.CONTRACT_TOKEN
          );

          const SmartContractPurseManager = new Web3EthContract(
            abiPurseManager,
            CONFIG.CONTRACT_PURSE_MANAGER
          );
          var payloadAll = {
            account: accounts[0],
            smartContractToken: SmartContractToken,
            smartContractPurseManager: SmartContractPurseManager,
            web3: web3,
          };

          dispatch(
            connectSuccess(payloadAll)
           );
           console.log("connectSuccess");

          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
            //window.location.reload();
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {

          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));

        }
      } catch (err) {

        console.log(err);
        dispatch(connectFailed("Something went wrong."));

      }
    } else {
      dispatch(connectFailed("Please Install Metamask to use this Mint DApp"));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    //dispatch(updateAccountRequest({ account: account }));
  };
};
