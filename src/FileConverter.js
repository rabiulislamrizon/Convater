import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

function FileConverter() {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('pdf');
    const [convertedFile, setConvertedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileUpload = async (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setLoading(true);
            setError('');

            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fileData = reader.result;

                    let convertedData;
                    if (fileType === 'pdf') {
                        convertedData = convertToPDF(fileData);
                    } else if (fileType === 'jpg') {
                        convertedData = convertToJPG(fileData);
                    } else if (fileType === 'png') {
                        convertedData = convertToPNG(fileData);
                    } else if (fileType === 'webp') {
                        convertedData = convertToWebP(fileData);
                    } else if (fileType === 'svg') {
                        convertedData = convertToSVG(fileData);
                    }

                    setConvertedFile(convertedData);
                    setLoading(false);
                };

                reader.readAsDataURL(uploadedFile);
            } catch (err) {
                setError('Error processing the file. Please try again.');
                setLoading(false);
            }
        }
    };

    const convertToPDF = (data) => {
        const pdf = new jsPDF();
        pdf.text('Converted PDF', 10, 10);
        return pdf.output('datauristring');
    };

    const convertToJPG = (data) => {
        // Convert image data to JPG format
        return data; // Placeholder for actual JPG conversion logic
    };

    const convertToPNG = (data) => {
        // Convert image data to PNG format
        return data; // Placeholder for actual PNG conversion logic
    };

    const convertToWebP = (data) => {
        // Convert image data to WebP format
        return data; // Placeholder for actual WebP conversion logic
    };

    const convertToSVG = (data) => {
        // Convert image data to SVG format
        return data; // Placeholder for actual SVG conversion logic
    };

    return (
        <div className="container vh-100 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="text-center mb-4">Convert Files to Different Formats</h2>
                    <div className="card p-4 shadow-sm border-0">
                        <div className="form-group mb-3">
                            <label htmlFor="fileType">Select Output Format:</label>
                            <select
                                id="fileType"
                                className="form-control"
                                value={fileType}
                                onChange={(e) => setFileType(e.target.value)}
                            >
                                <option value="pdf">PDF</option>
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="webp">WebP</option>
                                <option value="svg">SVG</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="fileUpload">Upload File:</label>
                            <input
                                id="fileUpload"
                                type="file"
                                onChange={handleFileUpload}
                                className="form-control"
                            />
                        </div>
                        {loading && (
                            <div className="text-center mt-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Processing your file...</p>
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {error}
                            </div>
                        )}
                        {convertedFile && !loading && (
                            <div className="text-center mt-4">
                                <h3>Converted File:</h3>
                                {fileType !== 'pdf' ? (
                                    <img src={convertedFile} alt={`Converted ${fileType.toUpperCase()}`} className="img-fluid" />
                                ) : (
                                    <iframe src={convertedFile} title="PDF" style={{ width: '100%', height: '400px' }} />
                                )}
                                <div className="mt-3">
                                    <a href={convertedFile} download={`converted.${fileType}`} className="btn btn-primary">
                                        Download {fileType.toUpperCase()}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileConverter;
