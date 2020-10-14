import React, { useEffect} from "react"


const ManageDb = () =>{

useEffect(()=>{
    fetch(`https://murmuring-ravine-33143.herokuapp.com/allHaikus/${urlTitle}`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
   
      });
 
})

return(
    <div></div>
)

}

export default ManageDb