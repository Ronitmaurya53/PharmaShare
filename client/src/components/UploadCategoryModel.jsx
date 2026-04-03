
import React, { useState, useRef } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({close, fetchData}) => {
  const [data,setData] = useState({ name: "", image: "" });
  const [loading,setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleUploadCategoryImage = async (file) => {
    if (!file) return;

    try {
      setLoading(true)
      const response = await uploadImage(file)
      const imageUrl = response.data?.data?.url || response.data?.url || ""
      setData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Upload failed", error)
      toast.error("Image upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    handleUploadCategoryImage(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragover" || e.type === "dragenter") setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadCategoryImage(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data.name || !data.image) return

    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.addCategory, data })
      const { data: resData } = response
      if (resData.success) {
        toast.success(resData.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50'>
      <div className=' max-w-4xl w-full p-4 rounded relative' style={{ backgroundColor: 'rgb(4, 4, 49)' }}>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold' >Add Category</h1>
          <button onClick={close} className='w-fit block ml-auto'>
            <IoClose size={25}/>
          </button>
        </div>

        <form className='my-3 grid gap-4' onSubmit={handleSubmit}>

          {/* Name input */}
          <div className='grid gap-1'>
            <label>Name</label>
            <input
              type='text'
              placeholder='Enter category name'
              value={data.name}
              name='name'
              onChange={handleOnChange}
              className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
            />
          </div>

          {/* Image upload */}
          <div 
            className={`border-2 border-dashed rounded p-4 flex flex-col items-center justify-center
              ${dragActive ? "border-primary-200 bg-primary-50" : "border-blue-200 bg-blue-50"}`}
            onDragEnter={handleDrag} 
            onDragOver={handleDrag} 
            onDragLeave={handleDrag} 
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            {data.image ? (
              <img alt='category' src={data.image} className='w-48 h-48 object-scale-down rounded'/>
            ) : (
              <p className='text-neutral-500 text-center'>Drag & Drop or Click to Upload Image</p>
            )}
            <input 
              ref={inputRef} 
              type='file' 
              className='hidden' 
              onChange={handleFileInputChange} 
              accept="image/*"
            />
          </div>

          {/* Submit button */}
          <button
            type='submit'
            disabled={!data.name || !data.image || loading}
            className={`py-2 font-semibold rounded text-white
              ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 cursor-not-allowed"}`}
          >
            {loading ? "Uploading..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default UploadCategoryModel
