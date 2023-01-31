import { cropImage } from "./cropImage"

export const showCroppedImage = async (
    imgUrl: string | undefined, 
    pixelCrop: {x: number, y: number, width: any, height: any}, 
    selectedImgName: string, 
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>,
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>
) => {
    try {
        if (imgUrl) {
           const croppedImage: any = await cropImage(imgUrl, pixelCrop)
           
           const file = new File([croppedImage[1]], selectedImgName, {type: "image/webp"})

            if (file) {  
               setPreSendImgs(prev => [...prev.filter((item: File) => item.name !== selectedImgName), file]) 
               setPreview((prev: {name: string, url: string}[]) => [...prev.filter((item: {name: string, url: string}) => item.name !== selectedImgName), {name: selectedImgName, url: croppedImage[0]}])
            }
        }

    } catch (e) {
      console.error(e)
    }
}