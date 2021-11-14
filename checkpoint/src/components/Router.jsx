import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import CreateTask from "./CreateTask";
import Tasks from './Tasks';
import Survey from "./Survey";

export default function Router() {

  return (
    <> 
        <BrowserRouter>
            <Switch>
               {/* <Route exact path="/" component={MainPage}/>*/}
                <Route exact path="/tasks" component={Tasks}/>
                <Route exact path="/create-task" component={CreateTask}/>
                <Route exact path="/registration-questions" component={Survey}/>
            </Switch>
        </BrowserRouter>
    </>
  );
}