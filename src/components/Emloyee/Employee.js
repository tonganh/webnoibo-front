/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Modal, Row, Table,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import { Link } from 'react-router-dom';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import testAPI from '../../untils/api';
import { getEmployeesList, updateEmployeeList } from '../../store/employees/Action';
import './index.css';

const qs = require('querystring');

const Employee = (propsEmployee) => {
  const Employees = propsEmployee.employees.employees;
  // console.log(propsEmployee.userLogin);
  const [updateState, setUpdateState] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [notiState, setNotiState] = useState('');
  useEffect(() => {
    if (propsEmployee.userLogin.role === 'AD') {
      testAPI.get('/employees/').then((data) => {
        propsEmployee.getEmployeesList(data.data);
      });
    }
  }, []);
  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        testAPI.post(`/employees/${values.id}`, qs.stringify(values)).then((data) => {
          console.log('data', data);
          if (data.data.message === 'Email da ton tai.') {
            setNotiState('Dang nhap that bai.');
            setModalState(true);
          } else {
            setModalEdit(false);
            setNotiState('Thanh cong');
            console.log('data', data.data);
            propsEmployee.updateEmployeeList(data.data);
          }
        }).catch((err) => {
          setModalEdit(false);
          setNotiState('Loi gi do.');
        });
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email must required.';
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = 'Invalid email.';
        }
        if (!values.name) {
          errors.name = 'Name must required';
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
          <>
            <div className="EmployeePage">
              <div className="topProject">
                <div className="projectTitle">
                  <h1 className="hiSoftText">
                    Hisoft EMS
                  </h1>
                </div>
              </div>
              <div className="bodyDashboard">
                <Container fluid>
                  <Row>
                    <Col xs={2} className="FirstColumnInDashBoard">
                      <div className="test">
                        <div>
                          <Link to="/employee">Dashboard</Link>
                        </div>
                        {
                          propsEmployee.userLogin.role === 'AD'
                            ? (
                              <div>
                                <Link to="/employee" className="link-Employees">Nhân sự</Link>
                              </div>
                            ) : (<p />)
                        }

                        <div>
                          <Link to="/project">Dự án</Link>
                        </div>
                        <div>
                          <p>Báo cáo</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={10} className="mainterDashBoard">
                      <h2>Danh sách nhân sự</h2>
                      {
                        propsEmployee.userLogin.role === 'AD'
                          ? (<Button className="buttonDashBoard">Thêm mới</Button>) : (<p />)
                      }
                      <Table>
                        <thead>
                          <tr className="row-header">
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày sinh</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Employees.length > 0 ? (
                              Employees.map((data, index) => (
                                <tr id={index} className="row-header">
                                  <td>{data.name}</td>
                                  <td>{data.email}</td>
                                  <td>123</td>
                                  <td>123</td>
                                  <td>
                                    <Button
                                      className="_button-edit"
                                      onClick={() => {
                                        Object.assign(values, Employees[index]);
                                        setModalEdit(true);
                                      }}
                                    >
                                      Sửa
                                    </Button>
                                    <Button className="_button-delete btn-danger">Xóa</Button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr id={0}>
                                <td>Have some trouble</td>
                              </tr>
                            )
                          }
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            <Modal
              show={modalEdit}
              onHide={() => {
                setModalEdit(false);
              }}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group>
                    <Form.Label htmlFor="password">New Name</Form.Label>
                    <Form.Control
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name && 'error'
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Group>
                  {/* Password */}
                  <Form.Group>
                    <Form.Label htmlFor="password">Password </Form.Label>
                    <Form.Control
                      id="password"
                      name="password"
                      type="text"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password && 'error'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Group>
                  {/* email */}
                  <Form.Group>
                    <Form.Label htmlFor="email">New Email</Form.Label>
                    <Form.Control
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email && 'error'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Sửa
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalEdit(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }}
    </Formik>
  );
};
Employee.ProTypes = {
  employees: ProTypes.array.isRequired,
  getEmployeesList: ProTypes.func.isRequired,
  userLogin: ProTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  employees: state.employees,
  userLogin: state.loginReducer.userInfo,
});
export default connect(mapStatetoProps, {
  getEmployeesList,
  updateEmployeeList,
})(Employee);

// return (
//   <>
//   <div className="EmployeePage">
//     <div className="topProject">
//       <div className="projectTitle">
//         <h1 className="hiSoftText">
//           Hisoft EMS
//         </h1>
//       </div>
//     </div>
//     <div className="bodyDashboard">
//       <Container fluid>
//         <Row>
//           <Col xs={2} className="FirstColumnInDashBoard">
//             <div className="test">
//               <div>
//                 <Link to="/employee">Dashboard</Link>
//               </div>
//               {
//         prop.userLogin.role === 'AD'
//           ? (
//             <div>
//               <Link to="/employee" className="link-Employees">Nhân sự</Link>
//             </div>
//           ) : (<p />)
//       }

//               <div>
//                 <Link to="/project">Dự án</Link>
//               </div>
//               <div>
//                 <p>Báo cáo</p>
//               </div>
//             </div>
//           </Col>
//           <Col xs={10} className="mainterDashBoard">
//             <h2>Danh sách nhân sự</h2>
//             {
//         prop.userLogin.role === 'AD'
//           ? (<Button className="buttonDashBoard">Thêm mới</Button>) : (<p />)
//       }
//             <Table>
//               <thead>
//                 <tr className="row-header">
//                   <th>Tên</th>
//                   <th>Email</th>
//                   <th>Số điện thoại</th>
//                   <th>Ngày sinh</th>
//                   <th>Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//               Employees.length > 0 ? (
//                 Employees.map((data, index) => (
//                   <tr id={index} className="row-header">
//                     <td>{data.name}</td>
//                     <td>{data.email}</td>
//                     <td>123</td>
//                     <td>123</td>
//                     <td>
//                       <Button
//                         className="_button-edit"
//                         onClick={() => {
//                           setUpdateState(Employees[index]);
//                           setModalEdit(true);
//                         }}
//                       >
//                         Sửa
//                       </Button>
//                       <Button className="_button-delete btn-danger">Xóa</Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr id={0}>
//                   <td>Have some trouble</td>
//                 </tr>
//               )
//             }
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   </div>
//   <Modal
//     show={modalEdit}
//     onHide={() => {
//       setModalEdit(false);
//     }}
//     aria-labelledby="contained-modal-title-vcenter"
//     centered
//   >
//     <Modal.Header closeButton>
//       <Modal.Title>Edit</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form>
//         <Form.Group>

//           <Form.Label htmlFor="name">
//             Name
//           </Form.Label>

//         </Form.Group>

//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button
//         variant="secondary"
//         onClick={() => {
//           setModalEdit(false);
//         }}
//       >
//         Close
//       </Button>
//     </Modal.Footer>
//   </Modal>
// </>)
