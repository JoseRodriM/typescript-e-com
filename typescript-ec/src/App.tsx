import './App.css'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios'
import ProductoItem from './Main/ProductoItem/ProductoItem'
import { categoryTypes, productsType, categoryProdctsList, createUserType, login, createProduct } from './helpers/interfaces'
import NavBar from './CategoriesListTitles/CategoriesListTitles'
import CategoryList from './Main/CategoryList/CategoryList'

function App() {
  const [productos, setProductos] = useState<productsType[]>([])
  const [pages, setPages] = useState<number>(0)
  const [categories, setCategories] = useState<categoryTypes[]>([])
  const [categoryProducts, setCategoryProducts] = useState<categoryProdctsList[]>([])
  const [regOrLog, setRegOrLog] = useState<boolean>(true)
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<number>(0)
  const { register, handleSubmit } = useForm<createUserType>()
  const { register: register2, handleSubmit: handleSubmit2 } = useForm<login>()
  const { register: register3, handleSubmit: handleSubmit3, reset } = useForm<createProduct>()
  const nextPage = () => {
    setPages(pages + 10)
    window.scrollTo(0, 0)
  }
  const previousPage = () => {
    setPages(pages - 10)
    window.scrollTo(0, 0)
  }
  const getCategory = (id: number) => {
    setCategory(id)
  }
  const getData = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${pages}&limit=15`)
      const data: [] = await response.data
      setProductos(data)
    } catch (error) {
      console.log(error)
    }
  }
  const getCategoryList = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category}/products`)
      const data: [] = await response.data
      setCategoryProducts(data)
    } catch (error) {
      console.log(error)
    }

  }
  const getCategories = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/`)
      const data: [] = await response.data
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit: SubmitHandler<createUserType> = async (data) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', data)
      setName(response.data.name)
      alert(`Logged in as ${response.data.name}`)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitLogin: SubmitHandler<login> = async (data) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
      setName(response.data.name)
      alert(`Logged in as ${response.data.name}`)
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmitCreate: SubmitHandler<createProduct> = async (data) => {
    const newProduct = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      images: [...data.images]
    }
    try {
      console.log(data)
      const response = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct)
      console.log(response)
      alert('Created correctly')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategoryList()
  }, [category])
  useEffect(() => {
    getData()
  }, [pages])
  useEffect(() => {
    getData()
    getCategories()
  }, [])
  return (
    <div className="App">
      {productos.length !== 0 ?
        <div>
          <a href="/">Home</a>
          <div>
            {name == '' ?
              regOrLog ?
                <div>
                  <div className='form-title' ><h2>Register or</h2><button onClick={() => setRegOrLog(!regOrLog)}>Login</button></div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name:</label>
                    <input {...register('name')} id='name' type="text" name='name' placeholder='Jose' />
                    <label htmlFor="email">Email:</label>
                    <input {...register('email')} id='email' type="text" name='email' placeholder='example@example.com' />
                    <label htmlFor="avatar">Avatar URL:</label>
                    <input {...register('avatar')} id='avatar' type="text" name='avatar' placeholder='https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png' />
                    <label htmlFor="password">Password:</label>
                    <input {...register('password')} id='password' type="password" name='password' />
                    <input type="submit" value='Register' />
                  </form>
                </div> :
                <div>
                  <div className='form-title' ><h2>Login or</h2><button onClick={() => setRegOrLog(!regOrLog)}>Register</button></div>
                  <form onSubmit={handleSubmit2(onSubmitLogin)}>
                    <label htmlFor="email">Email:</label>
                    <input {...register2('email')} id='emaillogin' type="text" name='email' placeholder='example@example.com' />
                    <label htmlFor="password">Password:</label>
                    <input {...register2('password')} id='passwordlogin' type="password" name='password' />
                    <input type="submit" value='Log in' />
                  </form>
                </div>
              : <div><h2>Welcome {name}</h2><button onClick={() => setName('')}>Log Out</button></div>}
          </div>
          <div>
            <ul className='categories-container'>
              {categories.map((cate, i) => <li key={i}><NavBar getCategory={getCategory} {...cate} /></li>)}
            </ul>
          </div>
          {categoryProducts.length > 0 ? <div>
            <ul className='lista-contenedor'>
              {categoryProducts.map((productCat, i) => <li key={i}><CategoryList {...productCat} /></li>)}
            </ul>
          </div> :
            <div>
              <div className='botones'>
                {pages > 0 ? <button onClick={() => previousPage()}>Previous</button> : ''}
                {productos.length >= 15 ? <button onClick={() => nextPage()}>Next</button> : ''}
              </div>
              {name !== '' ? <div><form onSubmit={handleSubmit3(onSubmitCreate)}>
                <label htmlFor="title">Title:</label>
                <input {...register3('title')} id='title' type="text" name='title' placeholder='Red nike shoes' />
                <label htmlFor="password">Price:</label>
                <input {...register3('price')} id='price' type="number" name='price' placeholder='55' />
                <label htmlFor="description">Description:</label>
                <input {...register3('description')} id='description' type="text" name='description' placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                <label htmlFor="categoryId">Category id:</label>
                <input {...register3('categoryId')} id='categoryId' type="number" name='categoryId' placeholder="3" />
                <label htmlFor="categoryid">Image url:</label>
                <input {...register3('images')} id='categoryid' type="text" name='categoryid' placeholder="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" />
                <div>
                  <input type="reset" value="Reset" />
                  <input type="submit" value='Create' />
                </div>
              </form></div> : ''}
              <ul className='lista-contenedor'>
                {productos.map((prod, i) => <li key={i}>{<ProductoItem  {...prod} />}</li>)}
              </ul>
              <div className='botones'>
                {pages > 0 ? <button onClick={() => previousPage()}>Previous</button> : ''}
                {productos.length >= 15 ? <button onClick={() => nextPage()}>Next</button> : ''}
              </div>
            </div>}
        </div>
        : <div>Loading...</div>}
    </div>
  )
}
export default App
