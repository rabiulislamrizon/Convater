import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileConverter from './FileConverter';
import JPGtoPNG from './JPGtoPNG';
import SVGtoPNG from './SVGtoPNG';
import JPGtoPDF from './PDFtoJPG';

function App() {
  return (
    <>
     
     
      <FileConverter />
      <JPGtoPNG></JPGtoPNG>
      <JPGtoPDF></JPGtoPDF>
      
   
    </>
  );
}

export default App;
