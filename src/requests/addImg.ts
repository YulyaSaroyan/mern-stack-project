import { FormEvent } from "react"
import { api } from "../api/axios.instace"

export const addImg = async (e: FormEvent<HTMLFormElement>, 
    preSendImgs: File[], 
    setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>, 
    isValid: boolean, 
    setImages: React.Dispatch<React.SetStateAction<Record<string, string>[]>>, 
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>, 
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>
) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const inputFile = target[0] as HTMLInputElement

    const fd = new FormData()

    preSendImgs.forEach((item: File) => {
        fd.append('images', item) 
    })

    if (!preSendImgs[0]) {
        setIsEmpty(true)
    }
    
    if (preSendImgs[0]) {
        if (preSendImgs[0].name || isValid) {
            const res = await api.post('user-images/create', fd)
            res.data.forEach((item: Record<string, string>) => {
                setImages((prevState: Record<string, string>[]) => ([
                    ...prevState,
                    item
                ]))
            })
        }
    }
    
    inputFile.value = ''
    setPreview([])
    setPreSendImgs([])   
}