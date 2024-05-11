import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const ChartsCSV = (props) => {

    const [dataa, setData] = useState([]);
    useEffect(() => {

    const fetchData = async () => {
      const path = `csv/${props.path}.csv`
      console.log(path);
        const response = await fetch(path);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const cvsData = decoder.decode(result.value);

        const parsedData = Papa.parse(cvsData, {
            header: true,
            skipEmptyLines: true
        }).data;
        setData(parsedData);
    };

    fetchData();
}, []);

const actual_data = dataa.map((row) => Number(row.Actual_Salary));
const predicted_data = dataa.map((row) => Number(row.Predicted_Salary));
const data_num = dataa.map((row) => Number(row.S_No));
// console.log(actual_data.length);
// console.log(predicted_data.length);
// console.log(data_num);

  return (
   <>
     <Plot
        data={[
          {
            x: data_num,
            y: actual_data,
            type: 'scatter',
            mode: 'line',
            marker: {color: 'blue'},
            name: 'Actual Data'
        },
        {
            x: data_num,
            y: predicted_data,
            type: 'scatter',
            mode: 'line',
            marker: {color: 'green'},
            name: 'Predicted Data'
          },
        ]}
        layout={ {width: 1000, height: 600, title: 'Predicted VS Actual',
        xaxis: {
            title: 'Data Points',
            showgrid: false,
            zeroline: false,
            autorange: false,
            range: [25, 45]
          },
          yaxis: {
            title: 'Income',
            showline: false
          }
        } }
        config = {{responsive: true, scrollZoom: true}}
        
      />
   </>
  )
}

export default ChartsCSV