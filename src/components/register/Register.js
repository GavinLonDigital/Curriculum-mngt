import './Register.css';
import {useState, useRef, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../../api/axiosConfig';

import React from 'react'

const Register = () => {
    const nameRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [user, setUser] = useState('');
    const [validUserName, setValidUserName] = useState(false);

    const [pwd,setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const NAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

    const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    const PWD_REGX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const [submitSuccess, setSubmitSuccess] = useState("");

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    useEffect(()=>{
        const result = NAME_REGEX.test(name);
        setValidName(result);

    },[name])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        setValidUserName(result);

    },[user])

    useEffect(()=>{
        const result = PWD_REGX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);

    },[pwd,matchPwd])


    const postData = async (e) =>
    {
      e.preventDefault();
      try{
        
       const userReg = 
        {
            name: e.target.name.value,
            username: e.target.username.value,
            roles: "ROLE_USER",
            password: e.target.password.value
        };
        
        const resp = await axiosClient.post('/api/v1/auth/register', userReg);

        setSubmitSuccess("You have registered successfully");
        
      } 
      catch(error)
      {
        console.log(error);
        setSubmitSuccess("You have not registered successfully " + error);
      } 

    
    }


  return (
    <Container>
      <header>
        <h4>Register</h4>
      </header>
      <main className="register-container">
        <div className="register-layout">
            <Form onSubmit={postData}>
                <Form.Group className = "mb-2" controlId="formBasicName">
                    <Form.Label>Name:
                        <span className={validName?"valid":"hide"}>
                            <FontAwesomeIcon icon={faCheck} className='valid-icon' />
                        </span>
                        <span className={validName || !name ?"hide":"valid"}>
                            <FontAwesomeIcon icon={faTimes} className='invalid-icon' />
                        </span>
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Name'
                        id="name"
                        ref={nameRef}
                        autoComplete="off"
                        onChange = {(e) => setName(e.target.value)}
                        required
                     />

                </Form.Group>
                <Form.Group className = "mb-2" controlId="formBasicUserName">
                    <Form.Label>Username:
                        <span className={validUserName?"valid":"hide"}>
                            <FontAwesomeIcon icon={faCheck} className='valid-icon' />
                        </span>
                        <span className={validUserName || !user ?"hide":"valid"}>
                            <FontAwesomeIcon icon={faTimes} className='invalid-icon' />
                        </span>
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Username'
                        id="username"
                        autoComplete="off"
                        onChange = {(e) => setUser(e.target.value)}
                        required
                     />

                </Form.Group>
                <Form.Group className = "mb-2" controlId="formBasicPassword">
                    <Form.Label>Password:
                        <span className={validPwd?"valid":"hide"}>
                            <FontAwesomeIcon icon={faCheck} className='valid-icon' />
                        </span>
                        <span className={validPwd || !pwd ?"hide":"valid"}>
                            <FontAwesomeIcon icon={faTimes} className='invalid-icon' />
                        </span>
                    </Form.Label>
                    <Form.Control type="password" placeholder='Enter Password'
                        id="password"
                        autoComplete="off"
                        onChange = {(e) => setPwd(e.target.value)}
                        required
                     />

                </Form.Group>
                <Form.Group className = "mb-2" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password:
                        <span className={validMatch && matchPwd?"valid":"hide"}>
                            <FontAwesomeIcon icon={faCheck} className='valid-icon' />
                        </span>
                        <span className={validMatch || !matchPwd ?"hide":"valid"}>
                            <FontAwesomeIcon icon={faTimes} className='invalid-icon' />
                        </span>
                    </Form.Label>
                    <Form.Control type="password" placeholder='Confirm Password'
                        id="confirm_pwd"
                        autoComplete="off"
                        onChange = {(e) => setMatchPwd(e.target.value)}
                        required
                     />
                </Form.Group>
                <Button disabled = {!validName || !validUserName || !validPwd || !validMatch ? true : false} variant="info" type="submit">
                    Submit 
                </Button>
            </Form>
            {
                (submitSuccess)?
                <section className='register-message'>
                    {submitSuccess}
                </section>
                :null
            }
        </div>
      </main>
    </Container>
  )
}

export default Register
