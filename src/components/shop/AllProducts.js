import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getAllProducts, getCategory } from '../../services/ApiService';
import { Button, Card, FormCheck, FormGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const AllProducts = (props) => {
    const { search } = props;
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const priceRanges = [
        { label: '$0 - $100', min: 0, max: 100 },
        { label: '$100 - $500', min: 100, max: 500 },
        { label: '$500 - $1000', min: 500, max: 1000 },
    ];

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


    useEffect(() => {
        filterProducts(products, selectedCategories, selectedPriceRanges, search);
    }, [itemOffset, itemsPerPage, search, selectedCategories, selectedPriceRanges])

    const fetchData = async () => {
        let res = await getAllProducts();
        if (res && res.data) {
            setProducts(res.data);
            setPageCount(Math.ceil(res.data.length / itemsPerPage));
            setCurrentItems(res.data.slice(itemOffset, itemOffset + itemsPerPage));
        }
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        fetchData()
        getAllCategories();
    }, [])
    const getAllCategories = async () => {
        let res = await getCategory();
        if (res && res.data) {
            setCategories(res.data);
        }
    }
    const filterProducts = (products, categories, priceRanges, search) => {
        let filtered = products;

        if (categories.length > 0) {
            filtered = filtered.filter(p => categories.includes(p.category));
        }

        if (priceRanges.length > 0) {
            filtered = filtered.filter(p => priceRanges.some(range => p.price > range.min && p.price < range.max));
        }
        if (search) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredProducts(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
        setCurrentItems(filtered.slice(itemOffset, itemOffset + itemsPerPage));
    };

    const handleCategoryChange = (category) => {
        const currentIndex = selectedCategories.indexOf(category);
        const newSelectedCategories = [...selectedCategories];

        if (currentIndex === -1) {
            newSelectedCategories.push(category);
        } else {
            newSelectedCategories.splice(currentIndex, 1);
        }

        setSelectedCategories(newSelectedCategories);
        filterProducts(products, newSelectedCategories, selectedPriceRanges, search);
    };

    const handlePriceRangeChange = (priceRange) => {
        const currentIndex = selectedPriceRanges.findIndex(range => range.label === priceRange.label);
        const newSelectedPriceRanges = [...selectedPriceRanges];

        if (currentIndex === -1) {
            newSelectedPriceRanges.push(priceRange);
        } else {
            newSelectedPriceRanges.splice(currentIndex, 1);
        }

        setSelectedPriceRanges(newSelectedPriceRanges);
        filterProducts(products, selectedCategories, newSelectedPriceRanges, search);
    };



    return (
        <div>
            <div className='row'>
                <div className='col-md-3'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                {categories.map((c) => (
                                    <FormGroup key={c}>
                                        <FormCheck
                                            label={c.toUpperCase()}
                                            onChange={() => handleCategoryChange(c)}
                                            checked={selectedCategories.includes(c)}
                                        />
                                    </FormGroup>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Price</Accordion.Header>
                            <Accordion.Body>
                                {priceRanges.map((range) => (
                                    <FormGroup key={range.label}>
                                        <FormCheck
                                            label={range.label}
                                            onChange={() => handlePriceRangeChange(range)}
                                            checked={selectedPriceRanges.some(selectedRange => selectedRange.label === range.label)}
                                        />
                                    </FormGroup>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
                <div className='col-md d-flex' style={{ flexWrap: 'wrap', gap: 30 }}>
                    {
                        currentItems.map((p) =>

                            <Card style={{ width: '23rem' }}>
                                <Card.Img style={{ height: 250 }} src={p.image} />
                                <Card.Body>
                                    <Card.Title>{p.title}</Card.Title>
                                    <Card.Text>
                                        {p.description}
                                        <p className='fw-bolder' style={{ color: '#E6BF6A' }}>{p.price} $</p>
                                    </Card.Text>
                                    <Button variant="primary">Buy</Button>
                                    <Button className='mx-3' variant="success">Add To Cart</Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            </div>
            <div className='my-3'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

export default AllProducts;