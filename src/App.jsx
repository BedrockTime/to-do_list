import { useEffect, useRef, useState } from "react"

const App = () => {
  const [text, setText] = useState("")
  const [todo, setTodo] = useState([])
  const [edit, setEdit] = useState("")
  const [editWindow, setEditWindow] = useState(false)
  const buttonRef = useRef(null)
  const idNumber = useRef(0)

  const addTodo = (elem) => {
    if (elem !== "") {
      idNumber.current = idNumber.current + 1
      setTodo([...todo, {id:idNumber.current, text:elem, completed:false}])
      setText("")
    }
  }

  const keyHandler = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click()
    }
  }

  const deletTodo = (id) => {
    setTodo(todo.filter(elem => elem.id !== id))
  }

  const completeTodo = (id) => {
    setTodo(todo.map(elem => elem.id === id ? {...elem, completed:!elem.completed} : elem))
  }

  const saveEdit = (id) => {
    setTodo(todo.map(elem => elem.id === id ? {...elem, text:edit} : elem))
  }

  const editTodo = () => {
    setEditWindow(!editWindow) 
  }

  useEffect(() => {
    console.log(todo)
  }, [todo])

  return(
    <div className="app-container">
      <h2>Добавить новую задачу</h2>
      <div className="inputTask">
        <input onKeyDown={keyHandler} value={text} onChange={(e) => {setText(e.target.value)}} placeholder="Введите задачу"/>
        <button onClick={() => {addTodo(text)}} ref={buttonRef}>Сохранить</button>
      </div>
      <div>
        <h3>Задачи</h3>
        {todo.map((el) => (
          <div className="tasks" key={el.id}>
            <div className="textTodo">
              <div 
                className={el.completed ? "checkBoxCompleted" : "checkBox"} 
                onClick={() => completeTodo(el.id)} 
              />
              <p style={{textDecoration: el.completed ? 'line-through' : 'none'}}>{el.text}</p>
            </div>
            <div className="edit">            
              <p onClick={() => editTodo()}>редактировать</p>
            </div>
            {editWindow === true &&
              <div className="editWindow">
                <input onChange={(e) => {setEdit(e.target.value)}}/>
                <button onClick={() => saveEdit(el.id)}>Сохранить</button>
              </div>
            }
            <div className="delete" onClick={() => deletTodo(el.id)}>✖</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App