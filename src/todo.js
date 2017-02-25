import {createStore, combineReducers} from 'redux';
import {todos, visibilityFilter} from './todoListReducer';
import ReactDOM from 'react-dom';
import React from 'react';

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
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

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : ''
      }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

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
    const {
      todos,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
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
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL'
            currentFilter={visibilityFilter}
          >All</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE'
            currentFilter={visibilityFilter}
          >Active</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}
          >Completed</FilterLink>
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
