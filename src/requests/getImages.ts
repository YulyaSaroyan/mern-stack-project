import { api } from "../api/axios.instace"

export const getImages = async (setImages: React.Dispatch<React.SetStateAction<Record<string, string>[]>>) => {
    const res = await api.get('user-images')
    setImages(res.data)
}