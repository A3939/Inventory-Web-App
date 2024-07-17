import React, { useState } from 'react'
import logo from '../utils/image/logo.png'
import { useNavigate } from 'react-router-dom'
import { GrMenu } from "react-icons/gr";

const Navbar = () => {
    const path = window.location.pathname

    const navigate = useNavigate()
    const [nav, setnav] = useState(false)
    const NavClass = `text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center `

    const handleNavigate = (route) => {
        navigate(`/${route}`)
    }

    const toggleNav = () => {
        setnav(!nav)
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        navigate('/login')
    }
    return (
        <div className='flex justify-between px-4 py-3 items-center mb-6 sticky top-0 bg-white z-[40]'>
            <div className='flex items-center gap-2 cursor-pointer'>
                <img src={logo} width={'55px'} height={'55px'} onClick={() => handleNavigate('')} />
                <button className='bg-[#006241] cursor-pointer px-3 py-2 rounded-md focus:outline-none text-white md:hidden inline-block' onClick={() => { toggleNav() }}><GrMenu></GrMenu></button>
            </div>
            <div className=' flex-row gap-4 lg:gap-5 justify-center hidden md:flex'>
                <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/' ? 'bg-green-100' : ''}`}
                    onClick={() => handleNavigate('')} >Home</p>
                <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/viewinventory' ? 'bg-green-100' : ''}`}
                    onClick={() => handleNavigate('viewinventory')} >Inventory</p>
                <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/inventory' ? 'bg-green-100' : ''}`} onClick={() => handleNavigate('inventory')} >Add product</p>
                <p className={NavClass}>Contact</p>
            </div>
            <div className='flex gap-3 justify-end'>
                {/* <button className='bg-[#006241] px-3 py-2 rounded-md focus:outline-none text-white' onClick={() => handleNavigate('login')}>Sign in</button> */}
                <button className='bg-[#006241] px-3 py-2 rounded-md focus:outline-none text-white' onClick={() => handleLogout()}>Logout</button>
            </div>

            <div className='mobile-nav absolute left-0 top-16 md:hidden'>
                <div className={`fixed inset-0 top-16 ${nav ? 'w-full' : 'w-0'} bg-[#000] bg-opacity-60 transition-all ease-in-out duration-200`}></div>
                <div className='relative z-10 '>
                    <div className={`flex flex-col gap-4 py-5 bg-white lg:gap-5 h-screen ${nav ? 'w-[150px] ' : 'w-0'} overflow-hidden transition-all ease-in-out duration-300 z-10`}>
                        <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/' ? 'bg-green-100' : ''}`}
                            onClick={() => handleNavigate('')} >Home</p>
                        <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/viewinventory' ? 'bg-green-100' : ''}`}
                            onClick={() => handleNavigate('viewinventory')} >Inventory</p>
                        <p className={`text-base font-medium rounded-md px-2 py-1 hover:bg-green-300 focus:bg-green-300 cursor-pointer transition-all ease-in duration-200 text-center ${path === '/inventory' ? 'bg-green-100' : ''}`} onClick={() => handleNavigate('inventory')} >Add product</p>
                        <p className={NavClass} onClick={() => handleNavigate('contact')}>Contact</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar