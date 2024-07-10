import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const idCustomer = useSelector((state) => state.userReducer.id)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const cart = JSON.parse(localStorage.getItem(`cart${idCustomer}`)) || [];
    const [carts, setCarts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(`cart${idCustomer}`)) || [];
        setCarts(storedCart);
    }, []);


    const handleInt = (id) => {
        const updateCart = cart.map((i) => {
            if (i.id === id) {
                return {
                    ...i,
                    quantity: i.quantity + 1
                }
            }
            return i;
        })
        setCarts(updateCart)
        localStorage.setItem(`cart${idCustomer}`, JSON.stringify(updateCart))
    }

    const handleDec = (id) => {
        const updateCart = cart.map((i) => {
            if (i.id === id && i.quantity > 1) {
                return {
                    ...i,
                    quantity: i.quantity - 1
                }
            }
            return i;
        })
        setCarts(updateCart)
        localStorage.setItem(`cart${idCustomer}`, JSON.stringify(updateCart))

    }
    const handleRemoveCart = (id) => {
        const updateCart = cart.filter((i) => i.id !== id)
        setCarts(updateCart)
        localStorage.setItem(`cart${idCustomer}`, JSON.stringify(updateCart))
    }

    const handleCheckOut = () => {
        const updateCart = localStorage.removeItem(`cart${idCustomer}`)
        if (isAuthenticated === false) {
            toast.warning('Please Login Before Check Out')
            navigate('/login')
        }
        else if (!cart.length) {
            toast.error('Please Shopping product')
        } else {
            setCarts(updateCart);
            toast.success("Check Out Successfully")
        }
    }

    return (
        <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />
                    <div className="space-y-4">
                        {
                            !cart.length ? <div>Cart is Empty</div>
                                :
                                cart && cart.map((c) =>

                                    <div className="grid grid-cols-3 items-center gap-4">

                                        <div className="col-span-2 flex items-center gap-4">
                                            <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                                <img src={c.image} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800">{c.title}</h3>
                                                <h6 className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => handleRemoveCart(c.id)}>Remove</h6>
                                                <div className="flex gap-4 mt-4">
                                                    <div className="relative group">


                                                    </div>
                                                    <div>
                                                        <button type="button" className="flex items-center px-2.5 py-1.5 border border-gray-300 cursor-pointer text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                            <svg onClick={() => handleDec(c.id)} xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                                                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000" />
                                                            </svg>
                                                            <span className="mx-2.5">{c.quantity}</span>
                                                            <svg onClick={() => handleInt(c.id)} xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                                                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <h4 className="text-base font-bold text-gray-800">${c.price * c.quantity}</h4>
                                        </div>
                                    </div>
                                )
                        }

                    </div>
                </div>
                <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">

                    <ul className="text-gray-800 mt-8 space-y-4">
                        <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">$0.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span></li>
                    </ul>
                    <div className="mt-8 space-y-2">
                        <button onClick={() => handleCheckOut()} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
                        <Link to={'/products'} className="btn text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-400 text-gray-800 border border-gray-300 rounded-md">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cart;