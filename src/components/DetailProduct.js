import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ApiService';
import { toast } from 'react-toastify';


const DetailProduct = () => {
    const { id } = useParams();

    const [singleProduct, setSingleProduct] = useState({});

    console.log('ccc', id)

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let res = await getProductById(id)
        console.log(res)
        if (res && res.data) {
            setSingleProduct(res.data)
        }
    }


    const handleCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExist = cart.find(i => i.id === product.id)
        if (isProductExist) {
            const updateCart = cart.map(i => {
                if (i.id === product.id) {
                    return {
                        ...i,
                        quantity: i.quantity + 1
                    }
                }
                return i
            })
            localStorage.setItem('cart', JSON.stringify(updateCart))
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]))
        }
        toast.success('Adding To Cart Successfully')
    }





    return (

        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto max-h-[500px] h-64 object-contain object-center rounded" src={singleProduct.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{singleProduct.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{singleProduct.title}</h1>
                        <div className="flex mb-4">
                        </div>
                        <p className="leading-relaxed">{singleProduct.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            {/* <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
                            </div> */}
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                        <option>SM</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="title-font font-medium text-2xl text-gray-900">${singleProduct.price}</span>
                            <button onClick={() => handleCart(singleProduct)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default DetailProduct;