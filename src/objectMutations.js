import deepFreeze from 'deep-freeze';
import expect from 'expect';

const toggleTodo = (todo) => {
  return Object.assign({}, todo,
    {completed: !todo.completed});
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

export const runTodoTests = () => {
  testToggleTodo();
  console.log('All TODO object mutation tests passed.');
};
