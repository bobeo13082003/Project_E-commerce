import React, { useEffect, useRef, useState } from 'react'
import { Table,FormGroup,FormControl,FormLabel,Alert,Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function ManageAccount() {
    // all account
    const [accounts,setAccounts] = useState([])
    // all account on page
    const [pagingAccount,setPagingAccount] = useState([])
    // all search account
    const [searchAccount,setSearchAccount] = useState([])
     // array paging
    const [paging,setPaging] = useState([])
    //search
     const search = useRef('')
    const [id,setId] = useState('')
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [role,setRole] = useState('')
    const [error,setError] = useState({})
    const [isUpdate,setIsUpdate] =useState(false)
    const [isChange,setIsChange] = useState(true)
    const [isViewing, setIsViewing] = useState(false)
    axios.get('http://localhost:9999/accounts')
    .then((res) => {
        setAccounts(res.data)
    })
    .catch(error => console.log(error))
    const checkIdExist = (id)=> {
        return accounts.some(a => a.id === id.toString())
    }
    const checkUserNameExist = (username) => {
        return accounts.some(a => a.username === username.toString())
    }
      const validate = ()=> {
        const newErrors = {};
        if(!id) {
          newErrors.id = 'ID required'
        } else if (checkIdExist(id) && !isUpdate){
          newErrors.id = 'ID is already exist'
        }
    
        if(!username) {
          newErrors.username = 'Username is required'
        } else if (checkUserNameExist(username) && !isUpdate){
            newErrors.username = 'Username is already exist'
          }
        if(!password) {
            newErrors.password = 'Password is required'
        }
        if(!confirmPassword){
            newErrors.confirmPassword = 'Confirm password is required'
        } 
        if(confirmPassword !== password){
            newErrors.confirmPassword = 'Confirm password is wrong, please enter again'
        }
        if (role === '0' || !role) {
            newErrors.role = 'You must choose type of actor';
          }

        return newErrors
      }
    const handleView = (id)=> {
        const account = accounts.find(a => a.id === id.toString())
        if(account){
        setId(account.id)
        setUserName(account.username)
        setPassword(account.password)
        setConfirmPassword(account.password)
        setRole(account.role)
        setError({})
        setIsViewing(true)
        }
    }
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure to delete this account with id: ' + id)) {
            try {
                const response = await axios.delete(`http://localhost:9999/accounts/${id}`);
                setIsChange(!isChange)
                console.log(response)
                toast.success('Delete account success')
            } catch (error) {
                console.error('Error deleting the account:', error);
            }
        }
    }

    const handleCreate = async () => {
        setIsChange(!isChange)
        const newErrors = validate()
        if(Object.keys(newErrors).length > 0){
            setError(newErrors)
            return
        }
        let roleValue = role;
        if (role === '1') {
            roleValue = 'admin';
        } else if (role === '2') {
            roleValue = 'user';
        }
            try {
                const newAccount = {
                    id,
                    username,
                    password,
                    role : roleValue
                }
                axios.post('http://localhost:9999/accounts',newAccount)
                .then((response) => {
                    console.log(response.data)
                    toast.success('Create new account successfully!')
                    setId('')
                    setUserName('')
                    setPassword('')
                    setConfirmPassword('')
                    setRole('')
                    setError({})
                })        
            } catch(error) {
                console.log('Error creating product: ',error)
            }
    }
    const handleUpdate = async () => {
        setIsUpdate(true)
        const newErrors = validate()
        if(Object.keys(newErrors).length > 0){
          setError(newErrors)
          return
        }
        let roleValue = role;
        if (role === '1') {
            roleValue = 'admin';
        } else if (role === '2') {
            roleValue = 'user';
        }
            try {
                const newAccount = {
                    id,
                    username,
                    password,
                    role : roleValue
                }
                 axios.put(`http://localhost:9999/accounts/${id}`,newAccount)
                .then((response) => {
                  console.log(response.data)
                  toast.success('Update successfully!')
                  setId('')
                  setUserName('')
                    setPassword('')
                    setConfirmPassword('')
                    setRole('')
                    setError({})
                })
                
            } catch(error) {
                console.log('Error creating product: ',error)
            }
      }
    
    const handleCancel = () => {
        setIsViewing(false)
        setId('')
        setUserName('')
        setPassword('')
        setConfirmPassword('')
        setRole('')
        setError({})
        setIsUpdate(false)
    }
    useEffect(() => {
        axios.get('http://localhost:9999/accounts')
        .then((res) => {
          if(res.data.length >= 10){
            setPagingAccount(res.data.slice(0,10))
            console.log(res.data)
          } else {
            setPagingAccount(res.data.slice(0,res.data.length))
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
          setAccounts(res.data)
          setSearchAccount(res.data)
        })
      },[isChange])
      const Pagging = (index) => {
        const currentAccounts = searchAccount.length ? searchAccount : accounts
        if(accounts.length > index*10){
          setPagingAccount(currentAccounts.slice((index-1)*10,index*10))
        } else {
          setPagingAccount(currentAccounts.slice((index-1)*10,accounts.length))
        }
        let pa= [];
        let num;
        if(accounts.length % 10 ===0){
            num =  Math.floor(currentAccounts.length/10)
        } else {
            num = Math.floor(currentAccounts.length/10) + 1;
        }
        for(let i=1;i<= num;i++){
            pa = [...pa,i];
        }
        setPaging(pa);
      }
      useEffect(()=> {
        if(searchAccount.length > 10){
            setPagingAccount(searchAccount.slice(0,10));
        } else {
            setPagingAccount(searchAccount.slice(0,searchAccount.length));
        }
        let pa= [];
        let num;
        if(searchAccount.length % 10 ===0){
            num = searchAccount.length/10;
        } else {
            num = searchAccount.length/10 + 1;
        }
        for(let i=1;i<= num;i++){
            pa = [...pa,i];
        }
        setPaging(pa);
    
    },[searchAccount])
      const handleSearchByName = (search) => {
        const searchName = accounts.filter((p)=> {
          return p.username.toLowerCase().includes(search.current.value.toLowerCase())
        })
        setSearchAccount(searchName)
      }
  return (
    <div className='container'>
        <FormGroup>
                <FormLabel>ID</FormLabel>
                <FormControl type='text' value={id} onChange={e => setId(e.target.value)} isInvalid={!!error.id} readOnly={isViewing}></FormControl>
                {error.id && < Alert variant='danger'>{error.id}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormControl type='text' value={username} onChange={e => setUserName(e.target.value)} isInvalid={!!error.username}></FormControl>
                {error.username && < Alert variant='danger'>{error.username}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type='password' value={password} onChange={e => setPassword(e.target.value)} isInvalid={!!error.password}></FormControl>
                {error.password && < Alert variant='danger'>{error.password}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} isInvalid={!!error.confirmPassword}></FormControl>
                {error.confirmPassword && < Alert variant='danger'>{error.confirmPassword}</Alert>}
            </FormGroup>
            <FormGroup>
                <FormLabel>Choose actor</FormLabel>
                <FormControl as='select' value={role} onChange={e => setRole(e.target.value)} isInvalid={!!error.role}>
                    <option value='0'>Choose actor</option>
                    <option selected ={role === 'admin' ? true : false} value='admin'>Admin</option>
                    <option selected ={role === 'user' ? true : false} value='user'>User</option>
                </FormControl>
                {error.role && < Alert variant='danger'>{error.role}</Alert>}
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
            <FormGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
                <FormControl 
                type='text' 
                placeholder='Enter username to search' 
                ref={search} 
                style={{ fontSize: 18, padding: '10px', flex: 1, marginRight: '10px', border: '1px solid #ced4da', borderRadius: '4px',width: '100px' }} 
                onChange={() => handleSearchByName(search)}
                />
            </FormGroup>  
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th style={{width:'40%'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                pagingAccount.map((a) => (
                    <tr key={a.id}>
                        <td style={{width : '5%'}}>{a.id}</td>
                        <td>{a.username}</td>
                        <td>{a.password}</td>
                        <td style={{color : a.role === 'user' ? 'blue' : 'green'}}>{a.role}</td>
                        <td style={{display:'flex',flexWrap:'wrap',width: '40%'}}>
                            <button className='btn btn-primary' style={{marginRight: '5px'}} onClick={() => handleView(a.id)}>View</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(a.id)}>Delete</button>
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
