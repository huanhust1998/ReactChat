import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "../Firebase";
import {Button, Form, FormGroup, Spinner, Jumbotron, Label, Input} from "reactstrap";

const db = firebase;

function Login() {

    const history = useHistory();
    const [creds, setCreds] = useState({nickname: ""});
    const [showLoading, setShowLoading] = useState(false);
    const ref = db.ref('users/')

    const onChange = (e) => {
        e.persist();
        setCreds({
            ...creds,
            nickname: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('nickname').equalTo(creds.nickname).once('value', snapshot => {
            setShowLoading(false);
            if (snapshot.exists()) {
                localStorage.setItem('nickname', creds.nickname);
                history.push('/roomlist');
            } else {
                const newUser = db.ref('users/').push();
                newUser.set(creds);
                localStorage.setItem('nickname', creds.nickname);
                history.push('/roomlist');
            }
        });
    };

    return (
        <div className="container-fluid">
            {showLoading &&
            <Spinner color="primary"/>
            }
            <Jumbotron>
                <Form onSubmit={login}>
                    <FormGroup>
                        <Label>Nickname
                            <Input type="text" name="nickname" id="nickname" placeholder="Enter Your Nickname"
                                   value={creds.nickname} onChange={onChange}/>
                        </Label>
                    </FormGroup>
                    <Button variant="primary" type="submit" className="mt-3 text-center">
                        Login
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    )
}

export default Login;