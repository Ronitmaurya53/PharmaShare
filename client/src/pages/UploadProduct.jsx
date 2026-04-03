// import React, { useState } from 'react'
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux'
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import successAlert from '../utils/SuccessAlert';
// import { useEffect } from 'react';

// const UploadProduct = () => {
//   const [data,setData] = useState({
//       name : "",
//       image : [],
//       category : [],
//       subCategory : [],
//       unit : "",
//       stock : "",
//       price : "",
//       discount : "",
//       description : "",
//       more_details : {},
//   })
//   const [imageLoading,setImageLoading] = useState(false)
//   const [ViewImageURL,setViewImageURL] = useState("")
//   const allCategory = useSelector(state => state.product.allCategory)
//   const [selectCategory,setSelectCategory] = useState("")
//   const [selectSubCategory,setSelectSubCategory] = useState("")
//   const allSubCategory = useSelector(state => state.product.allSubCategory)

//   const [openAddField,setOpenAddField] = useState(false)
//   const [fieldName,setFieldName] = useState("")


//   const handleChange = (e)=>{
//     const { name, value} = e.target 

//     setData((preve)=>{
//       return{
//           ...preve,
//           [name]  : value
//       }
//     })
//   }

//   const handleUploadImage = async(e)=>{
//     const file = e.target.files[0]

//     if(!file){
//       return 
//     }
//     setImageLoading(true)
//     const response = await uploadImage(file)
//     const { data : ImageResponse } = response
//     const imageUrl = ImageResponse.data.url 

//     setData((preve)=>{
//       return{
//         ...preve,
//         image : [...preve.image,imageUrl]
//       }
//     })
//     setImageLoading(false)

//   }

//   const handleDeleteImage = async(index)=>{
//       data.image.splice(index,1)
//       setData((preve)=>{
//         return{
//             ...preve
//         }
//       })
//   }

//   const handleRemoveCategory = async(index)=>{
//     data.category.splice(index,1)
//     setData((preve)=>{
//       return{
//         ...preve
//       }
//     })
//   }
//   const handleRemoveSubCategory = async(index)=>{
//       data.subCategory.splice(index,1)
//       setData((preve)=>{
//         return{
//           ...preve
//         }
//       })
//   }

//   const handleAddField = ()=>{
//     setData((preve)=>{
//       return{
//           ...preve,
//           more_details : {
//             ...preve.more_details,
//             [fieldName] : ""
//           }
//       }
//     })
//     setFieldName("")
//     setOpenAddField(false)
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     console.log("data",data)

//     try {
//       const response = await Axios({
//           ...SummaryApi.createProduct,
//           data : data
//       })
//       const { data : responseData} = response

//       if(responseData.success){
//           successAlert(responseData.message)
//           setData({
//             name : "",
//             image : [],
//             category : [],
//             subCategory : [],
//             unit : "",
//             stock : "",
//             price : "",
//             discount : "",
//             description : "",
//             more_details : {},
//           })

//       }
//     } catch (error) {
//         AxiosToastError(error)
//     }


//   }

