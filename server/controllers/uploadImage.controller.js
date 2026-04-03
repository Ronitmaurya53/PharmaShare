// import uploadImageClodinary from "../utils/uploadImageClodinary.js"

// const uploadImageController = async(request,response)=>{
//     try {
//         const file = request.file

//         const uploadImage = await uploadImageClodinary(file)

//         return response.json({
//             message : "Upload done",
//             data : uploadImage,
//             success : true,
//             error : false
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export default uploadImageController

import uploadImageClodinary from "../utils/uploadImageClodinary.js";

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) 
      return res.status(400).json({ success: false, message: "No file provided" });

    const imageUrl = await uploadImageClodinary(req.file.path);

    return res.json({
      success: true,
      message: "Image uploaded successfully",
      data: { url: imageUrl }
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};

export default uploadImageController;
