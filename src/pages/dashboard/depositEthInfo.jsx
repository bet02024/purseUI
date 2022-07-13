import React from 'react'

const DepositEthInfo = (props) => {
  const { ethBalance, withdrawEth } = props;

    return (
       <div>
         <div className="media d-flex text-white">
                <div className="align-self-center">
                  <span >Your balance on this Purse </span>
                  <h3 className='warning text-small'> </h3>
                </div>
                <div className="media-body text-right">
                  <span>{ethBalance}</span>
                  <h3 className='success'> </h3>
                </div>
              </div>
              <div className="media d-flex text-white">
                 <div className="align-self-center">
                   <button
                     onClick={() =>
                       withdrawEth()
                     }
                     className="btn btn-primary">Withdraw ETH</button>
                   <h3 className='warning text-small'> </h3>
                 </div>
              </div>
        </div>

    )
};

export default DepositEthInfo;
