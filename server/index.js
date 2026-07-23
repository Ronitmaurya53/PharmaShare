import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import chatRoute from "./route/chatRoute.js";

const app = express()

// app.use(cors({
//     credentials : true,
//     origin : process.env.FRONTEND_URL
// }))

app.use(cors({
    origin: [
        "http://localhost:5173", // Taki local par bhi chalta rahe
        "https://pharma-share-pumq-5jqmyu5t3-ronitmaurya53s-projects.vercel.app" // Aapka live Vercel link
    ],
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev')) // Fix 1: 'dev' add kiya taaki terminal mein logs aache se dikhein
app.use(helmet({
    crossOriginResourcePolicy : false
}))

// Fix 2: .env file ka port pehle check karega, agar nahi mila tab 8080 use karega
const PORT = process.env.PORT || 8080; 

app.get("/",(request,response)=>{
    // server to client
    response.json({
        message : "Server is running on PORT " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/upload",uploadRouter) // Sirf ek hi baar aayega
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)
app.use("/api/chat", chatRoute);
// Fix 3: Duplicate upload route hata diya gaya hai

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on PORT", PORT)
    })
})
