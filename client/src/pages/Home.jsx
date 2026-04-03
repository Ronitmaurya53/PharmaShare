
import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/pic4.webp";
import banner3 from "../assets/pic3.webp"; 
import banner4 from "../assets/pic5.webp";
import banner5 from "../assets/pic6.jpg";
import banner6 from "../assets/pic7.webp";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { motion } from "framer-motion";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [banner1, banner2, banner3,banner4,banner5,banner6];

  // 🌀 Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category?.some((c) => c._id === id)
    );

    if (!subcategory) {
      navigate(`/category/${valideURLConvert(cat)}-${id}`);
      return;
    }

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className="bg-[#040431] min-h-screen pb-16">
      {/* 🖼️ Banner Carousel */}
      <div className="container mx-auto px-4 pt-4 relative">
        <div className="overflow-hidden rounded-2xl shadow-2xl relative">
          <motion.img
            key={currentBanner}
            src={banners[currentBanner]}
            alt="Banner"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[420px] object-cover hidden lg:block"
          />
          <motion.img
            key={`mobile-${currentBanner}`}
            src={banners[currentBanner]}
            alt="Mobile Banner"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[250px] object-cover lg:hidden"
          />

          {/* dots */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                  currentBanner === i
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛍️ Category Section */}
      <div className="container mx-auto px-4 mt-10">
        <motion.h2
          className="text-white text-2xl font-bold mb-6 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Shop by Category
          <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 h-40 flex flex-col justify-center items-center gap-3 shadow animate-pulse"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full"></div>
                  <div className="bg-blue-100 w-20 h-4 rounded"></div>
                </div>
              ))
            : categoryData.map((cat) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={cat._id}
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                  className="bg-white rounded-xl p-4 shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 group"
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img
                      src={cat.image || "/placeholder.png"}
                      alt={cat.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-800 leading-tight group-hover:text-blue-600">
                    {cat.name}
                  </p>
                  <div className="h-[3px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-10 transition-all rounded-full"></div>
                </motion.div>
              ))}
        </motion.div>
      </div>

      {/* 🧾 Category Wise Product Display */}
      <div className="container mx-auto px-4 mt-16 space-y-14">
        {categoryData?.map((c, i) => (
          <motion.div
            key={c?._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <CategoryWiseProductDisplay id={c?._id} name={c?.name} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home;
