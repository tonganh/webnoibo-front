/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';
// import { Form } from 'react-bootstrap';

/* eslint-disable react/react-in-jsx-scope */
const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const handleChanger = (e) => {
    e.preventDefault();
  };
  return (
    <div className="test-login">
      <div className="signup">
        <h1 className="signup-heading">Sign up</h1>
        <Form className="signup-form">
          <Form.Group controlId="usernameInput">
            <Form.Label className="signup-label">
              User name
            </Form.Label>
            <Form.Control className="signup-input" type="text" placeholder="Enter the user name" />
          </Form.Group>
          <Form.Group controlId="passwordInput">
            <Form.Label className="signup-label">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" className="signup-input" />
          </Form.Group>
          <Link className="signup-submit" to="/project">Đăng nhập</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
