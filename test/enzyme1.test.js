import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';    //BDD（行为驱动开发）和TDD（测试驱动开发）双测试风格的断言库
import App from '../app/components/App';


//关于find方法，有一个注意点，就是它只支持简单选择器，稍微复杂的一点的CSS选择器都不支持。
/*component.find('.my-class'); // by class name
component.find('#my-id'); // by id
component.find('td'); // by tag
component.find('div.custom-class'); // by compound selector
component.find(TableRow); // by constructor
component.find('TableRow');*/  // by display name
describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    //shallow方法返回App的浅渲染，然后app.find方法找出h1元素，text方法取出该元素的文本。
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
});

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
//render方法将React组件渲染成静态的HTML字符串，然后分析这段HTML代码的结构，返回一个对象。
//它跟shallow方法非常像，主要的不同是采用了第三方HTML解析库Cheerio，它返回的是一个Cheerio实例对象。
//Enzyme的设计就是，让不同的底层处理引擎，都具有同样的API（比如find方法）。
    let app = render(<App/>);
    expect(app.find('.todo-done').length).to.equal(0);
  });
});

describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    //mount方法用于将React组件加载为真实DOM节点。
    //at方法返回指定位置的子组件，simulate方法就在这个组件上触发某种行为。
    //get返回指定位置的子组件的DOM节点
    //删除就判断li长度－1
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).to.equal(todoLength - 1);
  });

  //找到一个item，判断点击后该item是否含有todo－done的类名
  it('Turning a Todo item into Done', function () {
    let app = mount(<App/>);
    let todoItem = app.find('.todo-text').at(0);
    todoItem.simulate('click');
    expect(todoItem.hasClass('todo-done')).to.equal(true);
  });

  it('Add a new Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    let addInput = app.find('input').get(0);  //get:返回的是DOM节点，at返回的是组件
    addInput.value = 'Todo Four';    //判断placehours
    app.find('.add-button').simulate('click');
    expect(app.find('li').length).to.equal(todoLength + 1);
  });
});


// .get(index)：返回指定位置的子组件的DOM节点
// .at(index)：返回指定位置的子组件
// .first()：返回第一个子组件
// .last()：返回最后一个子组件
// .type()：返回当前组件的类型
// .text()：返回当前组件的文本内容
// .html()：返回当前组件的HTML代码形式
// .props()：返回根组件的所有属性
// .prop(key)：返回根组件的指定属性
// .state([key])：返回根组件的状态
// .setState(nextState)：设置根组件的状态
// .setProps(nextProps)：设置根组件的属性
