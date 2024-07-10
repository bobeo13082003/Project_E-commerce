import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel, Tab, Table, Toast } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CgEnter } from 'react-icons/cg'
export default function ManageProduct() {
  // all products
  const [products,setProducts] = useState([])
  // all product on each page
  const [pagingProduct,setPagingProduct] = useState([])
  // all product to search by name
  const [searchProduct,setSearchProduct] = useState([])
  // array paging
  const [paging,setPaging] = useState([])
  // change page
  const [isChange,setIsChange] = useState(true)
  //search
  const search = useRef('')
  const [categories,setCategories] = useState([])
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description,setDescription] = useState('')
  const [category,setCategory] =useState('')
  const [image,setImage] = useState('')
  const [quantity,setQuantity] = useState('')
  const [error,setError] = useState({})
  const [isUpdate,setIsUpdate] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  axios.get('http://localhost:9999/categories')
  .then(res => setCategories(res.data))
  .catch(error => console.log(error))
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this product with id: ' + id)) {
        try {
            const response = await axios.delete(`http://localhost:9999/products/${id}`);
            setIsChange(!isChange)
            console.log(response);
        } catch (error) {
            console.error('Error deleting the product:', error);
        }
    }
  }
  const handleView = (id) => {
    const product = products.find(p => p.id === id.toString())
    if(product){
      setId(product.id)
      setTitle(product.title)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setImage(product.image)
      setQuantity(product.quantity)
      setError({})
      setIsViewing(true)
    }
  }
  const handleUpdate = async () => {
    setIsUpdate(true)
    const newErrors = validate()
    if(Object.keys(newErrors).length > 0){
      setError(newErrors)
      return
    }
        try {
            const newProduct = {
                title,
                price,
                description,
                category,
                image,
                rate : 0,
                quantity
            }
             axios.put(`http://localhost:9999/products/${id}`,newProduct)
            .then((response) => {
              console.log(response.data)
              toast.success('Update successfully!')
              setId('')
              setTitle('')
              setPrice('')
              setDescription('')
              setCategory('')
              setImage('')
              setQuantity('')
            })
            
        } catch(error) {
            console.log('Error creating product: ',error)
        }
  }
  const handleCancel = ()=> {
    setIsViewing(false)
    setId('')
    setTitle('')
    setPrice('')
    setDescription('')
    setCategory('')
    setImage('')
    setQuantity('')
  }
  const checkIdExist = (id)=> {
    return products.some(p => p.id === id.toString())
  }
  const validate = ()=> {
    const newErrors = {};
    if(!id) {
      newErrors.id = 'ID required'
    } else if (checkIdExist(id) && isUpdate){
      newErrors.id = 'ID is already exist'
    }

    if(!title) {
      newErrors.title = 'Title is required'
    }
    if(!price || isNaN(price)) {
      newErrors.price = 'Price is required and must be a number'
    }
    if(!description) {
      newErrors.description = 'Description is required'
    }
    if(category === '0'){
      newErrors.category = 'You must choose category of product'
    }
    if(!image){
      newErrors.image = 'Image URL is required'
    }
    if(!quantity || isNaN(quantity)) newErrors.quantity = 'Quantity is required and must be a number'
    return newErrors
  }
  const handleCreate = async () => {
    setIsChange(!isChange)
    const newErrors = validate()
    if(Object.keys(newErrors).length > 0){
      setError(newErrors)
      return
    }
        try {
            const newProduct = {
                id,
                title,
                price,
                description,
                category,
                image,
                rate : 0,
                quantity
            }
            const response = axios.post('http://localhost:9999/products',newProduct)
            console.log((await response).data)
            setId('')
            setTitle('')
            setPrice('')
            setDescription('')
            setCategory('')
            setImage('')
            setQuantity('')
        } catch(error) {
            console.log('Error creating product: ',error)
        }
        
    }
  useEffect(() => {
    axios.get('http://localhost:9999/products')
    .then((res) => {
      if(res.data.length >= 10){
        setPagingProduct(res.data.slice(0,10))
      } else {
        setPagingProduct(res.data.slice(0,res.data.length))
      }
      let pa = []
      let number
      if(res.data.length%10 ===0){
        number = Math.floor(res.data.length/10)
      } else {
        number = Math.floor(res.data.length/10) + 1
      }
      for(let i=1;i<=number;i++){
        pa = [...pa,i]
      }
      setPaging(pa)
      setProducts(res.data)
      setSearchProduct(res.data)
    })
  },[isChange])
  const Pagging = (index) => {
    const currentProducts = searchProduct.length ? searchProduct : products
    if(products.length > index*10){
      setPagingProduct(currentProducts.slice((index-1)*10,index*10))
    } else {
      setPagingProduct(currentProducts.slice((index-1)*10,products.length))
    }
    let pa= [];
    let num;
    if(products.length % 10 ===0){
        num =  Math.floor(currentProducts.length/10)
    } else {
        num = Math.floor(currentProducts.length/10) + 1;
    }
    for(let i=1;i<= num;i++){
        pa = [...pa,i];
    }
    setPaging(pa);
  }
  useEffect(()=> {
    if(searchProduct.length > 10){
        setPagingProduct(searchProduct.slice(0,10));
    } else {
        setPagingProduct(searchProduct.slice(0,searchProduct.length));
    }
    let pa= [];
    let num;
    if(searchProduct.length % 10 ===0){
        num = searchProduct.length/10;
    } else {
        num = searchProduct.length/10 + 1;
    }
    for(let i=1;i<= num;i++){
        pa = [...pa,i];
    }
    setPaging(pa);

},[searchProduct])
  const handleSearchByName = (search) => {
    const searchName = products.filter((p)=> {
      return p.title.toLowerCase().includes(search.current.value.toLowerCase())
    })
    setSearchProduct(searchName)
  }
  const handleFilterByCategory = (e) => {
    const selectedCategory = e.target.value
    if(selectedCategory === "0"){
      setPagingProduct(products.slice(0,10))
      setCategory('0')
    } else {
      const filterProducts = products.filter(p => p.category === selectedCategory)
      setPagingProduct(filterProducts.slice(0, 10)); // Adjust pagination if needed
      setCategory(selectedCategory);
    }
  }
  return (
    <div>
        <Form className='container'>
            <FormGroup>
                <FormLabel>ID</FormLabel>
                <FormControl type='text' value={id} onChange={e => setId(e.target.value)} isInvalid={!!error.id} readOnly={isViewing}></FormControl>
                {error.id && < Alert variant='danger'>{error.id}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl type='text' value={title} onChange={e => setTitle(e.target.value)} isInvalid={!!error.title}></FormControl>
                {error.title && < Alert variant='danger'>{error.title}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Price</FormLabel>
                <FormControl type='text' value={price} onChange={e => setPrice(e.target.value)} isInvalid={!!error.price}></FormControl>
                {error.price && < Alert variant='danger'>{error.price}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl type='textarea' value={description} onChange={e => setDescription(e.target.value)} isInvalid={!!error.description}></FormControl>
                {error.description && < Alert variant='danger'>{error.description}</Alert>}
            </FormGroup>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as='select' value={category} onChange={e => setCategory(e.target.value)} isInvalid={!!error.category}>
                    <option value='0'>Choose category</option>
                    {categories.map((c) => (
                        <option selected={c.name === category ? true : false} value={c.name} key={c.id}>{c.name}</option>
                    ))}
                </Form.Control>
                {error.category && < Alert variant='danger'>{error.category}</Alert>}
            </Form.Group>
            <FormGroup>
                <FormLabel>Image</FormLabel>
                <FormControl type='text' value={image} onChange={e => setImage(e.target.value)} isInvalid={!!error.image}></FormControl>
                {error.image && < Alert variant='danger'>{error.image}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Quantity</FormLabel>
                <FormControl type='text' value={quantity} onChange={e => setQuantity(e.target.value)} isInvalid={!!error.quantity}></FormControl>
                {error.quantity && < Alert variant='danger'>{error.quantity}</Alert>}
            </FormGroup>
            {
              isViewing && (
                <div>
                  <Button className='btn btn-primary' style={{margin: '10px'}} onClick={handleUpdate}>Update</Button>
                  <Button className='btn btn-danger' style={{margin: '10px'}} onClick={handleCancel}>Cancel </Button>
                </div>              
              )
            } 
            {
              !isViewing && (
                <Button className='btn btn-success' style={{margin : '10px'}} onClick={handleCreate}>Create</Button>
              )
            }
        </Form>
        <FormGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <FormControl 
              type='text' 
              placeholder='Enter title to search' 
              ref={search} 
              style={{ fontSize: 18, padding: '10px', flex: 1, marginRight: '10px', border: '1px solid #ced4da', borderRadius: '4px',width: '100px' }} 
              onChange={() => handleSearchByName(search)}
            />
            <FormControl 
              as='select' 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              style={{ flex: 1, height: '50px', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }} onClick={handleFilterByCategory}>
              <option value='0'>Choose all products</option>
              {categories.map((c) => (
                <option value={c.name} key={c.id}>{c.name}</option>
              ))}
            </FormControl>
        </FormGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
              {
                pagingProduct.map((p)=> (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.category}</td>
                    <td>
                      <img src={`${p.image}`} style={{width: '30px'}}></img>
                    </td>
                    <td style={{display:'flex',flexWrap:'wrap'}}>
                      <button className='btn btn-primary' style={{marginRight: '5px'}} onClick={() => handleView(p.id)}>View</button>
                      <button className='btn btn-danger' onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
          
          </tbody>
        </Table>
        <div style={{display: 'flex', justifyContent: 'center', margin:'20px'}}>
          {
            paging.map(p => (
              <Button onClick={() => Pagging(p)}  style={{marginRight:5}} className='btn-success'>{p}</Button>
            ))
          }
        </div>
    </div>
  )
}
