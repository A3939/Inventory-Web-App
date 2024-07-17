import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate = useNavigate()
    const query = window.location.search;
    const id = parseInt(query.split('?')[1], 10);

    const [prodData, setProdData] = useState(JSON.parse(localStorage.getItem('ProdData')) || []);
    const [qty, setQty] = useState([]);
    const [weight, setWeight] = useState({
        currWeight: [],
        totalWeight: []
    });

    let editProduct = prodData?.filter((prod) => prod.id === id);
    let TotalQty = 0;
    let TotalWeight = 0;


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (isAuthenticated === null) navigate('/login')
    }, [])

    function isEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const handleSubmit = async (values) => {
        if (!isEqual(values.qty, qty) || !isEqual(values.currWeight, weight.currWeight) || !isEqual(values.totalWeight, weight.totalWeight)) {

            const qty = values.qty.filter((item) => item != '');
            const weight = {
                currWeight: values.currWeight.filter((item) => item != ''),
                totalWeight: values.totalWeight.filter((item) => item != '')
            }

            TotalQty = qty?.reduce((sum, item) => {
                return sum += item
            }, 0)

            for (let i = 0; i < weight.currWeight.length; i++) {
                console.log(weight.currWeight[i], weight.totalWeight[i], 'weights')
                if (weight.totalWeight[i] !== 0) {
                    TotalWeight += weight.currWeight[i] / weight.totalWeight[i];
                }
            }
            editProduct[0].qty = qty;
            editProduct[0].weight = weight;
            editProduct[0].TotalQty = TotalQty + TotalWeight;

            const updatedProducts = [...prodData];
            updatedProducts[id] = editProduct[0];
            await setProdData(updatedProducts);

            await localStorage.setItem('ProdData', JSON.stringify(updatedProducts));
            navigate('/viewinventory')
        }
    };

    useEffect(() => {
    }, [qty, weight]);

    const initialValues = {
        qty: editProduct[0].qty ? editProduct[0].qty.length > 0 ? editProduct[0].qty : [0] : [0],
        currWeight: editProduct[0].weight.currWeight ? editProduct[0].weight.currWeight.length > 0 ? editProduct[0].weight.currWeight : [] : [],
        totalWeight: editProduct[0].weight.totalWeight ? editProduct[0].weight.totalWeight.length > 0 ? editProduct[0].weight.totalWeight : [] : [],
    }

    const validation = Yup.object().shape({
        // qty: Yup.array().min(1, 'Add at least one quantity'),
        // currWeight: Yup.array().min(1, 'Add at least one weight'),
        // totalWeight: Yup.array().of(Yup.number()
        //     .min(1, 'Please enter correct total weight')
        //     .required('Total weight is required')
        // ).min(1, 'Add at least one total weight')
    });

    return (
        <div>
            <Navbar />
            <div className='flex justify-center px-3'>
                <div className='max-w-[600px] w-full'>
                    <h2 className='text-3xl text-green-700 font-bold mb-10'>{editProduct[0]?.name}</h2>
                    <div className='w-full'>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validation}
                                onSubmit={handleSubmit}
                            >
                                {(formik, error) => (
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className='flex flex-wrap gap-3 justify-between'>
                                            <div className='flex gap-3'>
                                                <div className='flex gap-3'>
                                                    <label className='text-lg font-bold' htmlFor='qty'>Qty: </label>
                                                    <FieldArray
                                                        name='qty'
                                                        render={(arrayHelpers) => (
                                                            <div className='flex gap-2 items-start'>
                                                                <div className='flex flex-col gap-2'>
                                                                    {formik.values.qty.map((qty, index) => (
                                                                        <div key={index} className='flex gap-2 items-center'>
                                                                            <Field
                                                                                type='number'
                                                                                name={`qty.${index}`}
                                                                                className='border-2 px-2 py-1 border-emerald-400 w-20 rounded-md focus:outline-none'
                                                                            />
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                className='mx-1 p-0.5 rounded-full border-2 border-green-600'
                                                                            >
                                                                                <RxCross2 />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        if (formik.values.qty[formik.values.qty.length - 1] !== '') {
                                                                            arrayHelpers.push('');
                                                                        }
                                                                    }}
                                                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                                >
                                                                    Add
                                                                </button>
                                                                <div>
                                                                    <ErrorMessage name='qty'>
                                                                        {(msg) => <div className='text-red-400'>{msg}</div>}
                                                                    </ErrorMessage>
                                                                </div>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex gap-3'>
                                                <div className='flex gap-3'>
                                                    <label className='text-lg font-bold' htmlFor='weight'>Weight: </label>
                                                    <FieldArray
                                                        name='currWeight'
                                                        render={(arrayHelpers) => (
                                                            <div className='flex gap-2 items-start'>
                                                                <div className='flex flex-col gap-2'>
                                                                    {formik.values.currWeight.map((weight, index) => (
                                                                        <div key={index} className='flex gap-2 items-center'>
                                                                            <Field
                                                                                type='number'
                                                                                name={`currWeight.${index}`}
                                                                                className='border-2 px-2 py-1 border-emerald-400 w-20 rounded-md focus:outline-none'
                                                                            />
                                                                            <Field
                                                                                type='number'
                                                                                min="1"
                                                                                name={`totalWeight.${index}`}
                                                                                className='border-2 px-2 py-1 border-emerald-400 w-20 rounded-md focus:outline-none'
                                                                            />
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                className='mx-1 p-0.5 rounded-full border-2 border-green-600'
                                                                            >
                                                                                <RxCross2 />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        if (
                                                                            formik.values.currWeight[formik.values.currWeight.length - 1] !== '' &&
                                                                            formik.values.totalWeight[formik.values.totalWeight.length - 1] !== ''
                                                                        ) {
                                                                            arrayHelpers.push('');
                                                                        }
                                                                    }}
                                                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                                >
                                                                    Add
                                                                </button>
                                                                {/* {console.log(formik.errors,'ererr')} */}
                                                                <div>
                                                                    <ErrorMessage name='currWeight'>
                                                                        {(msg) => <div className='text-red-400'>{msg}</div>}
                                                                    </ErrorMessage>
                                                                    {!formik.errors.currWeight &&
                                                                        <ErrorMessage name='totalWeight'>
                                                                            {(msg) => <div className='text-red-400'>{msg[0]}</div>}
                                                                        </ErrorMessage>}
                                                                </div>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-3 max-w-full'>
                                            <button className='mt-5 bg-green-900 text-white font-bold px-3 py-2 rounded-md' type='submit' >Save</button>
                                            <button className='bg-[#D0F1BF] px-2 py-1 rounded-md hover:shadow-lg border border-green-900 transition-all ease-in-out duration-300' onClick={() => { navigate('/viewinventory') }}>View inventory</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
