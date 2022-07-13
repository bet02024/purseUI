const initialState = {
  loading: false,
  connected: false,
  account: null,
  smartContractToken: null,
  smartContractPurseManager: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        //...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        connected: true,
        account: action.payload.account,
        smartContractToken: action.payload.smartContractToken,
        smartContractPurseManager: action.payload.smartContractPurseManager,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        //...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        connected: true,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
