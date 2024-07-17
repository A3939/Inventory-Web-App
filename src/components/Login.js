import { Formik, Form, Field, ErrorMessage } from 'formik'
import React,{useState,useEffect} from 'react'
import { MdEmail } from 'react-icons/md'
import { FaEyeSlash } from "react-icons/fa";
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [passVisible, togglePass] = useState(false)
    const email = 'admin@gmail.com'
    const password = 'admin@1234'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validation =  Yup.object().shape({
        email: Yup.string()
        .matches(emailRegex, "Invalid email address")
        .required("Email is required"),
        password: Yup.string()
        .required("Password is required")
        .trim()
    })
    const handleSubmit = (values) => {
        console.log({ values })
        console.log(values.email == email);
        if(values.email !== email){
            return toast.error(`Incorrect email`, {
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
        else if(values.password !== password){
            return toast.error(`Incorrect password`, {
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
        else{
            localStorage.setItem('isAuthenticated',true)
            setTimeout(() => {
                navigate('/')
            },1000)
            return toast.success(`Login succesfully`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='flex justify-center items-center top-32 bg-green-50 h-screen'>
            <div className='max-w-[500px] w-full max-h-[400px] h-full bg-white rounded-lg shadow-lg border border-green-200 flex items-center justify-center items-center'>
                <div className='h-[300px] flex items-center justify-center'>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validation={validation}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} className='flex gap-5 flex-col w-[300px] '>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor='email' className='font-semibold'>Email</label>
                                    <>
                                    <Field type='email' name='email' placeholder='Enter email' className='w-full px-3 py-2 rounded-md focus:outline-none border '/>
                                    <ErrorMessage name='email'>
                                        {(msg) => <div className='text-red-400'>{msg}</div>}
                                    </ErrorMessage>
                                    </>
                                </div>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor='password' className='font-semibold'>Password</label>
                                    <>
                                    <div className='w-full rounded-md border flex'>
                                    <Field type={`${passVisible ? 'text' : 'password'}`}  name='password' placeholder='Enter password' className='w-full px-3 py-2 focus:outline-none border-r'/>
                                    <button type='button' onClick={() => {togglePass(!passVisible)}} className='px-2'><FaEyeSlash></FaEyeSlash></button>
                                    </div>
                                    <ErrorMessage name='password'>
                                        {(msg) => <div className='text-red-400'>{msg}</div>}
                                    </ErrorMessage>
                                    </>
                                </div>
                                <div>
                                    <button type='submit' className='bg-green-300 w-full font-bold rounded-md border border-green-200 shadow hover:bg-green-200 px-3 py-2'>Login</button>
                                </div>
                            </Form>
                        
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login