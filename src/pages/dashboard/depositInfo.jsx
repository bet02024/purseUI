import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DepositInfo = (props) => {


  const blockchain = useSelector((state) => state.blockchain);
  const [amount, setAmount] = useState(0);
  const [CONFIG, SET_CONFIG] = useState({});
  const [approved, setApproved] = useState(false);
  const [tokenBalanceWallet, setTokenBalanceWallet] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');

  const approvePurse  = () => {
    let totalToApprove = String("1000000000000000000000000000000000");
      blockchain.smartContractToken.methods
        .approve(CONFIG.CONTRACT_PURSE_MANAGER, totalToApprove)
        .send({
          from: blockchain.account
        }).once("error", (err) => {
          console.log(err);
        })
        .then((receipt) => {
          console.log(receipt);
          checkApprove();
        });
  }

  const depositToken   = (amount) => {
      blockchain.smartContractPurseManager.methods
        .depositToken(amount)
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

  const withdrawToken  = async () => {
    try{
      if (blockchain.connected ){
          await blockchain.smartContractPurseManager.methods.withdrawToken()
            .send({from: blockchain.account});
            checkBalance();
            checkBalanceWallet();
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
      }
    } catch(e){
      console.log("##### Error  withdrawToken ", e);
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

  const checkApprove  = async () => {
    try{
      if (blockchain.connected ){
        let allowance = await blockchain.smartContractToken.methods.allowance(blockchain.account, CONFIG.CONTRACT_PURSE_MANAGER )
            .call();
            //balanceOfToken withdrawToken withdraw depositToken deposit balanceOfETH
         if (allowance > 0){
           setApproved(true);
         }
         console.log("## allowance ",  allowance);
      }
    } catch(e){
      console.log("##### Error  checkBalance Token", e);
    }
  }


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


  useEffect(() => {
    getConfig();
    checkApprove();
    checkBalanceWallet();
    checkBalance();
  }, [blockchain]);

  useEffect(() => {
    getConfig();
    checkApprove();
    checkBalanceWallet();
    checkBalance();
  }, []);


  const handleName = (value) => {
    let value_ = value ? value.replace("#", "") : "";
    setAmount(value_);
  };

    return (
       <div>
           <div className="media d-flex text-white">
                <div className="align-self-center">
                  <span >Your Token balance on this Purse </span>
                  <h3 className='warning text-small'> ${tokenBalance} </h3>
                </div>
                <div className="media-body text-right">
                  <span></span>
                  <h3 className='success'> </h3>
                </div>
          </div>

               {  approved ? (
                 <>
              <div className="media d-flex text-white">
                 <div className="align-self-center">
                    {  tokenBalance >0 ? (
                      <button
                        onClick={() =>
                          withdrawToken()
                        }
                        className="btn btn-primary">Withdraw {tokenBalance} Tokens</button>
                    ) : null}

                   <h3 className='warning text-small'> </h3>
                 </div>
               </div>
                 <div className="media d-flex text-white">
                   <span>
                     <input value={amount}
                        onChange={(e) => handleName(e.target.value)}
                        placeholder="Amount to Deposit" />

                   </span>
                   <h3 className='warning text-small'>
                     <button
                       onClick={() =>
                         depositToken(amount)
                       }
                       className="btn btn-primary">Deposit</button>
                     </h3>
                 </div>
                </>
               ) : (
                <div className="media d-flex text-white">
                       <div className="align-self-center">
                       <button
                         onClick={() =>
                           approvePurse()
                         }
                         className="btn btn-primary">Approve Tokens</button>
                         <h3 className='warning text-small'> </h3>
                       </div>
                       <div className="media-body text-right">

                       </div>
                </div>
               )}

      </div>
    )
};

export default DepositInfo;
