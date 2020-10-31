import React from 'react';
import moment from 'moment';

const InfoPanel = ({ currentPrice, updatedAt, changeUSD, changePerc}) => {
    return (
      <>
        <div className="title"> 90 Days [Aug-Oct 2020] Bitcoin Price Index (USD)</div>
        <div id="info-panel">
          <div id="left" className='info'>
            <div className="info-title">{currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
            <div className="info-title-mini">{`Updated ${moment(updatedAt ).fromNow()}`}</div>
          </div>

          <div id="middle" className='info'>
            <div className="info-title">{changeUSD}</div>
            <div className="info-title-mini">Change Since August Month (USD)</div>
          </div>

          <div id="right" className='info'>
            <div className="info-title">{changePerc}</div>
            <div className="info-title-mini">Change Since August Month (%)</div>
          </div>
        </div>
      </>
    );

};

export default InfoPanel;
