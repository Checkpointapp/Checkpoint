import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import CreateTask from "./CreateTask";
import CreateList from "./CreateList";
import Tasks from './Tasks';
import Survey from "./Survey";
import Preferences from "./Preferences";
import WriteDump from "./WriteDump";
import MainPage from "./MainPage";

export default function Router() {

  return (
    <> 
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/tasks" component={Tasks}/>
                <Route exact path="/create-task" component={CreateTask}/>
                <Route exact path="/create-list" component={CreateList}/>
                <Route exact path="/registration-questions" component={Survey}/>
                <Route exact path="/preferences" component={Preferences}/>
                <Route exact path="/writing-dump" component={WriteDump}/>
            </Switch>
        </BrowserRouter>
    </>
  );
}