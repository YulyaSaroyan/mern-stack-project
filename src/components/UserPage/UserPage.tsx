import React, { useState, lazy } from 'react'
import welcome from '../../images/30594.png'

const Slider = lazy(async() => await import('../Slider/Slider'))
const ImgUpload = lazy(() => import('../ImgUpload/ImgUpload'))

const UserPage = () => {
    const [images, setImages] = useState<Record<string, string>[]>([])
    console.log(images);
    

    return (
        <div className="user-page">
            <Slider images={images}/>
            <ImgUpload setImages={setImages}/>
        </div>
    )
}

export default UserPage