import React, { useState } from 'react';
import Papa from 'papaparse';
import { BiCloudLightRain } from 'react-icons/bi';

const allowedExtensions = ['csv'];
const csvData = [];
export default function Converter() {
  // This state will store the parsed data
  const [data, setData] = useState([]);
  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState('');

  // It will store the file uploaded by the user
  const [file, setFile] = useState('');

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError('');

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file');
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError('Enter a valid file');

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      parsedData.forEach((row) => {
        csvData.push({
          barcode: row.Barcode,
          name: row.Name,
          // expDate: new Date(row.Date),
          // dateStamp: new Date(row.Timestamp),
          // status: row.Status,
        });
        // console.log(row.Barcode);
      });
      console.log(csvData);

      const columns = Object.keys(parsedData[0]);
      setData(columns);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label htmlFor='csvInput' style={{ display: 'block' }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id='csvInput'
        name='file'
        type='File'
      />
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>
      <button
        onClick={() => {
          console.log(csvData.toString());
        }}
      >
        CLICK
      </button>
      <div>{JSON.stringify(csvData)}</div>
    </div>
  );
}
