import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Syp from "./components/Syp/Syp"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/syp" component={Syp}/>
        </Switch>
        
      </div>
       {/* background img */}
       <img
        className="background-img"
        src="/images/wes.jpg"
        alt="backround-img"
      ></img>
    </Router>
  );
}

export default App;
