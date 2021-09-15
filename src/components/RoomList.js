import React, {useState, useEffect} from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import {
    Jumbotron,
    Spinner,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import Moment from 'moment';
import firebase from '../Firebase';

const db = firebase;

function RoomList() {

    const [room, setRoom] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [nickname, setNickname] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            setNickname(localStorage.getItem('nickName'));
            console.log(db.ref('rooms/'))
            db.ref('rooms/').on('value', resp => {
                console.log(resp);
                setRoom([]);
                setRoom(snapshotToArray(resp));
                setShowLoading(false);
            })
        };
        fetchData();
    },[])

    const snapshotToArray = (snapshot) => {
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }

    const enterChatRoom = (roomname) => {
        const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.message = `${nickname} enter the room`;
        chat.type = 'join';
        const newMessage = db.ref('chats/').push();
        newMessage.set(chat);

        db.ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp) => {
            let roomuser = [];
            roomuser = snapshotToArray(resp);
            const user = roomuser.find(x => x.nickname === nickname);
            if (user !== undefined) {
                const userRef = db.ref('roomusers/' + user.key);
                userRef.update({status: 'online'});
            } else {
                const newroomuser = {roomname: '', nickname: '', status: ''};
                newroomuser.roomname = roomname;
                newroomuser.nickname = nickname;
                newroomuser.status = 'online';
                const newRoomUser = db.ref('roomusers/').push();
                newRoomUser.set(newroomuser);
            }
        });

        history.push('/chatroom/' + roomname);
    }

    const logout = () => {
        localStorage.removeItem('nickname');
        history.push('/login');
    }

    return (
        <div>
            {showLoading &&
            <Spinner color="primary"/>
            }
            <Jumbotron>
                <h3>{nickname} <Button onClick={() => {
                    logout()
                }}>Logout</Button></h3>
                <h2>Room List</h2>
                <div>
                    <Link to="/addroom">Add Room</Link>
                </div>
                <ListGroup>
                    {room.map((item, idx) => (
                        <ListGroupItem key={idx} action onClick={() => {
                            enterChatRoom(item.roomname)
                        }}>{item.roomname}</ListGroupItem>
                    ))}
                </ListGroup>
            </Jumbotron>
        </div>
    );
}

export default RoomList;