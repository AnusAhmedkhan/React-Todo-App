import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { useState } from "react";

import { faPlus,faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const getlocalitem=()=>{
    let lst=localStorage.getItem('lists')
    console.log(lst);
if(lst){
    return JSON.parse(localStorage.getItem('lists'))
}else{
    return [];
}

}

const Todo =()=>{
    const[item,setitem]=useState("");
    const[val,setval]=useState(getlocalitem());
    const[toggle,setoggle]=useState(true);
    const[Edit,isEdititem]=useState("");


    const getvalue=(e)=>{
setitem(e.target.value)
    }
    const additem=()=>{
        if(!item){
            alert("Invalid!! Enter Todo Please")
        }else if(item && !toggle){
            setval(
val.map((Val)=>{
    if(Val.id===Edit){
        return{...Val, name:item}
    }
    return Val;
    
})
)
      setoggle(true)
    setitem("")
    }
        else{
            const allitem={id: new Date().getTime().toString(),
            name:item}
setval([...val,allitem])
setitem("");
        }
        


    }
     const delbtn=(id)=>{
        const upitem=val.filter((elem,index)=>{
            return id!==elem.id;
        })
        setval(upitem);

     }
     const dltall=()=>{
        setval([]);
     }
     const edititem=(id)=>{
setoggle(false)
const edit=val.find((elem)=>{
    return id===elem.id
})
setitem(edit.name)
isEdititem(edit.id)


     }
     useEffect(()=>{
        localStorage.setItem("lists",JSON.stringify(val))
     },[val])
return(
    <>
    <div>
    <div className="Head">
    <h1>My Todoie App</h1>
    </div>
    
    <div className="Main">
<div className="MainChild">
   
<input type="text" className="inp" onChange={getvalue} value={item} placeholder="ENTER TODO..."/>
{
    toggle ? <FontAwesomeIcon className="faplus" onClick={additem} icon={faPlus} /> : <FontAwesomeIcon className="faplus" onClick={additem} icon={faPenToSquare} />
    
}
{/* <FontAwesomeIcon className="faplus" onClick={additem} icon={faPlus} />  */}
<button className="Btn" onClick={dltall}>Delete All</button>
</div>
<div className="content">
    <ul>
        {
            val.map((value,index)=>{
                return(
<li key={index}>
<h3 className="item">{value.name}</h3>
<FontAwesomeIcon className="fatrash" icon={faTrash} onClick={()=>delbtn(value.id)} />
<FontAwesomeIcon className="fapen" onClick={()=>edititem(value.id)} icon={faPenToSquare} />
        </li>
                )
            })
        }
        
    </ul>
    
</div>

    </div>
    </div>
    </>
)
}
export default Todo;