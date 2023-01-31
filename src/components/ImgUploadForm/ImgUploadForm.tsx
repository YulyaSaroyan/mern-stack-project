import React, { useMemo, useCallback } from 'react'
import { addImg } from '../../requests/addImg'
import './ImgUploadForm.css'

interface ImgUploadFormProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>,
    setNewImages: React.Dispatch<React.SetStateAction<any[]>>,
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>,
    preSendImgs: File[],
    setImages: React.Dispatch<React.SetStateAction<Record<string, string>[]>>,
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>,
    isValid: boolean,
    isEmpty: boolean
}

const ImgUploadForm = ({ setIsValid, setNewImages, setPreSendImgs, preSendImgs, setImages, setPreview, setIsEmpty, isEmpty, isValid }: ImgUploadFormProps) => {
    const handleChange = useCallback((e: any) => {
        [...e.target.files].forEach(async file => {
            if (!file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)){
                setIsValid(false)
                e.target.value = ''
            } else {
                setPreview([])
                setNewImages([...e.target.files])
                setPreSendImgs([...e.target.files])
                setIsValid(true)
                setIsEmpty(false)
            }
        })
    }, [setIsEmpty, setIsValid, setNewImages, setPreSendImgs, setPreview])
    
    const memoedAddImg = useMemo(() => addImg, [])

    return (
        <form onSubmit={e => memoedAddImg(e, preSendImgs, setIsEmpty, isValid, setImages, setPreview, setPreSendImgs)} className="img-upload">
            <label htmlFor="image">Choose Images</label>
            <input id="image" type="file" multiple onChange={handleChange} hidden/>
            <button>Add Images to Slider</button>
        </form>
    )
}

export default ImgUploadForm
