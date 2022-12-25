import React, {useState, useEffect} from 'react'
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import classNames from 'classnames'
import "../App.css"
import todo from "../todo.svg";


// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const TodoList = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('Empty todo!');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData, isCheck: false}
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData, isCheck: false}
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }
    
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    
    const checkItem = (id) => {  
        let newItem = items.find((elem) => {
            return elem.id === id
        });
        newItem.isCheck = !newItem.isCheck;
        setItems(
            items.map((elem) => {
                if (elem.id === newItem) {
                    return { ...elem, name: inputData, isCheck: newItem.isCheck}
                }
                return elem;
            })
        )  
    }
    const removeAll = () => {
         setItems([]);
    }

    const removeChecked = () => {
        const updateditems = items.filter((elem) => {
            return elem.isCheck === false;
        });
        setItems(updateditems);
    }

    const handleKeyPress = (event) => {
        if(event.key ==='Enter'){
            addItem()
        }
    }


    

    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    <div className="addItems">
                        
                            
                            <input type="text" placeholder="✍ Add Items..."
                            value={inputData} 
                            onChange={(e) => setInputData(e.target.value) }
                            onKeyPress={(e) => handleKeyPress(e)}
                            
                            />   
                            {
                                toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                    <i className="far fa-edit add-btn" title="Update Item" onClick={addItem} ></i>
                            }
                       
                    </div>
                    {/* <TransitionGroup >  */}
                    <div className="showItems">
                        
                        {
                            
                            items.map((elem) => {
                                
                                return (
                                    
                                    <div className="eachItem" key={elem.id}>

                                        <div className={classNames({'strike-through': elem.isCheck})}>
                                            <h3>{elem.name}</h3>
                                        </div>


                                        
                                        <div className="todo-btn">
                                            

                                            {elem.isCheck ? <i className="fas fa-square-xmark" title="Uncheck" onClick={() => checkItem(elem.id)}></i>:
                                                <i className="far fa-square add-btn" title="Check" onClick={() => checkItem(elem.id)}></i>}
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                              
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                  </div>
                                //   </CSSTransition>
                                )
                            })

                        }
                       
                    </div>
                    {/* // </TransitionGroup>  */}


                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> REMOVE ALL </span> </button>
                        <button className="btn effect04" data-sm-link-text="Remove Checked" onClick={removeChecked}><span> REMOVE CHECKED </span> </button>
                    </div>
                    
                </div>
          </div>  

        </>
    )
}

export default TodoList

