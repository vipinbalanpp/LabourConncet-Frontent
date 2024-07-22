import { useState } from "react"
import { string } from "yup"

interface ItemType  {
    category:string
    items: string[]
}


const NewFile = () => {
    const [items,setItems] = useState<ItemType[]>([
        {
          category: 'Fruits',
          items: ['Apple', 'Banana', 'Orange', 'Grapes']
        },
        {
          category: 'Vegetables',
          items: ['Carrot', 'Broccoli', 'Lettuce', 'Tomato']
        }
      ])
      const[isItemClicked,setIsItemClicked] = useState<boolean>(false);
      const [item,setItem] = useState<string [] | null>(null)
      const[isList,setIsList] = useState(false)
    return (
        <div className="flex gap-44">
          <div>
            <p onClick={() => setIsItemClicked(!isItemClicked)}>Category</p>
            {isItemClicked && items.map(item => (
                <p onClick={()=> setItem(item.items)}>{item.category}</p>
            ))}
 
          
            
        </div>
        <div>
            <p onClick={() => setIsList(true)}>Items</p>
        {isList&&  item?.map(sample => (
                    <p>{sample}</p>
                ))}
        </div>
        </div>
      
    )
}

export default NewFile
