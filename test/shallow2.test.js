import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import TodoItem from '../app/components/TodoItem';

function shallowRender(Component, props) {   //接受一个组件和参数
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);   //往组件里头添加参数
  return renderer.getRenderOutput();
}


//由于TodoItem是App的子组件，所以浅渲染必须在TodoItem上调用，否则渲染不出来。
//在我们的例子中，初始状态反映在组件的Class属性（props.className）是否包含todo-done
describe('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const todoItemData = { id: 0, name: 'Todo one', done: false };
    const todoItem = shallowRender(TodoItem, {todo: todoItemData});
    expect(todoItem.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});
