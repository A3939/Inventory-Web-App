import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";


const ViewInvetory = () => {
    const navigate = useNavigate()
    const [prodData, setProdData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(()=>{
    //     const isAuthenticated = localStorage.getItem('isAuthenticated')
    //     if(isAuthenticated === null) navigate('/login')
    // },[])

    const exportToPDF = () => {
        const doc = new jsPDF();    
        doc.text(
            105,
            10,
            "Products detail",
            null,
            null,
            "center"
          );
          const generalInfocolumns = [
            "SAP Code", "Name", "Quantity"
          ];
          var generalInfoRows = []
        Object.keys(prodData).forEach((key, index) => {
            const product = prodData[key];
            const qtyDisplay = Array.isArray(product.TotalQty) ? product.qty.join(', ') : product.TotalQty;
            generalInfoRows[index] = [`${product.SAPCode}` ,`${product.name}`,`${qtyDisplay}`];
        });
        doc.autoTable(generalInfocolumns, generalInfoRows, {
            startY: 25
          });
        doc.save('products.pdf');
    };
    useEffect(() => {
        const storeData = JSON.parse(localStorage.getItem('ProdData'))
        setProdData(storeData)
        setSearchData(storeData)
    }, [])

    const handleSearch = (e) => {
        const searchTerm = e.target.value
        setSearchTerm(searchTerm)

        if (searchTerm !== '') {
            const searchProduct = prodData?.filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))
            return setSearchData(searchProduct)
        }
        else {
            setSearchData(prodData)
        }
    }
    return (
        <div>
            <Navbar />

            <div className='flex justify-center px-3'>
                <div className='max-w-[600px] w-full flex gap-3 flex-col'>
                    <div className='flex justify-center'>
                        <input type='text' placeholder='Search' name='search' value={searchTerm}
                            onChange={(e) => handleSearch(e)}
                            className='px-3 py-2 border-2 rounded-lg border-[#B6D7B9] focus:ring-1 focus:ring-[#9ABD97] focus:outline-none w-full' />
                    </div>
                    {searchData?.length > 0 ?
                        <>
                            {searchData?.map((product, index) => {
                                return (
                                    <div className='flex justify-between rounded-md w-full px-3 py-2 border-green-500 bg-green-100 hover:bg-[#D0F1BF] hover:shadow-md tramsition-all ease-in-out duration-300'
                                        onClick={() => { navigate(`/editProduct?${product.id}`) }}>
                                        <div className='flex gap-3 text-md font-bold'>
                                            <p>{product.SAPCode}.</p>
                                            <p className=' truncate max-w-40' title={product.name}>{product.name}</p>
                                        </div>
                                        <div className='flex gap-5'>
                                            <p className=' truncate max-w-24' >Qty: <span className='font-semibold' title={product.TotalQty}>{product.TotalQty}</span></p>
                                            <button onClick={() => { navigate(`/editProduct?${product.id}`) }}><FaRegEdit /></button>
                                        </div>
                                    </div>
                                )
                            })}
                            <div>
                                <button className='bg-[#D0F1BF] px-2 py-1 rounded-md hover:shadow-lg  mt-5 border border-green-900 transition-all ease-in-out duration-300' onClick={() => { exportToPDF() }}>Print</button>
                            </div>
                        </>
                        :
                        <><p>No products data to show here</p><p>Add products <span className='text-green-600 font-medium'><Link to='/inventory'>here</Link></span>,</p></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewInvetory