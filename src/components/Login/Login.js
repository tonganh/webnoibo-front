/* eslint-disable import/order */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ProTypes from 'prop-types';
import testAPI from '../../untils/api';
import './index.css';
// eslint-disable-next-line import/no-unresolved
import { connect } from 'react-redux';
// import { Formik } from 'formik';
// eslint-disable-next-line import/no-unresolved
import { useHistory } from 'react-router-dom';
import { getEmployeesList } from '../../store/employees/Action';

const qs = require('querystring');
// import { Form } from 'react-bootstrap';

/* eslint-disable react/react-in-jsx-scope */
const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(initialState);
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setUserLogin({ ...userLogin, [e.target.name]: value });
  };
  // eslint-disable-next-line no-unused-vars
  const clickLogin = (e) => {
    e.preventDefault();
    testAPI.post('/login/', qs.stringify(userLogin)).then((data) => {
      console.log(data);
    }).then(() => {
      history.push('/employee');
    });
  };
  return (
    <div className="test-login">
      <div className="signup">
        <h1 className="signup-heading">Sign up</h1>
        <Form className="signup-form">
          <Form.Group controlId="usernameInput">
            <Form.Label className="signup-label">
              Email
            </Form.Label>
            <Form.Control value={userLogin.email} className="signup-input" type="text" placeholder="Enter the user name" name="email" onChange={handleChangeInput} />
          </Form.Group>
          <Form.Group controlId="passwordInput">
            <Form.Label className="signup-label">Password</Form.Label>
            <Form.Control type="password" value={userLogin.password} placeholder="Enter your password" className="signup-input" name="password" onChange={handleChangeInput} />
          </Form.Group>
          <Button className="signup-submit" onClick={clickLogin}>Đăng nhập</Button>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  getEmployeesList: ProTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  employees: state.employees,
});
export default connect(mapStatetoProps, {
  getEmployeesList,
})(Login);