//   // useEffect(()=>{
//   //   successAlert("Upload successfully")
//   // },[])
//   return (
//     <section className='' >
//         <div className='p-2   bg-white shadow-md flex items-center justify-between'>
//             <h2 className='font-semibold'>Upload Product</h2>
//         </div>
//         <div className='grid p-3'>
//             <form className='grid gap-4' onSubmit={handleSubmit}>
//                 <div className='grid gap-1'>
//                   <label htmlFor='name' className='font-medium'>Name</label>
//                   <input 
//                     id='name'
//                     type='text'
//                     placeholder='Enter product name'
//                     name='name'
//                     value={data.name}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>
//                 <div className='grid gap-1'>
//                   <label htmlFor='description' className='font-medium'>Description</label>
//                   <textarea 
//                     id='description'
//                     type='text'
//                     placeholder='Enter product description'
//                     name='description'
//                     value={data.description}
//                     onChange={handleChange}
//                     required
//                     multiple 
//                     rows={3}
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
//                   />
//                 </div>
//                 <div>
//                     <p className='font-medium'>Image</p>
//                     <div>
//                       <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
//                           <div className='text-center flex justify-center items-center flex-col'>
//                             {
//                               imageLoading ?  <Loading/> : (
//                                 <>
//                                    <FaCloudUploadAlt size={35}/>
//                                    <p>Upload Image</p>
//                                 </>
//                               )
//                             }
//                           </div>
//                           <input 
//                             type='file'
//                             id='productImage'
//                             className='hidden'
//                             accept='image/*'
//                             onChange={handleUploadImage}
//                           />
//                       </label>
//                       {/**display uploded image*/}
//                       <div className='flex flex-wrap gap-4'>
//                         {
//                           data.image.map((img,index) =>{
//                               return(
//                                 <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
//                                   <img
//                                     src={img}
//                                     alt={img}
//                                     className='w-full h-full object-scale-down cursor-pointer' 
//                                     onClick={()=>setViewImageURL(img)}
//                                   />
//                                   <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
//                                     <MdDelete/>
//                                   </div>
//                                 </div>
//                               )
//                           })
//                         }
//                       </div>
//                     </div>

//                 </div>
//                 <div className='grid gap-1'>
//                   <label className='font-medium'>Category</label>
//                   <div>
//                     <select
//                       className='bg-blue-50 border w-full p-2 rounded'
//                       value={selectCategory}
//                       onChange={(e)=>{
//                         const value = e.target.value 
//                         const category = allCategory.find(el => el._id === value )
                        
//                         setData((preve)=>{
//                           return{
//                             ...preve,
//                             category : [...preve.category,category],
//                           }
//                         })
//                         setSelectCategory("")
//                       }}
//                     >
//                       <option value={""}>Select Category</option>
//                       {
//                         allCategory.map((c,index)=>{
//                           return(
//                             <option value={c?._id}>{c.name}</option>
//                           )
//                         })
//                       }
//                     </select>
//                     <div className='flex flex-wrap gap-3'>
//                       {
//                         data.category.map((c,index)=>{
//                           return(
//                             <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                               <p>{c.name}</p>
//                               <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
//                                 <IoClose size={20}/>
//                               </div>
//                             </div>
//                           )
//                         })
//                       }
//                     </div>
//                   </div>
//                 </div>
//                 <div className='grid gap-1'>
//                   <label className='font-medium'>Sub Category</label>
//                   <div>
//                     <select
//                       className='bg-blue-50 border w-full p-2 rounded'
//                       value={selectSubCategory}
//                       onChange={(e)=>{
//                         const value = e.target.value 
//                         const subCategory = allSubCategory.find(el => el._id === value )

//                         setData((preve)=>{
//                           return{
//                             ...preve,
//                             subCategory : [...preve.subCategory,subCategory]
//                           }
//                         })
//                         setSelectSubCategory("")
//                       }}
//                     >
//                       <option value={""} className='text-neutral-600'>Select Sub Category</option>
//                       {
//                         allSubCategory.map((c,index)=>{
//                           return(
//                             <option value={c?._id}>{c.name}</option>
//                           )
//                         })
//                       }
//                     </select>
//                     <div className='flex flex-wrap gap-3'>
//                       {
//                         data.subCategory.map((c,index)=>{
//                           return(
//                             <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                               <p>{c.name}</p>
//                               <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
//                                 <IoClose size={20}/>
//                               </div>
//                             </div>
//                           )
//                         })
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='unit' className='font-medium'>Unit</label>
//                   <input 
//                     id='unit'
//                     type='text'
//                     placeholder='Enter product unit'
//                     name='unit'
//                     value={data.unit}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='stock' className='font-medium'>Number of Stock</label>
//                   <input 
//                     id='stock'
//                     type='number'
//                     placeholder='Enter product stock'
//                     name='stock'
//                     value={data.stock}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='price' className='font-medium'>Price</label>
//                   <input 
//                     id='price'
//                     type='number'
//                     placeholder='Enter product price'
//                     name='price'
//                     value={data.price}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='discount' className='font-medium'>Discount</label>
//                   <input 
//                     id='discount'
//                     type='number'
//                     placeholder='Enter product discount'
//                     name='discount'
//                     value={data.discount}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>


