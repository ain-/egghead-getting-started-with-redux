import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore} from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];

  deepFreeze(action);
  deepFreeze(stateBefore);

  expect(todos(stateBefore, action))
    .toEqual(stateAfter);
}

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(action);
  deepFreeze(stateBefore);

  expect(todos(stateBefore, action))
    .toEqual(stateAfter);
};

const imitateUsage = () => {
  const store = createStore(todos);
  console.log('add/toggle TODOs passed.');

  console.log('Initial state:');
  console.log(store.getState());
  console.log('--------');

  console.log('Dispatching ADD_TODO.');
  store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------');

  console.log('Dispatching ADD_TODO.');
  store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go shopping'
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------');

  console.log('Dispatching TOGGLE_TODO.');
  store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------');
};

export const testTodos = () => {
  testAddTodo();
  testToggleTodo();
  imitateUsage();
};
