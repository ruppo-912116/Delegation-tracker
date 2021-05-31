import { render, screen } from '@testing-library/react';
import App from './App';
import {unmountComponentAtNode} from "react-dom";
import { act } from 'react-dom/test-utils';
import {BrowserRouter, Route, Switch } from "react-router-dom";


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

it("renders without crashing", ()=>{
  act(() => {
    render(
      <BrowserRouter> <App/> </BrowserRouter>, container);
  });
  expect(container.textContent);
})
