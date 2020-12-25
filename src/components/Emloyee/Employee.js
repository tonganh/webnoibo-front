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
import { Link, useHistory } from 'react-router-dom';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import testAPI from '../../untils/api';
import { actionLogOut } from '../../store/login/Actions';
import {
  getEmployeesList, updateEmployeeList, addUsertoList, deleteUser,
} from '../../store/employees/Action';
import './index.css';

const qs = require('querystring');

const Employee = (propsEmployee) => {
  const [Employees, setEmployees] = useState([]);
  // console.log(propsEmployee.userLogin);
  const [searchState, setSearchState] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [notiState, setNotiState] = useState('');
  const [createModal, setCreateModal] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
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
  const format = (str) => {
    const s2 = str.split('-');
    return `${s2[2]}-${s2[1]}-${s2[0]}`;
  };
  if (Object.keys(propsEmployee.userLogin).length === 0) {
    history.push('/');
  }
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
    setEmployees(propsEmployee.employees.employees);
  }, [propsEmployee.employees.employees]);

  useEffect(() => {
    const results = propsEmployee.employees.employees.filter((user) => xoa_dau(user.name)
      .toLowerCase().includes(xoa_dau(searchTerm).toLowerCase())
      || xoa_dau(user.email)
        .toLowerCase().includes(xoa_dau(searchTerm).toLowerCase()));
    setSearchState(results);
  }, [searchTerm]);
  useEffect(() => {
    setSearchState(propsEmployee.employees.employees);
  }, [propsEmployee.employees.employees]);
  return (
    <Formik
      initialValues={{
        email: '', password: '', name: '', sinhnhat: '', dienthoai: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        testAPI.post(`/employees/${values.id}`, qs.stringify(values)).then((data) => {
          if (data.data.message === 'Email da ton tai.') {
            setNotiState('Email da ton tai.');
            setModalState(true);
          } else {
            setModalEdit(false);
            setNotiState('Thanh cong');
            propsEmployee.updateEmployeeList(data.data);
          }
        }).catch((err) => {
          setModalState(true);
          setNotiState('Lỗi của server.');
        });
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name must required';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be 8 characters long.';
        }
        if (!values.email) {
          errors.email = 'Email must required.';
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = 'Invalid email.';
        }
        if (!values.dienthoai) {
          errors.dienthoai = 'Required';
        } else if (values.dienthoai.length < 9) {
          errors.dienthoai = 'Phone number must be 8 characters long.';
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
        function resetState() {
          values.email = '';
          values.name = '';
          values.sinhnhat = '';
          values.password = '';
          values.dienthoai = '';
        }
        const createClick = (e) => {
          e.preventDefault();
          testAPI.post('/employees/register', qs.stringify(values)).then((data) => {
            if (data.data.message === 'User already exist.') {
              setNotiState('User already exist.');
              // setCreateModal(false);
              setModalState(true);
            } else {
              setNotiState('Successfull.');
              propsEmployee.addUsertoList(data.data);
              setCreateModal(false);
            }
          }).catch((err) => {
            setNotiState(err);
          });
        };
        const conFirmDelte = () => {
          // e.preventDefault();
          testAPI.post(`employees/deleteUser/${values.id}`).then((data) => {
            if (data.data.message === 'successfull') {
              propsEmployee.deleteUser(values.id);
              setDeleteModal(false);
            }
          });
        };
        const closeCreateModal = () => {
          setCreateModal(false);
        };
        const closeDeleteModal = () => {
          setDeleteModal(false);
        };

        return (
          <>
            <div className="EmployeePage">
              <div className="topProject">
                <div className="dashBoardTitle">
                  <h1 className="hiSoftText">
                    Hisoft EMS
                  </h1>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      propsEmployee.actionLogOut();
                    }}
                    className="_logOut"
                  >
                    Log Out
                  </Button>
                </div>
              </div>
              <div className="bodyDashboard">
                <Container fluid>
                  <Row>
                    <Col md={2} xs={12} className="FirstColumnInEmployee col-sm">
                      <ul className="test">
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        {
                          propsEmployee.userLogin.role === 'AD'
                            ? (
                              <li>
                                <Link to="/employee" className="link-Employees">Nhân sự</Link>
                              </li>
                            ) : (<p />)
                        }
                        <li>
                          <Link to="/project">Dự án</Link>
                        </li>
                        <li>Báo cáo</li>
                      </ul>
                    </Col>
                    <Col md={10} className="maintainEmployee">
                      <div className="main-header">
                        <h2>Danh sách nhân sự</h2>
                        {
                        propsEmployee.userLogin.role === 'AD'
                          ? (
                            <Row>
                              <Col md={6}>
                                <Button
                                  className="buttonDashBoard"
                                  onClick={() => {
                                    setCreateModal(true);
                                    resetState();
                                  }}
                                >
                                  Thêm mới
                                </Button>
                              </Col>
                              <Col md={{ span: 6, offset: 6 }} className=" m-auto d-flex justify-content-lg-end">
                                <InputGroup className="mb-3 search-header">
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
                      </div>
                      <Table responsive>
                        <thead>
                          <tr className="row-header" id={0}>
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
                                <tr id={index} className="row-employees">
                                  <td>{data.name || ''}</td>
                                  <td>{data.email || ''}</td>
                                  <td>{data.dienthoai}</td>
                                  <td>{format(data.sinhnhat)}</td>
                                  <td>
                                    <Button
                                      className="_button-edit"
                                      onClick={() => {
                                        Object.assign(values, data);
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
                      placeholder="Nhập tên"
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
                    <Form.Label htmlFor="password">Mật khẩu </Form.Label>
                    <Form.Control
                      id="password"
                      name="password"
                      type="text"
                      placeholder="Nhập mật khẩu"
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
                      placeholder="Nhập email"
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
                  <Form.Group>
                    <Form.Label htmlFor="email">Ngày sinh</Form.Label>
                    <Form.Control
                      id="date"
                      name="sinhnhat"
                      type="date"
                      value={values.sinhnhat}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="dienthoai">Điện thoại</Form.Label>
                    <Form.Control
                      id="dienthoai"
                      name="dienthoai"
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={values.dienthoai}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dienthoai && touched.dienthoai && 'error'
                      }
                    />
                    {errors.dienthoai && touched.dienthoai && (
                      <div className="input-feedback">{errors.dienthoai}</div>
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
                <Modal.Title>Tạo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate>
                  {/* Name */}
                  <Form.Group>
                    <Form.Label htmlFor="name">Tên thành viên mới:</Form.Label>
                    <Form.Control
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nhập tên"
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
                    <Form.Label htmlFor="name">Mật khẩu </Form.Label>
                    <Form.Control
                      id="password"
                      name="password"
                      type="text"
                      placeholder="Nhập mật khẩu"
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
                      placeholder="Nhập email"
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
                  {/* Date */}
                  <Form.Group>
                    <Form.Label htmlFor="email">Ngày sinh</Form.Label>
                    <Form.Control
                      id="date"
                      name="sinhnhat"
                      type="date"
                      value={values.sinhnhat}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {/* Dien thoai */}
                  <Form.Group>
                    <Form.Label htmlFor="dienthoai">Điện thoại</Form.Label>
                    <Form.Control
                      id="dienthoai"
                      name="dienthoai"
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={values.dienthoai}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dienthoai && touched.dienthoai && 'error'
                      }
                    />
                    {errors.dienthoai && touched.dienthoai && (
                      <div className="input-feedback">{errors.dienthoai}</div>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
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

            {/* notification modal */}
            <Modal
              show={modalState}
              onHide={() => {
                setModalState(false);
              }}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Thông báo từ Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>{notiState}</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalState(false);
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
  addUsertoList: ProTypes.func.isRequired,
  deleteUser: ProTypes.func.isRequired,
  actionLogOut: ProTypes.func.isRequired,
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
  actionLogOut,
})(Employee);
