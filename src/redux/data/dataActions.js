// log
import store from "../store";

const fetchDataRequestGeneral = () => {
  return { type: "CHECK_DATA_REQUEST", };
};
const fetchDataSuccessGeneral = (payload) => {
  return { type: "CHECK_DATA_SUCCESS", payload: payload, };
};
const fetchDataFailedGeneral = (payload) => {
  return { type: "CHECK_DATA_FAILED", payload: payload, };
};
