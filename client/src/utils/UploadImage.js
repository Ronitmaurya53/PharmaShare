


import Axios from './Axios'

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await Axios.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })

  return response
}

export default uploadImage
