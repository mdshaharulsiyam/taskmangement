import React, { useContext, useEffect, useState } from 'react'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import ProductCard from '../Shered/ProductsCard/ProductCard'
import SectionHeading from '../../Components/SectionHeading/SectionHeading'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData } from 'react-router-dom'
import useGetallProducts from '../../Hooks/useGetallProducts'
import { FrankStoreData } from '../../Context/FrankStoreContext'
const Products = () => {
    const axiosrequest = useAxiosrequest()
    const [loading, setloading] = useState(true)
    const [categoryData, setCategoryData] = useState([])
    const { data } = useLoaderData()
    const {seacrhValue, setSearchValue,categoryFilter, setCategoryFilter}=useContext(FrankStoreData)
    // products filter states 
    const [sortBy, setSortby] = useState('none')
    const [sortValue, setSortValue] = useState('none')
    // const [seacrhValue, setSearchValue] = useState('')
    const [pageNumber, setPageNumber] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(20)
    const totalPages = Math.ceil(data / itemPerPage)
    const pages = [...Array(totalPages).keys()];
    useEffect(() => {
        setloading(true)
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    const [allproducts] = useGetallProducts(categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage, setloading)

    const handelCategory = (category) => {
        setloading(true)
        setCategoryFilter(category)
    }
    return (
        <div className='container mx-auto py-10'>
            <SectionHeading topheadin='Categories' heading='Browse By Category'></SectionHeading>
            <div className="md:block hidden cursor-pointer my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={6} spaceBetween={10} handelCategory={handelCategory} />

            </div>
            <div className="sm:block md:hidden hidden my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={4} spaceBetween={10} handelCategory={handelCategory} />
            </div>
            <div className="block sm:hidden my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={2} spaceBetween={10} handelCategory={handelCategory} />
            </div>
            <div className='lg:flex justify-start items-end gap-6'>
                <SectionHeading topheadin='Products' heading={`${categoryFilter}`}></SectionHeading>
                <span className='flex justify-between grow pb-[6px]'>
                    <span>
                        <select onInput={(e) => {
                            setloading(true)
                            setSortby(e.target.value)
                            }} className=" rounded py-1 px-3 border-2 border-black">
                            <option value={'none'} selected>none</option>
                            <option value={'price'}>price</option>
                            <option value={'mostsale'}>most sale</option>
                        </select>
                        {
                            (sortBy === 'price') && <select onInput={(e) => {
                                setloading(true)
                                setSortValue(e.target.value)
                                }} className=" rounded py-1 px-3 border-2 border-black ml-2">
                                <option value={'LTH'} >low to high</option>
                                <option value={'HTL'} selected>high to low</option>
                            </select>
                        }

                    </span>
                    <span className='flex justify-start items-center border-2 border-black'>
                        <input onKeyUp={(e) => {
                            setloading(true)
                            setSearchValue(e.target.value)
                            }} type="text" placeholder="Search" className="outline-none active:outline-none active:border-none p-2 w-full max-w-xs" />
                        <button className='rounded-none hover:text-blue-600 active:scale-95'><FaSearch /></button>
                    </span>
                </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 py-3 relative">
                {
                    allproducts.map(item => <ProductCard key={item._id} item={item} />)
                }
                {
                    loading && <span className="loading loading-bars loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }
            </div>
            <span className='flex justify-center flex-wrap gap-5 items-center mt-6'>
                <div className="flex justify-center space-x-1 dark:text-gray-100">
                    <button className=' text-sm font-semibold border hover:text-blue-600 rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400'>
                        <FaArrowLeft />
                    </button>
                    {
                        pages.map(item => <button onClick={() => {
                            setloading(true)
                            setPageNumber(item)
                        }} key={item} type="button" title="Page 1" className="inline-flex items-center hover:text-blue-600 justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">{item + 1}</button>)
                    }
                    <button className=' text-sm font-semibold border rounded shadow-md hover:text-blue-600 dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400'>
                        <FaArrowRight />
                    </button>
                </div>
                <select onChange={(e) => {
                    setloading(true)
                    setItemPerPage(e.target.value)
                    setPageNumber(0)
                }} className=" rounded py-1 px-3 border-2 border-black">
                    <option value={20} selected>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </span>
        </div>
    )
}

export default Products
