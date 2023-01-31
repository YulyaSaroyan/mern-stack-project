import React, { memo, useCallback, useRef, useMemo } from "react"
import { Carousel } from "react-responsive-carousel"
import welcome from '../../images/30594.png'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import './Slider.css'

interface SliderProps {
    images: Record<string, string>[]
}

const Slider = ({ images }: SliderProps) => {
    const scroll = useRef<any | null>(null)

    const handleChange = useCallback((index: number) => {
        scroll.current.carouselWrapperRef.children[1].scrollLeft = Math.floor(index / 8) * 800 
    }, [])
    
    const thumbs = useMemo(() => {
        return images.map(image => (
            <img key={image._id} src={image.imgUrl} alt="logo"/>
        ))
    }, [images])
            
    // const defaultImg = <img src={welcome} alt="logo"/>

    return (
        <Carousel className="slider" infiniteLoop={true} ref={scroll} onChange={handleChange} renderThumbs={() => thumbs}>
            {thumbs}
        </Carousel>
    )
}

export default memo(Slider)