import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

export default function Reports() {
    const [showExcelCheckboxes, setShowExcelCheckboxes] = useState(false);
    const [showPdfCheckboxes, setShowPdfCheckboxes] = useState(false);
    const [selectedExcelOptions, setSelectedExcelOptions] = useState({
        booking: false,
        tours: false,
        users: false,
        coupons: false,
        reviews: false,
        contacts: false,
        subscription: false,
        favourites: false,
        selectAll: false,
    });

    const [selectedPdfOptions, setSelectedPdfOptions] = useState({
        toursLocation: false,
        numberOfTravelers: false,
        tourDuration: false,
        profits: false,
        selectAll: false,
    });

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
                booking: checked,
                tours: checked,
                users: checked,
                coupons: checked,
                reviews: checked,
                contacts: checked,
                subscription: checked,
                favourites: checked,
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
        const data = [];
        if (selectedExcelOptions.booking) data.push({ category: 'Booking', data: 'Sample Booking Data' });
        if (selectedExcelOptions.tours) data.push({ category: 'Tours', data: 'Sample Tours Data' });
        if (selectedExcelOptions.users) data.push({ category: 'Users', data: 'Sample Users Data' });
        if (selectedExcelOptions.coupons) data.push({ category: 'Coupons', data: 'Sample Coupons Data' });
        if (selectedExcelOptions.reviews) data.push({ category: 'Reviews', data: 'Sample Reviews Data' });
        if (selectedExcelOptions.contacts) data.push({ category: 'Contacts', data: 'Sample Contacts Data' });
        if (selectedExcelOptions.subscription) data.push({ category: 'Subscription', data: 'Sample Subscription Data' });
        if (selectedExcelOptions.favourites) data.push({ category: 'Favourites', data: 'Sample Favourites Data' });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'Report.xlsx');

        setShowExcelCheckboxes(false);
    };

    const downloadSelectedDataAsPdf = () => {
        const doc = new jsPDF();
        doc.text('Report', 10, 10);

        let yPosition = 20;
        if (selectedPdfOptions.toursLocation) {
            doc.text('Tours Location: Sample Data', 10, yPosition);
            yPosition += 10;
        }
        if (selectedPdfOptions.numberOfTravelers) {
            doc.text('Number of Travelers: Sample Data', 10, yPosition);
            yPosition += 10;
        }
        if (selectedPdfOptions.tourDuration) {
            doc.text('Tour Duration: Sample Data', 10, yPosition);
            yPosition += 10;
        }
        if (selectedPdfOptions.profits) {
            doc.text('Profits: Sample Data', 10, yPosition);
            yPosition += 10;
        }

        doc.save('Report.pdf');
        setShowPdfCheckboxes(false);
    };

    return (
        <div className='col-md-9 g-4'>
            <div className='row'>
                <div className="col-md-12">
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className="mb-4">Reports</h1>
                            <div className="mb-3">
                                <button className="btn btn-success mr-2" onClick={handleExcelDownload}>
                                    Download Excel
                                </button>
                                <button className="btn btn-danger" onClick={handlePdfDownload}>
                                    Download PDF
                                </button>
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
                                    {['booking', 'tours', 'users', 'coupons', 'reviews', 'contacts', 'subscription', 'favourites'].map((option) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
