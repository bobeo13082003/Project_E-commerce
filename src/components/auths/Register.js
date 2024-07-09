import React, { useEffect, useState } from 'react';
import logo from '../../assest/_fb80661f-f791-4b4b-9cf6-3479759cb267.jpg'
import { getAccounts, register } from '../../services/ApiService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getAllAccount()
    }, [])

    const getAllAccount = async () => {
        let res = await getAccounts();
        if (res && res.data) {
            setAccounts(res.data)
        }
    }

    const account = accounts.find(a => a.username === username.trim())

    const handleRegister = async () => {
        if (!username && !password && !confirmPassword) {
            toast.error("Input Not Empty")
        } else if (username.trim().length < 3) {
            toast.error('Username must be at least 3 characters')
        } else if (password.trim() < 8) {
            toast.error('Password must be at least 8 characters')
        } else if (account) {
            toast.error('Username is Exits')
        } else if (password.trim() !== confirmPassword.trim()) {
            toast.error('Confirm password not correct')
        } else {
            let res = await register(username.trim(), password.trim())
            if (res && res.data) {
                toast.success('Create Account Successfully')
                navigate('/login')
            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className='text-center'>
                                <Button className='btn btn-suucess' onClick={handleRegister}>Register</Button>

                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Register;