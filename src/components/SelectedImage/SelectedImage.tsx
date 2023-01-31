import React, { memo } from "react"
import { deleteImg } from "../../utils/deleteImg"
import { editImg } from "../../utils/editImg"

import { FcEditImage, FcRemoveImage } from "react-icons/fc"
import './SelectedImage.css'

interface SelectedImageProps {
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>,
    setCropImg: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSelectedImgName: React.Dispatch<React.SetStateAction<string>>,
    setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>,
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>,
    preview: {
        name: string,
        url: string
    }[]
    url: string
}

const SelectedImage = ({ setCropImg, preview, setSelectedImgName, setPreview, setPreSendImgs, setOpenCrop, url }: SelectedImageProps) => {
    return (
        <div className="image-container">
            <img className="uploaded-image" alt="" srcSet={url}/>
            <div className="selected-images-button-container">
                <FcRemoveImage 
                    className="selected-images-delete" 
                    onClick={() => deleteImg(url, setPreview, setPreSendImgs)}
                />
                <FcEditImage 
                    className="selected-images-edit" 
                    onClick={() => {editImg(url, setCropImg, preview, setSelectedImgName); setOpenCrop(true)}}
                />
            </div>
        </div>
    )
}

export default memo(SelectedImage)