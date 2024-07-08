 export const debounce = (fun:any,delay:any) => {
    let id:any
    return () => {
          clearTimeout(id)
        id = setTimeout(() => {
        fun();
    },delay) 
    }
}