/* eslint-disable import/named */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ProTypes from 'prop-types';
import testAPI from '../../untils/api';
import './index.css';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/employees/Action';
import { useHistory } from 'react-router-dom';
// import { Form } from 'react-bootstrap';

/* eslint-disable react/react-in-jsx-scope */
const Login = (props) => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const clickLogin = (e) => {
    e.preventDefault();
    testAPI.get('/employees/').then((data) => {
      console.log(data);
      props.getAllUsers(data.data);
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
              User name
            </Form.Label>
            <Form.Control className="signup-input" type="text" placeholder="Enter the user name" />
          </Form.Group>
          <Form.Group controlId="passwordInput">
            <Form.Label className="signup-label">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" className="signup-input" />
          </Form.Group>
          {/* <Link className="signup-submit" to="/project">Đăng nhập</Link> */}
          <Button className="signup-submit" onClick={clickLogin}>Đăng nhập</Button>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  // users: ProTypes.array.isRequired,
  getAllUsers: ProTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  users: state.users,
});
export default connect(mapStatetoProps, {
  getAllUsers,
})(Login);
