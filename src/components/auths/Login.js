import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { getAccounts, login } from '../../services/ApiService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { LoadingOutlined } from '@ant-design/icons';
const Login = () => {
    const [showPassord, setShowPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true)
        if (!userName || !password) {
            toast.error('UserName Or Password Not Empty')
            setLoading(false)
        }

        let res = await getAccounts();
        if (res && res.data) {
            const account = res.data.find((a) => a.username === userName.trim() && a.password === password.trim())
            if (account) {
                toast.success('Login Successfully')
                dispatch(doLogin(account.id, account.username, account.password, account.role))
                setLoading(false)
                navigate('/')
            } else {
                toast.error('UserName Or Password Not Correct')
                setLoading(false)
            }
        }

    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Discover Your Style with Our Trendy Fashion Collection</h1>
                        <p className="leading-relaxed mt-4">Explore the latest in fashion with our chic and sustainable clothing line. From casual wear to elegant outfits, find the perfect pieces to elevate your wardrobe.</p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">UserName</label>
                            <input onChange={e => setUserName(e.target.value)} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type={showPassord === true ? 'text' : 'password'} className=" w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {
                                showPassord === false ?
                                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassord)} className='absolute right-3 top-10' />
                                    :
                                    <FaRegEye onClick={() => setShowPassword(!showPassord)} className='absolute right-3 top-10' />
                            }
                        </div>
                        <button disabled={loading} onClick={handleLogin} className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-700 rounded text-lg">
                            {
                                loading === true &&
                                <Space className='mx-2'>
                                    <Spin indicator={<LoadingOutlined spin />} />
                                </Space>
                            }
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Not have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
                        </p>
                        <div className='my-2'>
                            <Link to={'/'}>Home</Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Login;