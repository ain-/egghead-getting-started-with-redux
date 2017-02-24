import {createStore, combineReducers} from 'redux';
import {todos, visibilityFilter} from './todoListReducer';
import ReactDOM from 'react-dom';
import React from 'react';

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);

const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );
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
          {visibleTodos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={{
                  textDecoration: todo.completed ? 'line-through' : ''
                }}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL'>All</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};


export const runApp = () => {
  store.subscribe(render);
  render();
};
