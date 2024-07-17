import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const cards = [
        {
            name: 'Inventory',
            link: 'viewinventory'
        },
        {
            name: 'Add product',
            link: 'inventory'
        },
        {
            name: 'Stock',
            link: 'stock'
        },
        {
            name: 'Product data',
            link: 'Productdata'
        },
     
    ]

    const handleNavigate = (route) => {
        navigate(`/${route}`)
    }

    // useEffect(()=>{
    //     const isAuthenticated = localStorage.getItem('isAuthenticated')
    //     if(isAuthenticated === null) navigate('/login')
    // },[])

  return (
    <div>
      <Navbar />
        
    <div className='flex flex-wrap gap-5 justify-center items-center'>
        {cards.map((card) => {
            return(
                <>
                <div className=' w-[150px] cursor-pointer text-black text-xl text-center font-bold p-3 rounded-lg overflow-hidden border border-green-600
                 transform transition-transform hover:shadow-xl hover:scale-105 card-bg-animation' onClick={() => handleNavigate(card.link)}>
                     <div className="bg-animation"></div>
                     <div>
                    <p className='z-[99] relative'>{card.name}</p>
                     </div>
                </div>
                </>
            )
        })}
    </div>
    </div>
  )
}

export default Dashboard