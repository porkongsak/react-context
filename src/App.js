import React, { useReducer, useState } from 'react'

const initialState = {
  todos: [],
  todoCount:0
}

function reducer(state, action ){
 switch (action.type) {
   case "ADD_TODO":
     return {
       todos: [...state.todos, { text: action.payload, completed: false}],
       todoCount: state.todoCount + 1
     };
   case "TOGGLE_TODO":
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed} : t
        ),
        todoCount: state.todoCount
      };

    default:
      return state;
 }
}

const App = () => {

  const [{todos, todoCount}, dispatch ] = useReducer(reducer,initialState); 
  const [text, setText] = useState();

  return (
    <div >
      <h3>{todoCount}</h3>
      <form onSubmit={e =>{
        e.preventDefault();
        dispatch({ type: "ADD_TODO", payload: text });
        setText("");
      }}>

        <input value={text} onChange={e => setText(e.target.value)}/>
      </form>
      {todos.map((t, idx) =>(
        <div 
        key={t.text} 
        onClick={() => dispatch({ type: "TOGGLE_TODO", idx })}
        style={{
          textDecoration: t.completed ? "line-through" : ""
        }}
        >
          {t.text}
        </div>
      ))}
      <pre>
        {JSON.stringify(todos, null, 2)}
      </pre>
    </div>
  );
}

export default App;
