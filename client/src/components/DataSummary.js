import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./DataSummary.css"

axios.defaults.baseURL = "http://localhost:8080";

const DataSummary = () => {
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('/summary');
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div>
      <h2 className='summary-title'>Summary Table</h2>
      {summaryData && (
        <table className='summary-table'>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{background:"Aquamarine"}}>
              <td>Number of 1s</td>
              <td>{summaryData.numberOfOnes}</td>
            </tr>
            <tr style={{background:"#FFFF8F"}}>
              <td>Number of 0s</td>
              <td>{summaryData.numberOfZeros}</td>
            </tr>
            <tr style={{background:"Aquamarine"}}>
              <td>Continuous 1s</td>
              <td>{summaryData.continuousOnes}</td>
            </tr>
            <tr style={{background:"#FFFF8F"}}>
              <td>Continuous 0s</td>
              <td>{summaryData.continuousZeros}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div>
        <hr/>
      </div>
    </div>
  );
};

export default DataSummary;
