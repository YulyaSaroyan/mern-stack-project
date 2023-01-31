export const deleteImg = (
    imgUrl: string | undefined, 
    setPreview: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>, 
    setPreSendImgs: React.Dispatch<React.SetStateAction<File[]>>
) => {
    const isSure = window.confirm('are you sure you want to delete the image?') 
    if (isSure) {
        setPreSendImgs([])
        setPreview((prev: {name: string, url: string}[]) => prev.filter(({ url }: { url: string}) => imgUrl !== url))
    } else {
        return
    }
}