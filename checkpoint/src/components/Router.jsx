import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Tasks from './Tasks';

export default function Router() {

  return (
    <> 
        <BrowserRouter>
            <Switch>
               {/* <Route exact path="/" component={MainPage}/>*/}
                <Route exact path="/tasks" component={Tasks}/>
            </Switch>
        </BrowserRouter>
    </>
  );
}