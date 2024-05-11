import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import PieChart from './graph/PieChart'
import ChartsCSV from './chart/ChartsCSV';
import DataTable from './chart/DataTable';

const Statistics = () => {
  const [modelData, setModelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define your API endpoint URL (replace with your actual endpoint)
  const url = 'http://127.0.0.1:8000/';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log("hello");
      // setError(null);

      try {
        const response = await fetch('http://127.0.0.1:8000/modelData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const jsonData = await response.json();
        setModelData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const cardData = JSON.parse(localStorage.getItem("cards"));

    // console.log(cardData);

    const wishlistCards = cardData.filter((c) => c.column === "wishlist");
    const appliedCards = cardData.filter((c) => c.column === "applied");
    const interviewingCards = cardData.filter((c) => c.column === "interviewing");
    const offerCards = cardData.filter((c) => c.column === "offer");
    const rejectedCards = cardData.filter((c) => c.column === "rejected");

    const pieData = [wishlistCards.length, appliedCards.length, interviewingCards.length, offerCards.length, rejectedCards.length];

    const LinReg = "LR-Pred";
    const DTRReg = "DTR-Pred";
    const RFReg = "RF-Pred";
    const DataSet = "InitalCleanData";
  return (
    <div className='w-full overflow-y-scroll'>
      <h1 className="text-xl font-bold mb-2 text-neutral-200">Statistics</h1>
      <div className="flex flex-wrap justify-around gap-4 mt-4 mb-6">
        <div className="flex flex-col items-center rounded p-16 bg-slate-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{cardData.length}</span>
          <span className='text-sm font-normal'>Total Jobs</span>
        </div>
        <div className="flex flex-col items-center rounded p-16 bg-neutral-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{wishlistCards.length}</span>
          <span className='text-sm font-normal'>Wishlist</span>
        </div>
        <div className="flex flex-col items-center rounded p-16 bg-orange-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{appliedCards.length}</span>
          <span className='text-sm font-normal'>Applied</span>
        </div>
        <div className="flex flex-col items-center rounded p-16 bg-yellow-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{interviewingCards.length}</span>
          <span className='text-sm font-normal'>Interviewing</span>
        </div>
        <div className="flex flex-col items-center rounded p-16 bg-green-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{offerCards.length}</span>
          <span className='text-sm font-normal'>Offer</span>
        </div>
        <div className="flex flex-col items-center rounded p-16 bg-red-500 text-neutral-200">
          <span className='text-5xl font-semibold'>{rejectedCards.length}</span>
          <span className='text-sm font-normal'>Rejected</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <PieChart pieData={pieData} />
        </div>

      </div>

      <div>
        <h1 className="text-xl font-bold mb-2 text-neutral-200 mt-6 mb-4">Models Statistic</h1>
        <div className="flex flex-col justify-center items-center">
          <div>
            <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">Linear Regression</div>
            <ChartsCSV path={LinReg} />
            {modelData && 
              <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">
              Accuracy : {(modelData.lr.r2 * 100).toFixed(2)}%
              <br />
              {/* MAE : {modelData.lr.mae.toFixed(2)}
              <br />
              MSE : {modelData.lr.mse.toFixed(2)} */}
              <br />
              RMSE : {modelData.lr.rmse.toFixed(2)}
              <br />
              R-Squared : {modelData.lr.r2.toFixed(2)}
            </div>
            }
          </div>

          <div>
            <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">Decision Tree Regressor</div>
            <ChartsCSV path={DTRReg} />
            {
              modelData &&
              <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">
              Accuracy : {(modelData.dtr.r2 * 100).toFixed(2)}%
              <br />
              {/* MAE : {modelData.dtr.mae.toFixed(2)}
              <br />
              MSE : {modelData.dtr.mse.toFixed(2)}
              <br /> */}
              RMSE : {modelData.dtr.rmse.toFixed(2)}
              <br />
              R-Squared : {modelData.dtr.r2.toFixed(2)}
            </div>
            }
          </div>

          <div>
            <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">Random Forest Regressor</div>
            <ChartsCSV path={RFReg} />
            {
              modelData &&
              <div className="text-md font-bold mb-2 text-neutral-200 mt-6 mb-4">
              Accuracy : {(modelData.rf.r2 * 100).toFixed(2)}%
              <br />
              {/* MAE : {modelData.rf.mae.toFixed(2)}
              <br />
              MSE : {modelData.rf.mse.toFixed(2)}
              <br /> */}
              RMSE : {modelData.rf.rmse.toFixed(2)}
              <br />
              R-Squared : {modelData.rf.r2.toFixed(2)}
            </div>
            }
          </div>

          {/* RMSE */}
          <div>
          {modelData &&
            <Plot
            data={[
              {
                x: ['rmse'],
                y: [modelData.lr.rmse.toFixed(2)],
                type: 'bar',
                name: 'Linear Regression',
                text: 'Linear Regression'
            },
              {
                x: ['rmse'],
                y: [modelData.dtr.rmse.toFixed(2)],
                type: 'bar',
                name: 'Decision Tree Regressor',
                text: 'Decision Tree Regressor',
            },
              {
                x: ['rmse'],
                y: [modelData.rf.rmse.toFixed(2)],
                type: 'bar',
                name: 'Random Forest Regressor',
                text: 'Random Forest Regressor'
            },
            ]}
            layout={ {width: 1000, height: 600, title: 'Model Evaluation (RMSE)',
            // xaxis: {
            //     title: 'Data Points',
            //   },
            //   yaxis: {
            //     title: 'Income',
            //     showline: false
            //   }
            } }
            config = {{responsive: true, scrollZoom: true}}
            
          />
          }
          </div>

          {/* R2 */}
          <div>
          {modelData &&
            <Plot
            data={[
              {
                x: ['r2'],
                y: [modelData.lr.r2.toFixed(2)],
                type: 'bar',
                name: 'Linear Regression',
                text: 'Linear Regression'
            },
              {
                x: ['r2'],
                y: [modelData.dtr.r2.toFixed(2)],
                type: 'bar',
                name: 'Decision Tree Regressor',
                text: 'Decision Tree Regressor',
            },
              {
                x: ['r2'],
                y: [modelData.rf.r2.toFixed(2)],
                type: 'bar',
                name: 'Random Forest Regressor',
                text: 'Random Forest Regressor'
            },
            ]}
            layout={ {width: 1000, height: 600, title: 'Model Evaluation (R2)',
            // xaxis: {
            //     title: 'Data Points',
            //   },
            //   yaxis: {
            //     title: 'Income',
            //     showline: false
            //   }
            } }
            config = {{responsive: true, scrollZoom: true}}
            
          />
          }
          </div>

          <div>
          {modelData &&
            <Plot
            data={[
              {
                x: ['accuracy'],
                y: [modelData.lr.r2.toFixed(2)*100],
                type: 'bar',
                name: 'Linear Regression',
                text: 'Linear Regression'
            },
              {
                x: ['accuracy'],
                y: [modelData.dtr.r2.toFixed(2)*100],
                type: 'bar',
                name: 'Decision Tree Regressor',
                text: 'Decision Tree Regressor',
            },
              {
                x: ['accuracy'],
                y: [modelData.rf.r2.toFixed(2)*100],
                type: 'bar',
                name: 'Random Forest Regressor',
                text: 'Random Forest Regressor'
            },
            ]}
            layout={ {width: 1000, height: 600, title: 'Model Evaluation (Accuracy)',
            // xaxis: {
            //     title: 'Data Points',
            //   },
            //   yaxis: {
            //     title: 'Income',
            //     showline: false
            //   }
            } }
            config = {{responsive: true, scrollZoom: true}}
            
          />
          }
          </div>

          <div className=''>
            <h1 className='text-md font-bold mb-2 text-neutral-200 mt-8 mb-4'>Dataset Table</h1>
            <div className="h-96 overflow-scroll">
              <DataTable path={DataSet}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics