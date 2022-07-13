import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../../components/elements/card";
import WithdrawInfo from "./withdrawInfo";
import "./dashboard.css";
import DepositInfo from "./depositInfo";
import DepositEthInfo from "./depositEthInfo";
import { connect } from "../../redux/blockchain/blockchainActions";
import { Button, Dialog } from "evergreen-ui";

export function Dashboard() {


  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [ethBalance, setEthBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');

  const [CONFIG, SET_CONFIG] = useState({});
  const [approved, setApproved] = useState(false);
  const [tokenBalanceWallet, setTokenBalanceWallet] = useState('0');


  const getConfig = async () => {
    const configResponse = await fetch("/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };



    const checkBalanceWallet  = async () => {
      try{
        if (blockchain.connected ){
          let balance = await blockchain.smartContractToken.methods.balanceOf(blockchain.account )
              .call();
              //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
           if (balance){
             setTokenBalanceWallet(balance);
           }
           console.log("## balance ",  balance);
        }
      } catch(e){
        console.log("##### Error  checkBalance Token", e);
      }
    }



  const withdrawEth  = async () => {
    try{
      if (blockchain.connected ){
         await blockchain.smartContractPurseManager.methods.withdraw()
            .send({from: blockchain.account});
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
      }
    } catch(e){
      console.log("##### Error  withdrawEth", e);
    }
  }


  const claimTokens  = (amount) => {
      blockchain.smartContractToken.methods
        .freeMint(amount)
        .send({
          from: blockchain.account
        }).once("error", (err) => {
          console.log(err);
        })
        .then((receipt) => {
          console.log(receipt);
          checkBalance();
          checkBalanceWallet();
        });
  }


  const deposit   = (amount) => {
      blockchain.smartContractPurseManager.methods
        .deposit(amount)
        .send({
          from: blockchain.account
        }).once("error", (err) => {
          console.log(err);
        })
        .then((receipt) => {
          console.log(receipt);
          checkBalance();
          checkBalanceWallet();
        });
  }






  const checkApprove  = async () => {
    try{
      if (blockchain.connected ){
        let allowance = await blockchain.smartContractToken.methods.allowance(blockchain.account, CONFIG.CONTRACT_PURSE_MANAGER )
            .call();
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
         if (allowance){
           setApproved(true);
         }
         console.log("## allowance ",  allowance);
      }
    } catch(e){
      console.log("##### Error  checkBalance Token", e);
    }
  }

  const checkBalance  = async () => {
    try{
      if (blockchain.connected ){
        let balance = await blockchain.smartContractPurseManager.methods.balanceOfToken(blockchain.account)
            .call();
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
         if (balance){
           setTokenBalance(balance);
         }
         console.log("## balance ",  balance);
      }
    } catch(e){
      console.log("##### Error  checkBalance Token", e);
    }
  }

  const checkBalanceEth  = async () => {
    try{
      if (blockchain.connected ){
        let balance = await blockchain.smartContractPurseManager.methods.balanceOfETH(blockchain.account)
            .call();
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
         if (balance){
           setEthBalance(balance);
         }
         console.log("## balanceEth ",  balance);
      }
    } catch(e){
      console.log("##### Error  checkBalance Token", e);
    }
  }

  useEffect(() => {
    checkBalance();
    checkBalanceEth();
    checkBalanceWallet();
    getConfig();
    checkApprove();
  }, [blockchain]);

  useEffect(() => {
    checkBalance();
    checkBalanceEth();
    checkBalanceWallet();
    getConfig();
    checkApprove();
  }, []);


  return (
    <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 my-2">
          {  blockchain && blockchain.account ? (
               <span>Your account: {blockchain.account}<br></br><h3 className='warning text-small'>Token balance ${tokenBalanceWallet}</h3>
                 <br></br>
                   <br></br>
           <button
             onClick={() =>
               claimTokens("20000")
             }
             className="btn btn-primary">Mint 20,000 Tokens for free</button>
                    </span>
      ) : null}
      </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 my-2">
            <Card title="Token Information" components={<DepositInfo   />} />
          </div>
        </div>
  </div>
  );
}
