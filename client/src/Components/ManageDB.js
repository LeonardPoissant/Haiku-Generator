import React, { useContext, useEffect, useState} from "react"

import styled, {css} from "styled-components";
import ClearIcon from '@material-ui/icons/Clear';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';


import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const ManageDb = () =>{
    const {
        urlTitle,
      } = useContext(HaikuContext);
      const [dataBaseName, setDataBaseName] = useState("");
      const [array, setArray] = useState([]);
      const [deletedArray, setDeletedArray] = useState([]);
      const [isClicked, setIsClicked] = useState({});
      const [isDeleted, setIsDeleted] = useState(false)
      


useEffect(()=>{
    fetch(`/dbInfo/${urlTitle}`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      setDataBaseName(data.dataBaseName)
      setArray(data.haikuArray)
      });
      console.log(isDeleted)
},[isDeleted]);

const handleClick =(verse, index, e)=>{
    setIsClicked(prevState => ({
        ...prevState,
        [index]: !prevState[index]
      }));
    setDeletedArray([...deletedArray, verse])
    };

   const handleUndo = (verse, index)=>{
    setIsClicked(prevState => ({
        ...prevState,
        [index]: !prevState[index]
      }));

      const deletedVerseIndex = deletedArray.indexOf(verse);
      if (deletedVerseIndex !== -1) deletedArray.splice(deletedVerseIndex, 1);
      setDeletedArray(deletedArray);
   }

const handleDeletion =()=>{
    fetch("/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          urlTitle,
          deletedArray,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          console.log(db)
          setIsClicked({})
          setIsDeleted(!isDeleted)
        })
        .catch((err) => {
          console.log(err.data);
        });

}


return(
    <Wrapper>
<h1>{dataBaseName}</h1>
<Ul>
{array.map((verse, index)=>{
    return(
        <>
        <Verse key={index}>
            {verse}
            {!isClicked[index]?   (<Button onClick={(e) => handleClick(verse, index, e)}
         isClicked={isClicked}>
             <ClearIcon id={index} fontSize={"small"}/>
         </Button>) : <Button onClick={(e) => handleUndo(verse, index, e)}><UndoRoundedIcon/></Button>}
          
                  
        </Verse>
        
         </>
    )
})}
</Ul>
<SubmitDeletion onClick={(e)=>handleDeletion()}>CONFIRM</SubmitDeletion>
</Wrapper>
)
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const Ul = styled.ul`
list-style-type:none;
display:inline-grid;
grid-gap: 5px 5px;
`;

const Verse = styled.li`

`


const Button = styled.button`
border-style:none;
background-color:white;
:hover{
    cursor:pointer;
}
/*{${({ isClicked }) =>
    isClicked &&
    css`
      display: none;`
      
}}*/


`;

const SubmitDeletion = styled.button``;



export default ManageDb