export const editImg = (
        image: string | undefined, 
        setCropImg: React.Dispatch<React.SetStateAction<string | undefined>>, 
        preview: {name: string, url: string}[], 
        setSelectedImg: React.Dispatch<React.SetStateAction<string>>
    ) => {
    const selectedImg = preview.filter(({name, url}: {name: string, url: string}) => url === image)[0]
    setCropImg(selectedImg.url)
    setSelectedImg(selectedImg.name)
}