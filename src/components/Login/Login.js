/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/order */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ProTypes from 'prop-types';
import testAPI from '../../untils/api';
import './index.css';
// eslint-disable-next-line import/no-unresolved
import { connect } from 'react-redux';
import { Formik } from 'formik';
// eslint-disable-next-line import/no-unresolved
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getEmployeesList } from '../../store/employees/Action';
import { actionLogin } from '../../store/login/Actions';

const qs = require('querystring');
// import { Form } from 'react-bootstrap';

/* eslint-disable react/react-in-jsx-scope */
const initialState = {
  email: '',
  password: '',
};
const Login = (propsLogin) => {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setUserLogin({ ...userLogin, [e.target.name]: value });
  };
  // eslint-disable-next-line no-unused-vars
  const clickLogin = (e) => {
    e.preventDefault();
    testAPI.post('/login/', qs.stringify(userLogin)).then((data) => {
      console.log(data);
      propsLogin.userLogin(data.data[0]);
    }).then(() => {
      history.push('/employee');
    });
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        testAPI.post('/login/', qs.stringify(values)).then((data) => {
          console.log(data);
          propsLogin.actionLogin(data.data);
        });
        // .then(() => {
        //   history.push('/employee');
        // });
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email must required.';
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = 'Invalid email.';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be 8 characters long.';
        }
        return errors;
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 chars minimum.'),
      })}
    >
      {(prop) => {
        const {
          values,
          touched,
          errors,
          // isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = prop;
        return (
          <div className="test-login">
            <div className="signup">
              <h1 className="signup-heading">Sign up</h1>
              <Form className="signup-form" noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="usernameInput">
                  <Form.Label className="signup-label">
                    Email
                  </Form.Label>
                  <Form.Control onBlur={handleBlur} value={values.email} className={errors.email && touched.email && 'error'} type="text" placeholder="Enter the user name" name="email" onChange={handleChange} />
                  {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                  )}

                </Form.Group>
                <Form.Group controlId="passwordInput">
                  <Form.Label className="signup-label">Password</Form.Label>
                  <Form.Control type="password" onBlur={handleBlur} value={values.password} placeholder="Enter your password" className={errors.password && touched.password && 'error'} name="password" onChange={handleChange} />
                  {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Group>
                <Button className="signup-submit" type="submit">Đăng nhập</Button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

Login.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  getEmployeesList: ProTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  actionLogin: ProTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  employees: state.employees,
  loginReducer: state.loginReducer,
});
export default connect(mapStatetoProps, {
  getEmployeesList,
  actionLogin,
})(Login);
