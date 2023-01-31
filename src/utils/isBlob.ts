export function isBlob(input: any) {
    if ('Blob' in window && input instanceof Blob)
        return true;
    else return false;
}