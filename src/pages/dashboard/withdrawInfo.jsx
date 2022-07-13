import React from 'react'

const WithdrawInfo = (props) => {

  const { withdrawEth, withdrawToken } = props;
    return(
        <div className="media align-items-stretch" id='mobile-claim '>
        <div className="media-body pl-lg-6">
          <button
            onClick={() =>
              withdrawToken()
            }
            className="btn btn-primary">Withdraw Tokens</button>
        </div>
        <div className="align-self-center">
            <button
              onClick={() =>
                withdrawEth()
              }
              className="btn btn-primary">Withdraw ETH</button>
        </div>
      </div>
    )
};

export default WithdrawInfo;
