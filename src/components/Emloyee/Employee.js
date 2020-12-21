/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, FormControl, InputGroup, Modal, Row, Table,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import { Link } from 'react-router-dom';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import testAPI from '../../untils/api';
import {
  getEmployeesList, updateEmployeeList, addUsertoList, deleteUser,
} from '../../store/employees/Action';
import './index.css';

const qs = require('querystring');

const Employee = (propsEmployee) => {
  const Employees = propsEmployee.employees.employees;
  // console.log(propsEmployee.userLogin);
  const [updateState, setUpdateState] = useState({});
  const [searchState, setSearchState] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [notiState, setNotiState] = useState('');
  const [createModal, setCreateModal] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  };
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (propsEmployee.userLogin.role === 'AD') {
      testAPI.get('/employees/').then((data) => {
        // eslint-disable-next-line no-unused-expressions
        propsEmployee.getEmployeesList(data.data);
        setSearchState(data.data);
      });
    }
  }, []);
  useEffect(() => {
    const results = Employees.filter((user) => xoa_dau(user.name)
      .toLowerCase().includes(xoa_dau(searchTerm).toLowerCase()));
    console.log('result', results);
    setSearchState(results);
  }, [searchTerm]);
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
        const createClick = (e) => {
          e.preventDefault();
          testAPI.post('/employees/register', qs.stringify(values)).then((data) => {
            if (data.message === 'User already exist.') {
              setNotiState('User already exist.');
              setCreateModal(false);
              setNotiState(true);
            } else {
              setNotiState('Successfull.');
              propsEmployee.addUsertoList(data.data);
              setCreateModal(false);
              setNotiState(true);
            }
          }).then((err) => setNotiState(err));
        };
        const conFirmDelte = () => {
          // e.preventDefault();
          testAPI.post(`employees/deleteUser/${values.id}`).then((data) => {
            console.log('data', data);
            if (data.data.message === 'successfull') {
              propsEmployee.deleteUser(values.id);
              setDeleteModal(false);
            }
          });
        };
        const closeCreateModal = () => {
          setCreateModal(false);
          values.email = '';
          values.password = '';
          values.name = '';
        };
        const closeDeleteModal = () => {
          setDeleteModal(false);
        };
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
                          ? (
                            <Row>
                              <Col md={4}>
                                <Button
                                  className="buttonDashBoard"
                                  onClick={() => {
                                    setCreateModal(true);
                                    values.email = '';
                                    values.password = '';
                                    values.name = '';
                                  }}
                                >
                                  Thêm mới
                                </Button>
                              </Col>
                              <Col md={{ span: 4, offset: 4 }} className=" m-auto">
                                <InputGroup className="mb-3">
                                  <FormControl
                                    placeholder="Tìm kiếm"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className="input-search flex-grow-9"
                                    onChange={handleChangeSearch}
                                    value={searchTerm}
                                  />
                                  <Button className="button-search">
                                    <i className="fas fa-search" />
                                  </Button>
                                </InputGroup>
                              </Col>
                            </Row>
                          ) : (<p />)
                      }
                      <Table>
                        {/* <Button
                                  className="buttonDashBoard"
                                  onClick={() => {
                                    setCreateModal(true);
                                    values.email = '';
                                    values.password = '';
                                    values.name = '';
                                  }}
                                >
                                  Thêm mới
                                </Button> */}
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
                            searchState.length > 0 ? (
                              searchState.map((data, index) => (
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
                                    <Button
                                      className="_button-delete btn-danger"
                                      onClick={() => {
                                        Object.assign(values, Employees[index]);
                                        setDeleteModal(true);
                                      }}
                                    >
                                      Xóa
                                    </Button>
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
            {/* Modal Edit user */}
            <Modal
              show={modalEdit}
              onHide={() => {
                setModalEdit(false);
                values.email = '';
                values.password = '';
                values.name = '';
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
            {/* Modal create user */}
            <Modal
              show={createModal}
              onHide={closeCreateModal}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Create</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate>
                  {/* Name */}
                  <Form.Group>
                    <Form.Label htmlFor="password">Name</Form.Label>
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
                    <Form.Label htmlFor="email">Email</Form.Label>
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
                  onClick={createClick}
                >
                  Thêm
                </Button>
                <Button
                  variant="secondary"
                  onClick={closeCreateModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Modal delete user */}
            <Modal
              show={deleteModal}
              onHide={closeDeleteModal}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >

              <Modal.Header closeButton>
                <Modal.Title>Delte</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>
                  Chắc chắn delete user.
                </Modal.Title>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={
                    conFirmDelte

                  }
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={closeDeleteModal}

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
  addUsertoList: ProTypes.func.isRequired,
  deleteUser: ProTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  employees: state.employees,
  userLogin: state.loginReducer.userInfo,
});
export default connect(mapStatetoProps, {
  getEmployeesList,
  updateEmployeeList,
  addUsertoList,
  deleteUser,
})(Employee);
