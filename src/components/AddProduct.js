import React, { useEffect, useState, useCallback } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'

const AddProduct = () => {
    const navigate = useNavigate()
    const [isDragOver, setIsDragOver] = useState(false)
    // useEffect(()=>{
    //     const isAuthenticated = localStorage.getItem('isAuthenticated')
    //     if(isAuthenticated === null) navigate('/login')
    // },[])

    //     const fileReader = new FileReader();
    //     fileReader.readAsText(e.target.files[0], "UTF-8");
    //     fileReader.onload = e => {
    //         console.log("e.target.result", e.target.result);
    //         setFilesData(e.target.result);
    //         setIsUpload(true)
    //     };
    // };
    const onDropAccepted = async ([file]) => {
        try {
            var reader = new FileReader();
            reader.onload = function (e) {
                var contents = e.target.result;
                console.log("e.target.result", contents);
                const object = JSON.parse(contents);

                if (typeof object !== 'object' || Array.isArray(object)) {
                    throw new Error('Invalid JSON format: Expecting an object.');
                }

                Object.keys(object).forEach((property, index) => {
                    if (typeof object[property] !== 'string') {
                        throw new Error(`Invalid data format at index ${index}: Expecting string.`);
                    }
                });

                const prodData = Object.keys(object).map((property, index) => ({
                    id: index,
                    SAPCode: property,
                    name: object[property],
                    qty: 0,
                    weight: 0,
                    TotalQty: 0
                }));
                if (prodData.length > 0) {
                    localStorage.setItem('ProdData', JSON.stringify(prodData));
                    navigate('/viewinventory');
                } else {
                    throw new Error('No valid data found.');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error while processing file:', error);
            toast.error('Failed to process file. Please check the format and try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const onDropRejected = ([file]) => {
        setIsDragOver(false);
        toast.error(`${file.file.type} type is not accepted`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
 
    return (
        <div>
            
            <Navbar />
            <div>
                <div className='flex justify-center px-3'>

                    {/* <input type="file" onChange={handleChange} className='-40' /> */}

                    <div className="flex flex-col items-center justify-center max-w-[600px] w-full">
                        <p className='mb-4 text-lg font-bold text-[#76a771]'>Add products by uploading JSON file</p>
                        <Dropzone
                            onDragEnter={() => setIsDragOver(true)}
                            onDragLeave={() => setIsDragOver(false)}
                            onDropAccepted={onDropAccepted}
                            accept={{
                                'file/json': ['.json']
                            }}
                            onDropRejected={onDropRejected}
                            onDrop={acceptedfile => console.log(acceptedfile)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${isDragOver? 'bg-gray-300' : 'bg-gray-50'}  hover:bg-gray-100`}>
                                    <div className='flex flex-col items-center'>
                                        <input {...getInputProps()} />
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        {isDragOver ? (
                                            <p>
                                                <span className="font-semibold">Drop file</span> to upload
                                            </p>
                                        ) :
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        }
                                        <p className="text-sm text-gray-400 dark:text-gray-400">Please upload json file</p>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default AddProduct