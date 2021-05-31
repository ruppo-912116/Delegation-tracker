import CardMain from './cards/CardMain.js';
import TimelineMain from "./Timeline/TimelineMain.js";


import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={CardMain} exact />
          <Route path='/timeline' component={TimelineMain} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
