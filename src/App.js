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
                <Route path="/room-list" component={RoomList}></Route>
                <Route path="/chat-room" component={ChatRoom}></Route>
                <Route path="/add-room" component={AddRoom}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