//                 {/**add more field**/}
//                   {
//                     Object?.keys(data?.more_details)?.map((k,index)=>{
//                         return(
//                           <div className='grid gap-1'>
//                             <label htmlFor={k} className='font-medium'>{k}</label>
//                             <input 
//                               id={k}
//                               type='text'
//                               value={data?.more_details[k]}
//                               onChange={(e)=>{
//                                   const value = e.target.value 
//                                   setData((preve)=>{
//                                     return{
//                                         ...preve,
//                                         more_details : {
//                                           ...preve.more_details,
//                                           [k] : value
//                                         }
//                                     }
//                                   })
//                               }}
//                               required
//                               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                             />
//                           </div>
//                         )
//                     })
//                   }

//                 <div onClick={()=>setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//                   Add Fields
//                 </div>

//                 <button
//                   className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
//                 >
//                   Submit
//                 </button>
//             </form>
//         </div>

//         {
//           ViewImageURL && (
//             <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
//           )
//         }

//         {
//           openAddField && (
//             <AddFieldComponent 
//               value={fieldName}
//               onChange={(e)=>setFieldName(e.target.value)}
//               submit={handleAddField}
//               close={()=>setOpenAddField(false)} 
//             />
//           )
//         }
//     </section>
//   )
// }

// export default UploadProduct
import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data,setData] = useState({
      name : "",
      image : [],
      category : [],
      subCategory : [],
      unit : "",
      stock : "",
      price : "",
      discount : "",
      description : "",
      more_details : {},
  });
  const [imageLoading,setImageLoading] = useState(false);
  const [ViewImageURL,setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [selectCategory,setSelectCategory] = useState("");
  const [selectSubCategory,setSelectSubCategory] = useState("");
  const [openAddField,setOpenAddField] = useState(false);
  const [fieldName,setFieldName] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async e => {
    const file = e.target.files[0];
    if(!file) return;
    setImageLoading(true);
    try {
      const response = await uploadImage(file);
      const imageUrl = response.data.data.url;
      setData(prev => ({ ...prev, image: [...prev.image, imageUrl] }));
    } catch(err) {
      console.error(err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = index => {
    setData(prev => ({ ...prev, image: prev.image.filter((_,i)=>i!==index) }));
  };

  const handleRemoveCategory = index => {
    setData(prev => ({ ...prev, category: prev.category.filter((_,i)=>i!==index) }));
  };

  const handleRemoveSubCategory = index => {
    setData(prev => ({ ...prev, subCategory: prev.subCategory.filter((_,i)=>i!==index) }));
  };

  const handleAddField = () => {
    if(!fieldName) return;
    setData(prev => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" }
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting:", data);
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data });
      console.log(response.data);
      const success = response.data?.data?.success || response.data?.success;
      const message = response.data?.data?.message || response.data?.message;
      if(success){
        successAlert(message);
        setData({
          name : "", image : [], category : [], subCategory : [], unit : "",
          stock : "", price : "", discount : "", description : "", more_details : {},
        });
      }
    } catch(err){
      AxiosToastError(err);
    }
  };

  const handleSelect = (value, all, key) => {
    if(!value) return;
    const selectedItem = all.find(el => el._id === value);
    if(selectedItem){
      setData(prev => ({
        ...prev,
        [key]: prev[key].some(item => item._id === selectedItem._id) 
               ? prev[key] 
               : [...prev[key], selectedItem]
      }));
    }
  };

  return (
    <section className='p-4 md:p-8 bg-gray-50 min-h-screen'>
      <div className='flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded shadow-md mb-6'>
        <h2 className='text-xl md:text-2xl font-bold'>Upload Product</h2>
      </div>

      <form className='grid gap-6 bg-white p-6 rounded-xl shadow-lg' onSubmit={handleSubmit}>

        {/* Name & Description */}
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='grid gap-1'>
            <label className='font-medium text-gray-700'>Name</label>
            <input type='text' name='name' value={data.name} onChange={handleChange}
              placeholder='Enter product name'
              className='p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none'
              required
            />
          </div>
          <div className='grid gap-1'>
            <label className='font-medium text-gray-700'>Description</label>
            <textarea name='description' value={data.description} onChange={handleChange}
              placeholder='Enter product description' rows={3}
              className='p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none resize-none'
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className='grid gap-2'>
          <p className='font-medium text-gray-700'>Images</p>
          <label htmlFor='productImage' className='flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 p-6 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition'>
            { imageLoading ? <Loading /> : <><FaCloudUploadAlt size={40} className='text-indigo-500'/><p className='mt-2 text-gray-600'>Click to upload</p></> }
            <input type='file' id='productImage' className='hidden' accept='image/*' onChange={handleUploadImage}/>
          </label>
          <div className='flex flex-wrap gap-4 mt-2'>
            {data.image.map((img, index) => (
              <div key={index} className='relative w-24 h-24 rounded-lg overflow-hidden shadow-lg group'>
                <img src={img} alt='product' className='w-full h-full object-cover cursor-pointer' onClick={()=>setViewImageURL(img)} />
                <button type='button' onClick={()=>handleDeleteImage(index)}
                  className='absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition'>
                  <MdDelete/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category & SubCategory */}
        <div className='grid md:grid-cols-2 gap-4'>
          {[
            { label:"Category", select: selectCategory, setSelect:setSelectCategory, all: allCategory, list: data.category, remove: handleRemoveCategory, key:"category" },
            { label:"Sub Category", select: selectSubCategory, setSelect:setSelectSubCategory, all: allSubCategory, list: data.subCategory, remove: handleRemoveSubCategory, key:"subCategory" }
          ].map(({label, select, setSelect, all, list, remove, key}, i)=>(
            <div key={i} className='grid gap-1'>
              <label className='font-medium text-gray-700'>{label}</label>
              <select
                value={select}
                onChange={e=>{
                  handleSelect(e.target.value, all, key)
                  setSelect("")
                }}
                className='p-3 bg-gray-100 border rounded-lg w-full'
              >
                <option value="">Select {label}</option>
                {all.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <div className='flex flex-wrap gap-2 mt-2'>
                {list.map((c,index)=>(
                  <div key={index} className='flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm'>
                    {c.name} <IoClose className='cursor-pointer hover:text-red-500' onClick={()=>remove(index)}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Unit, Stock, Price, Discount */}
        <div className='grid md:grid-cols-4 gap-4'>
          {["unit","stock","price","discount"].map((field, i)=>(
            <div key={i} className='grid gap-1'>
              <label className='font-medium text-gray-700'>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
              <input type={field==="unit"?"text":"number"} name={field} value={data[field]} onChange={handleChange}
                placeholder={`Enter ${field}`} className='p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none'
                required
              />
            </div>
          ))}
        </div>

        {/* More Details */}
        {Object.keys(data.more_details).map((k, i)=>(
          <div key={i} className='grid gap-1'>
            <label className='font-medium text-gray-700'>{k}</label>
            <input type='text' value={data.more_details[k]} onChange={e=>{
              const val = e.target.value
              setData(prev=>({ ...prev, more_details: {...prev.more_details, [k]: val} }))
            }} className='p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none' required/>
          </div>
        ))}

        <div onClick={()=>setOpenAddField(true)} className='w-36 py-2 text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg cursor-pointer transition'>
          + Add Field
        </div>

        <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-bold mt-4 transition'>
          Submit Product
        </button>
      </form>

      {ViewImageURL && <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>}
      {openAddField && <AddFieldComponent value={fieldName} onChange={(e)=>setFieldName(e.target.value)} submit={handleAddField} close={()=>setOpenAddField(false)} />}
    </section>
  )
}

export default UploadProduct;
