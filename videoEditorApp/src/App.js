import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import VideoEditor from "./components/VideoEditor";
import "./styles.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route path="/videoeditor">
          <VideoEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
