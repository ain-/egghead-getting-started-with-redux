import {createStore, combineReducers} from 'redux';
import {todos, visibilityFilter} from './todoListReducer';
import ReactDOM from 'react-dom';
import React from 'react';

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};


export const runApp = () => {
  store.subscribe(render);
  render();
};
