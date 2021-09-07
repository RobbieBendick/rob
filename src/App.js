import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Syp from "./components/Syp/Syp";
import Rbdg from "./components/Rbdg/Rbdg";
import Soyeonuwu from "./components/Soyeonuwu/Soyeonuwu";
import Copyright from "./components/Copyright/Copyright";
import Robdog from "./components/Robdog/Robdog";
function App() {
  return (
    <Router>
      <div className="App" id="App">
        <Sidebar />
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/syp" render={(props) => <Syp {...props} character="Syp" />}/>
          <Route path="/rbdg" render={(props) => <Rbdg {...props} character="Rbdg" />}/>
          <Route path="/soyeonuwu" render={(props) => <Soyeonuwu {...props} character="Soyeonuwu" />}/>
          <Route path="/robdog" render={(props) => <Robdog {...props} character="Robdog" />}/>
        </Switch>
        <Copyright />
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
