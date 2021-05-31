import TimelineMock from './TimelineMock.js';
import { mount, render, shallow } from 'enzyme';
import {unmountComponentAtNode} from "react-dom";
import { act } from 'react-dom/test-utils';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it ("should render correctly with no props", () => {
    const mProps = {location:{state: {pool: {name:'h1'}}}};
    const component = shallow(<TimelineMock {...mProps}/>);
    expect (component).toMatchSnapshot();
    expect(component.find("#testId").exists()).toBeTruthy()
    expect(component.find("#addressTest").exists()).toBeTruthy()
  });

  describe("heading tests", () => {
    it("should render text for h1", () => {
    const mProps = {location:{state: {pool: {name:'Title'}}}};
    const wrapper = shallow(<TimelineMock {...mProps}></TimelineMock>);
    expect(wrapper.find('h1').text()).toEqual('Title');
    });
  })

  describe("Indirectly testing increment counter through click simulation", () => {
    it("should update the counter", () => {
      const mProps = {location:{state: {pool: {name:'h1'}}}};
      const component = shallow(<TimelineMock {...mProps}/>);
      expect (component.state('counter')).toBe(0);
      component.find('button').simulate('click');
      expect(component.state('counter')).toBe(1);
    })
  })




  
