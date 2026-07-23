import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import isAdmin from '../utils/isAdmin'

// Importing beautiful icons for the menu
import { 
  HiOutlineExternalLink, 
  HiOutlineViewGrid, 
  HiOutlineViewList, 
  HiOutlineUpload, 
  HiOutlineCube, 
  HiOutlineShoppingBag, 
  HiOutlineLocationMarker, 
  HiOutlineLogout 
} from "react-icons/hi";

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          if(response.data.success){
            if(close) close();
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close) close();
   }

   // Common styling class for links to keep code clean
   const linkStyle = "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-all duration-200";

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-w-64">
        {/* Profile Section */}
        <div className="mb-4 px-2">
            <div className='text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1'>My Account</div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='text-lg font-semibold text-gray-800 max-w-40 text-ellipsis line-clamp-1'>
                        {user.name || user.mobile} 
                    </span>
                    {user.role === "ADMIN" && (
                        <span className='text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>Admin</span>
                    )}
                </div>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors'>
                    <HiOutlineExternalLink size={18}/>
                </Link>
            </div>
        </div>

        <Divider/>

        {/* Menu Items Section */}
        <div className='text-sm grid gap-1 mt-3'>
            {isAdmin(user.role) && (
                <>
                    <Link onClick={handleClose} to={"/dashboard/category"} className={linkStyle}>
                        <HiOutlineViewGrid size={20} />
                        Category
                    </Link>

                    <Link onClick={handleClose} to={"/dashboard/subcategory"} className={linkStyle}>
                        <HiOutlineViewList size={20} />
                        Sub Category
                    </Link>

                    <Link onClick={handleClose} to={"/dashboard/upload-product"} className={linkStyle}>
                        <HiOutlineUpload size={20} />
                        Upload Product
                    </Link>

                    <Link onClick={handleClose} to={"/dashboard/product"} className={linkStyle}>
                        <HiOutlineCube size={20} />
                        Product
                    </Link>
                </>
            )}

            <Link onClick={handleClose} to={"/dashboard/myorders"} className={linkStyle}>
                <HiOutlineShoppingBag size={20} />
                My Orders
            </Link>

            <Link onClick={handleClose} to={"/dashboard/address"} className={linkStyle}>
                <HiOutlineLocationMarker size={20} />
                Save Address
            </Link>

            {/* Logout Button (Special Styling) */}
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-3 px-3 py-2 mt-2 font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 text-left w-full"
            >
                <HiOutlineLogout size={20} />
                Log Out
            </button>
        </div>
    </div>
  )
}

export default UserMenu