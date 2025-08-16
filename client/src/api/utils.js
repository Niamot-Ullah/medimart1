import axios from "axios";


export const imageUpload = async imageData =>{
     const formData = new FormData();
    formData.append("image", imageData);

    // Upload image to imgbb
    const { data } = await axios.post(
      `${import.meta.env.VITE_IMGBB_URL}?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );
    return data.data.display_url;
}


//save or update user in db
export const saveUserInDB= async user =>{
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`,user)
  console.log(data);
}