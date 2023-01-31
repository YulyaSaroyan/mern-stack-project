import axios from "axios"
import React, { useState, useEffect, useMemo } from "react"
import { getImages } from "../../requests/getImages"
import { onSelectImage } from "../../utils/onSelectImage"

import Crop from "../Crop/Crop"
import ImgUploadForm from "../ImgUploadForm/ImgUploadForm"
import SelectedImages from "../SelectedImages/SelectedImages"

import './ImgUpload.css'

interface ImgUploadProps {
    setImages: React.Dispatch<React.SetStateAction<Record<string, string>[]>>
}

// Record<string, string> ~ {
//     [key: string]: string
// }

const ImgUpload = ({ setImages }: ImgUploadProps) => {
    const [newImages, setNewImages] = useState<File[]>([])
    const [preview, setPreview] = useState<{name: string, url: string}[]>([])
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [cropImg, setCropImg] = useState<string | undefined>('')
    const [openCrop, setOpenCrop] = useState<boolean>(false)
    const [selectedImgName, setSelectedImgName] = useState<string>('')
    const [preSendImgs, setPreSendImgs] = useState<File[]>([])
    
    const memoedGetImages = useMemo(() => getImages, [])

    // const getImagesFromS3 = async () => {
    //     const res = await axios.get('https://d37izk13u4d9jy.cloudfront.net/newimages/')
    // }
    
    useEffect(() => {
        memoedGetImages(setImages)
    }, [])

    useEffect(() => {
        onSelectImage(newImages, setPreview)
    }, [newImages])

    return (
        !openCrop ? <div className="img-upload-container">

            <ImgUploadForm 
                setIsValid={setIsValid}
                setIsEmpty={setIsEmpty}
                setNewImages={setNewImages}
                setPreSendImgs={setPreSendImgs}
                preSendImgs={preSendImgs}
                setImages={setImages}
                setPreview={setPreview}
                isValid={isValid}
                isEmpty={isEmpty}
            />

            <SelectedImages
                preview={preview}
                setPreview={setPreview}
                setCropImg={setCropImg}
                setSelectedImgName={setSelectedImgName}
                setOpenCrop={setOpenCrop}
                setPreSendImgs={setPreSendImgs}
            />

            {!isValid && <p>please select valid image.</p>}   
            {isEmpty && <p>please select image.</p>}   

        </div> : <Crop 
            imgUrl={cropImg} 
            setOpenCrop={setOpenCrop} 
            setPreview={setPreview} 
            setPreSendImgs={setPreSendImgs} 
            setNewImages={setNewImages} 
            selectedImgName={selectedImgName}
        />
    )
}

export default ImgUpload