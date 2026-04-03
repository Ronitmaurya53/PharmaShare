import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  return (
    <div className='p-4 md:p-8 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg p-4 mb-6 shadow-md flex items-center justify-between'>
        <h1 className='text-xl md:text-2xl font-bold'>My Orders</h1>
        <span className='text-sm md:text-base'>{orders.length} Orders</span>
      </div>

      {/* No Orders */}
      { !orders.length && <NoData/> }

      {/* Orders List */}
      <div className='grid gap-4'>
        {orders.map((order, index) => (
          <div key={order._id+index} className='bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            
            {/* Left: Product Info */}
            <div className='flex items-center gap-4'>
              <img 
                src={order.product_details.image[0]} 
                alt={order.product_details.name}
                className='w-20 h-20 object-cover rounded-lg shadow-sm'
              />
              <div>
                <p className='font-semibold text-gray-800'>{order.product_details.name}</p>
                <p className='text-gray-500 text-sm'>Order No: <span className='font-medium'>{order.orderId}</span></p>
                <p className='text-gray-500 text-sm'>Quantity: <span className='font-medium'>{order.quantity || 1}</span></p>
              </div>
            </div>

            {/* Right: Status and Price */}
            <div className='flex flex-col md:items-end gap-2'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                ${order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                  order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-blue-100 text-blue-800"}`}>
                {order.status}
              </span>
              <p className='font-semibold text-gray-800'>₹ {order.product_details.price}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
