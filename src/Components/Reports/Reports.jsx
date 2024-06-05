import React, { useState, useRef } from 'react';
import axios from 'axios';
import PieChart from '../../Components/PieChart/PieChart';
import ColumnChart from '../../Components/ColumnChart/ColumnChart';
import SplineChart from '../../Components/SplineChart/SplineChart';

export default function Reports() {
    const [showExcelCheckboxes, setShowExcelCheckboxes] = useState(false);
    const [showPdfCheckboxes, setShowPdfCheckboxes] = useState(false);
    const [selectedExcelOptions, setSelectedExcelOptions] = useState({
        tours: false,
        users: false,
        coupons: false,
        contacts: false,
        selectAll: false,
    });

    const [selectedPdfOptions, setSelectedPdfOptions] = useState({
        toursLocation: false,
        numberOfTravelers: false,
        tourDuration: false,
        profits: false,
        selectAll: false,
    });

    const pieChartRef = useRef(null);
    const columnChartRef = useRef(null);
    const splineChartRef = useRef(null);

    const handleExcelDownload = () => {
        setShowExcelCheckboxes(true);
    };

    const handlePdfDownload = () => {
        setShowPdfCheckboxes(true);
    };

    const handleExcelCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSelectedExcelOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
            ...(name === 'selectAll' && {
                tours: checked,
                users: checked,
                coupons: checked,
                contacts: checked,
            }),
        }));
    };

    const handlePdfCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSelectedPdfOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
            ...(name === 'selectAll' && {
                toursLocation: checked,
                numberOfTravelers: checked,
                tourDuration: checked,
                profits: checked,
            }),
        }));
    };

    const downloadSelectedDataAsExcel = () => {
        const selectedCollections = [];
        if (selectedExcelOptions.tours) selectedCollections.push('tours');
        if (selectedExcelOptions.users) selectedCollections.push('users');
        if (selectedExcelOptions.coupons) selectedCollections.push('coupons');
        if (selectedExcelOptions.contacts) selectedCollections.push('contacts');

        axios.post('https://tours-api-7hh1.onrender.com/report/generate-report', { collections: selectedCollections }, {
            responseType: 'blob' 
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Report.xlsx');
            document.body.appendChild(link);
            link.click();
            setShowExcelCheckboxes(false);
        })
        .catch((error) => {
            console.error('Error downloading the Excel report:', error);
        });
    };

    const downloadSelectedDataAsPdf = () => {
        setShowPdfCheckboxes(false);
    };

    return (
        <div className='col-md-9 g-4'>
            <div className='row'>
                <div className="col-md-12">
                    <div className='container mt-5'>
                        <h1 className="mb-4">Reports</h1>
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <button className="btn btn-success w-100 d-flex justify-content-center align-items-center" onClick={handleExcelDownload}>
                                    <i className="bi bi-file-earmark-spreadsheet text-black me-3 fw-bold fs-4"></i>
                                    Download Excel
                                </button>
                            </div>
                            <div className='col-md-6'>
                                <button className="btn btn-danger w-100 d-flex justify-content-center align-items-center" onClick={handlePdfDownload}>
                                    <i className="bi bi-file-earmark-pdf text-black me-3 fw-bold fs-4"></i>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                        {showExcelCheckboxes && (
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="selectAll"
                                        checked={selectedExcelOptions.selectAll}
                                        onChange={handleExcelCheckboxChange}
                                    />
                                    <label className="form-check-label">Select All</label>
                                </div>
                                {['tours', 'users', 'coupons', 'contacts'].map((option) => (
                                    <div key={option} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={option}
                                            checked={selectedExcelOptions[option]}
                                            onChange={handleExcelCheckboxChange}
                                        />
                                        <label className="form-check-label">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                                    </div>
                                ))}
                                <button className="btn btn-primary mt-3" onClick={downloadSelectedDataAsExcel}>
                                    Download Selected Data as Excel
                                </button>
                            </div>
                        )}
                        {showPdfCheckboxes && (
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="selectAll"
                                        checked={selectedPdfOptions.selectAll}
                                        onChange={handlePdfCheckboxChange}
                                    />
                                    <label className="form-check-label">Select All</label>
                                </div>
                                {['toursLocation', 'numberOfTravelers', 'tourDuration', 'profits'].map((option) => (
                                    <div key={option} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={option}
                                            checked={selectedPdfOptions[option]}
                                            onChange={handlePdfCheckboxChange}
                                        />
                                        <label className="form-check-label">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                                    </div>
                                ))}
                                <button className="btn btn-primary mt-3" onClick={downloadSelectedDataAsPdf}>
                                    Download Selected Data as PDF
                                </button>
                            </div>
                        )}
                        <div style={{ display: showPdfCheckboxes ? 'block' : 'none' }}>
                            {selectedPdfOptions.toursLocation && (
                                <div ref={pieChartRef} style={{ marginBottom: '20px' }}>
                                    <PieChart />
                                </div>
                            )}
                            {selectedPdfOptions.numberOfTravelers && (
                                <div ref={columnChartRef} style={{ marginBottom: '20px' }}>
                                    <ColumnChart />
                                </div>
                            )}
                            {selectedPdfOptions.tourDuration && (
                                <div ref={splineChartRef} style={{ marginBottom: '20px' }}>
                                    <SplineChart />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
