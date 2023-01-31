import React, { Suspense, lazy } from "react"

import './SelectedImages.css'

const SelectedImage = lazy(() => import('../SelectedImage/SelectedImage'))

interface selectedImagesProps {
    preview: {name: string, url: string}[],
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>,
    setCropImg: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSelectedImgName: React.Dispatch<React.SetStateAction<string>>,
    setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>,
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>
}

const SelectedImages = ({ preview, setPreview, setCropImg, setSelectedImgName, setOpenCrop, setPreSendImgs }: selectedImagesProps) => {
    return (
        <div className="image-container-wrapper">
            {preview.length ? preview.map(({ url }: {url: string}, index: number) => (
                <Suspense key={url + index} fallback={<div style={{color: 'white', fontSize: '30px'}}>Loading</div>}>
                    <SelectedImage 
                        setPreview={setPreview} 
                        setCropImg={setCropImg} 
                        setSelectedImgName={setSelectedImgName} 
                        setOpenCrop={setOpenCrop} 
                        setPreSendImgs={setPreSendImgs}
                        preview={preview}
                        url={url}
                    />
                </Suspense>
            )) : <></>}
        </div>
    )
}

export default SelectedImages