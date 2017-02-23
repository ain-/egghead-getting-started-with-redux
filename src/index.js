import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import runTests from './arrayMutations';
import {runTodoTests} from './objectMutations';
import {testTodos} from './todoListReducer';

runTests();
runTodoTests();
testTodos();

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}
      onIncrement={() => store.dispatch({type:'INCREMENT'})}
      onDecrement={() => store.dispatch({type:'DECREMENT'})}
    />,
    document.getElementById('root'));
}

store.subscribe(render);
render();

const imitateUsage = () => {
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
    id: 0
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------');
};

imitateUsage();
