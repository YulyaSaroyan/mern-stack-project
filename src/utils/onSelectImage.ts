import { isBlob } from "./isBlob"

export const onSelectImage = (
    newImages: File[], 
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>
) => {
    newImages.forEach((item: File) => {
        const reader = new FileReader()
        if (isBlob(item)) {
            reader.onloadend = () => {
                setPreview((prev: any[]) => ([
                    ...prev,
                    {
                        name: item.name,
                        url: reader.result
                    }
                ]))
            }
            
            reader.readAsDataURL(item)
        }
    })
}