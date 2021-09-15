import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";
import AddRoom from "./components/AddRoom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/roomlist" component={RoomList}></Route>
                <Route path="/chatroom" component={ChatRoom}></Route>
                <Route path="/addroom" component={AddRoom}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
