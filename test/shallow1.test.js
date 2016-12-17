import React from 'react';
import TestUtils from 'react-addons-test-utils';  //官方测试工具
import { expect } from 'chai';     //BDD（行为驱动开发）和TDD（测试驱动开发）双测试风格的断言库
import App from '../app/components/App';

// 该函数返回的就是一个浅渲染的虚拟DOM对象
function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('Shallow Rendering', function () {   //输出标题
  it('App\'s title should be Todos', function () {  //输出内容
    const app = shallowRender(App);   //表示对App组件进行"浅渲染"
    // component's shallow rendering has props.children
    //每一个虚拟DOM对象都有props.children属性，它包含一个数组，里面是所有的子组件
    expect(app.props.children[0].type).to.equal('h1');
    expect(app.props.children[0].props.children).to.equal('Todos');
  });
});
