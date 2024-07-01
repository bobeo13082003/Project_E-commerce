import React from 'react';
// import ReactPaginate from 'react-paginate';

const AllProducts = () => {
    // const [currentItems, setCurrentItems] = useState([]);
    // const [pageCount, setPageCount] = useState(0);
    // const [itemOffset, setItemOffset] = useState(0);
    // const itemsPerPage = 6;


    // useEffect(() => {
    //     fetchData();
    // }, [itemOffset, itemsPerPage])

    // const fetchData = async () => {
    //     let res = await getAllProducts();
    //     if (res && res.data) {
    //         setProducts(res.data);
    //         setPageCount(Math.ceil(res.data.length / itemsPerPage));
    //         setCurrentItems(res.data.slice(itemOffset, itemOffset + itemsPerPage));
    //     }
    // };

    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % products.length;
    //     setItemOffset(newOffset);
    // };
    return (
        <div>

            {/* <div className='my-3'>
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
            </div> */}
        </div>
    );
};

export default AllProducts;