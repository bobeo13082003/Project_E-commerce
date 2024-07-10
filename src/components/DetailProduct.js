import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { useParams } from 'react-router-dom';
import { getAllProducts, getProductById } from '../services/ApiService';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { MdStar } from "react-icons/md";
=======

=======
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProducts } from '../services/ApiService';
import { toast } from 'react-toastify';
import { MdStar } from "react-icons/md";
import { useSelector } from 'react-redux';
>>>>>>> Stashed changes
>>>>>>> admin

const DetailProduct = () => {
    const { id } = useParams();
    const idCustomer = useSelector((state) => state.userReducer.id)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const [singleProduct, setSingleProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id]);

    const getProduct = async () => {
        try {
            let res = await getAllProducts();
            if (res && res.data) {
                const product = res.data.find(p => p.id === id);
                setSingleProduct(product);
            }
        } catch (error) {
            toast.error('Failed to fetch product data');
        } finally {
            setLoading(false);
        }
    }

<<<<<<< HEAD
    console.log('c', singleProduct)
    console.log('cid', id)
=======
<<<<<<< Updated upstream
=======
>>>>>>> admin

    if (loading) {
        return <div>Loading...</div>;
    }

    const { image, category, title, description, rating, price } = singleProduct;

<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> admin

    const handleCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExist = cart.find(i => i.id === product.id)
        if (isAuthenticated === false) {
            toast.warning('Please Login Before Shopping')
            navigate('/login');
        }
        else if (isProductExist) {
            const updateCart = cart.map(i => {
                if (i.id === product.id) {
                    return {
                        ...i,
                        quantity: i.quantity + 1
                    }
                }
                return i
            })
            localStorage.setItem(`cart${idCustomer}`, JSON.stringify(updateCart))
            toast.success('Adding To Cart Successfully')

        } else {
            localStorage.setItem(`cart${idCustomer}`, JSON.stringify([...cart, { ...product, quantity: 1 }]))
            toast.success('Adding To Cart Successfully')
        }
    }



    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto max-h-[500px] h-64 object-contain object-center rounded" src={image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
                        <div className="flex mb-4">
                        </div>
                        <p className="leading-relaxed">{description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Rate:</span>
                                <div className="relative">
                                    <div className='d-flex'>
                                        {
                                            rating?.rate
                                        }
                                        <MdStar className='mt-1' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="title-font font-medium text-2xl text-gray-900">${price}</span>
                            <button onClick={() => handleCart(singleProduct)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default DetailProduct;