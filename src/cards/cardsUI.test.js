import { render, screen } from '@testing-library/react';
import Card1 from './cardsUI.js';
import {unmountComponentAtNode} from "react-dom";
import { act } from 'react-dom/test-utils';
import {BrowserRouter, MemoryRouter, Route, Switch } from "react-router-dom";
import { shallow, Enzyme } from "enzyme";
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import CardMain from "./CardMain.js";


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
  const component = shallow(<Card1 />);
  expect (component).toMatchSnapshot();
});

it("should render correctly with given object", () => {
  const mockObject = {
    "name": "kfkerkfr"
  }

  const component = shallow(<Card1 pool={mockObject}/>);
  expect(component).toMatchSnapshot();
})



