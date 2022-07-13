import React, { useState, useEffect } from "react";
import { Button, Dialog } from "evergreen-ui";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../../redux/blockchain/blockchainActions";

export default function UserInformation() {

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  return (
     <>
      	{  blockchain && blockchain.account ? (
          <Button
            className="wallet-button"
          >
            <span>Connected</span>
          </Button>
      ) : (
        <Button
          className="wallet-button"
          onClick={() => {
             dispatch(connect());
           }}
        >
          <span>Connect to  Metamask </span>
        </Button>
      )}
      </>
  );
}
