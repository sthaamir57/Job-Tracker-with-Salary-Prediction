import { useEffect, useState } from 'react'
import Papa from 'papaparse';

const DataTable = (props) => {

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
console.log(dataa);

  return (
   <>
     <table className='w-auto text-neutral-100 relative border border-solid'>
      <thead className='sticky top-0 bg-black border border-solid'>
        <tr className='border border-solid'>
          <th className='border border-solid text-md px-6 py-3'>Age</th>
          <th className='border border-solid text-md px-6 py-3'>Gender</th>
          <th className='border border-solid text-md px-6 py-3'>Education Level</th>
          <th className='border border-solid text-md px-6 py-3'>Job Title</th>
          <th className='border border-solid text-md px-6 py-3'>Years of Experience</th>
          <th className='border border-solid text-md px-6 py-3'>Salary</th>
        </tr>
      </thead>
      <tbody>
      {
      dataa.map((row) => 
        
          <tr>
            <td className='border border-solid text-md px-6 py-1'>{row.Age}</td>
            <td className='border border-solid text-md px-6 py-1'>{row.Gender}</td>
            <td className='border border-solid text-md px-6 py-1'>{row.Education_Level}</td>
            <td className='border border-solid text-md px-6 py-1'>{row.Job_Title}</td>
            <td className='border border-solid text-md px-6 py-1'>{row.Years_of_Experience}</td>
            <td className='border border-solid text-md px-6 py-1'>{row.Salary}</td>
          </tr>
        
      )
     }
      </tbody>
     </table>
   </>
  )
}

export default DataTable