import React ,{useState ,useEffect}from 'react'
import './style.css'
const getLocalData = () =>{
  const lists  = localStorage.getItem("mytodolist")
  if(lists){
    return JSON.parse(lists);

  }else{
    return[];
  }
}
const Todo = () =>{

  const [inputdata,setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
const [isEditItem, setIsEditItem] = useState("");
const [toggleButton,setToggleButton] = useState(false);
  // Add the items function 
  const addItem = () =>{
    if(!inputdata){
      alert("Please enter the data");

    }else if(inputdata  && toggleButton){
      setItems(
        items.map((curElem) =>{
          if(curElem.id === isEditItem){
          return{...curElem,name:inputdata};
          }
          return curElem;
        })
      );
      setInputData("")
      setIsEditItem(null);
      setToggleButton(false);

    }
    else{

      const myNewInputData = {
        id:new Date().getTime().toString(),
        name:inputdata,
      };
      setItems([...items,myNewInputData]);
      setInputData("");
    }
  };

//edite the items
const editItem = (index) =>{
const item_todo_edited = items.find((curElem) =>{
return curElem === index;
});
setInputData(item_todo_edited.name)
setIsEditItem(index);
setToggleButton(true);
};
  //How to delete item section
  const deleteItem = (index) =>{
    const updateItems = items.filter((curElem)=>{
      return curElem.id !== index;
    });
    setItems(updateItems);
  };

  // Remove all the Element
  const RemoveAll =() =>{
    setItems([]);
  };

  //USe Effect HOOks

  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));

  },[items]);
  return (
   <> <div className='main-div'>
   <div className='child-div'>
       <figure>
           <h1>Write in the To-Do list</h1>
       </figure>
   <div className='addItems'>
   <input 
   type="text"
   placeholder ="✍ Add Item" 
    className='form-control'
    value = {inputdata}
    onChange ={(event) => setInputData(event.target.value)}
   />
   {toggleButton? (
   <i className="far fa-edit add-btn1" onClick={addItem}></i>
   ): <i className="fa fa-plus add-btn" onClick={addItem}></i>
   });
  </div>
</div>
{/* Show all items */}

{items.map((curElem) =>{
  return(
    <div className='eachItem' key={curElem.id}>
    <h3>{curElem.name}</h3>
    <div className='todo-btn'>
    </div>
    <i class="far fa-edit add-btn1"
    onClick={()=> editItem(curElem.id)}></i>
    <i class="far fa-trash-alt add-btn1" onClick={()=> deleteItem(curElem.id)}></i>
  </div>
  );
})}
  

  {/* Remove all button  */}
  <div className='showItems'>
<button className='btn effect04' data-sm-link-text="Remove All" onClick={RemoveAll}>
  SAVE / REMOVE
 </button>
  </div>
   </div>
    </>
  )

}
export default Todo;
