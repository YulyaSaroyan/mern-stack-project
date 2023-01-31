import React, { useCallback, useState, useEffect, useRef, useMemo, memo } from 'react'
import { showCroppedImage } from '../../utils/showCroppedImage'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './Crop.css'

interface CropProps {
   imgUrl : string | undefined,
   setOpenCrop:  (value: boolean) => void,
   setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>,
   setNewImages: React.Dispatch<React.SetStateAction<File[]>>,
   selectedImgName: string,
   setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>
}

const Crop = ({ imgUrl, setOpenCrop, setPreview, selectedImgName, setPreSendImgs }: CropProps) => {
    const ref = useRef<any>(null)

    const [pixelCrop, setPixelCrop] = useState<{x: number, y: number, width: any, height: any}>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const [crop, setCrop] = useState<any>({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    })

    useEffect(() => {
        if (ref.current.componentRef) {
            setPixelCrop({
                x: 0,
                y: 0,
                width: ref.current.componentRef.current?.children[0].getClientRects()[0].width,
                height: ref.current.componentRef.current?.children[0].getClientRects()[0].height
            })
        }
    }, [])

    const memoedShowCrppedImage = useMemo(() => showCroppedImage, [])

    const handleCropperChange = useCallback((crop: { x: number, y: number, width: number, height: number }) => {
        setCrop(crop)
        setPixelCrop(crop)
    }, [])

    return (
        <div className="crop-general">
            <div className="crop-container">
                <ReactCrop 
                    crop={crop}
                    onChange={handleCropperChange}
                    onComplete={handleCropperChange}
                    minWidth={370}
                    minHeight={250}
                    ref={ref}
                >
                    <img src={imgUrl} alt=""/>
                </ReactCrop>
            </div>
            <div className="controls">
                <button onClick={() => setOpenCrop(false)}>Cancel</button>
                <button onClick={() => {memoedShowCrppedImage(imgUrl, pixelCrop, selectedImgName, setPreSendImgs, setPreview); setOpenCrop(false)}}>Crop</button>
            </div>
        </div>
    )
}    

export default memo(Crop)