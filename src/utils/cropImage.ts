export async function cropImage(
  src: string, 
  pixelCrop: {x: number, y: number, width: number, height: number}
): Promise<Array<Blob | string>> {
  return new Promise(resolve => {
    const image = new Image()
    image.crossOrigin = "anonymous";
    image.src = src
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");
      
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      
      
      const res: Response = await fetch(canvas.toDataURL("image/jpeg", "1.0"))

      const blob: Blob = await res.blob()

      const blobUrl = URL.createObjectURL(blob)
      
      resolve([blobUrl, blob])
    }
  })
}