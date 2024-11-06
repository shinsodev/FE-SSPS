import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { FaCalendarAlt, FaCloudUploadAlt } from 'react-icons/fa';
import { VscCircleLargeFilled } from "react-icons/vsc";
function AddPrinter() {
    const [printer, setPrinter] = useState({
        name: '',
        model: '',
        id: '',
        manufacturingYear: null,
        position: '',
        type: '',
        status: ''
    });
    const [images, setImages] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrinter((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (selectedOption) => {
        setPrinter((prev) => ({ ...prev, status: selectedOption ? selectedOption.value : '' }));
    };

    const handleDateChange = (date) => {
        setPrinter((prev) => ({ ...prev, manufacturingYear: date }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        const newImages = imageFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file) // Tạo URL tạm để xem ảnh
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Mở trình chọn file
        }
    };

    const handleSubmit = () => {
        console.log("Printer Information Submitted:", printer);
        console.log("Uploaded Images:", images);

        setShowConfirmation(true);

        // Đặt lại trạng thái form sau khi submit
        setPrinter({
            name: '',
            model: '',
            id: '',
            manufacturingYear: null,
            position: '',
            type: '',
            status: ''
        });
        setImages([]);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const statusOptions = [
        { value: 'Running', label: <div className="flex items-center"><VscCircleLargeFilled className="mr-2 text-green-500" /> Running</div> },
        { value: 'Maintenance', label: <div className="flex items-center"><VscCircleLargeFilled className="mr-2 text-yellow-500" /> Maintenance</div> },
        { value: 'Error', label: <div className="flex items-center"><VscCircleLargeFilled className="mr-2 text-red-500" /> Error</div> },
    ];

    return (
        <div className="p-8 rounded-lg bg-white w-full mx-auto max-w-2xl border-none outline-none">
            <h2 className="h3 text-[40px] text-primary text-center pb-6 pt-6">ADD PRINTER</h2>
            <div className="space-y-4">
                <div>
                    <label className="py-5 text-center font-bold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={printer.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="py-5 text-center font-bold">Model:</label>
                    <input
                        type="text"
                        name="model"
                        value={printer.model}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="py-5 text-center font-bold">ID printer:</label>
                        <input
                            type="text"
                            name="id"
                            value={printer.id}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="py-5 text-center font-bold">Manufacturing year:</label>
                        <div className="relative flex items-center mt-1">
                            <DatePicker
                                selected={printer.manufacturingYear}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:border-blue-500"
                            />
                            <FaCalendarAlt
                                className="absolute left-3 text-red-500 cursor-pointer"
                                onClick={handleUploadClick}
                                size={20}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="py-5 text-center font-bold">Position:</label>
                        <select
                            name="position"
                            value={printer.position}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border font-normal border-gray-300 rounded-md text-slate-950 focus:border-blue-500"
                        >
                            <option value="" disabled hidden>Select Position</option>
                            <option value="H6-810">H6-810</option>
                            <option value="H1-304">H1-304</option>
                        </select>
                    </div>

                    <div>
                        <label className="py-5 text-center font-bold">Type:</label>
                        <select
                            name="type"
                            value={printer.type}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border font-normal border-gray-300 rounded-md text-slate-950 focus:border-blue-500"
                        >
                            <option value="" disabled hidden>Select Type</option>
                            <option value="Type1">Type1</option>
                            <option value="Type2">Type2</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="py-5 text-center font-bold">Status:</label>
                    <Select
                        options={statusOptions}
                        value={statusOptions.find(option => option.value === printer.status)}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        className="mt-1 block w-full"
                    />
                </div>

                {/* Phần upload file */}
                <div className="flex items-center space-x-4 mb-4">
                    <label className="py-5 text-center font-bold">Images:</label>
                    {/* Input file ẩn */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*" // Chỉ chấp nhận file ảnh
                        multiple // Cho phép chọn nhiều ảnh
                    />
                    <button
                        onClick={handleUploadClick}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:border-blue-500"
                    >
                        <FaCloudUploadAlt className="mr-2 w-5 h-5" />
                        Upload
                    </button>
                </div>

                {/* Hiển thị các ảnh đã upload */}
                <div className="mt-4">
                    {images.map((image, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <a href={image.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {image.name}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:border-blue-500"
                    >
                        Submit
                    </button>
                </div>

                {/* Thông báo xác nhận */}
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-lg font-semibold mb-4">Tạo máy in thành công !</h3>
                            <p>Bạn đã tạo máy in thành công.</p>
                            <button
                                onClick={handleCloseConfirmation}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddPrinter;
