/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

import {
  Button, Col, Container, Row, Table, InputGroup, FormControl, Modal, Form,
} from 'react-bootstrap';

import ProTypes, { object } from 'prop-types';
import './index.css';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import Select from 'react-select';
import {
  getProject, addProject, deleteProject, updateProject,
} from '../../store/project/Action';
import { actionLogOut } from '../../store/login/Actions';
import testAPI from '../../untils/api';

const Project = (propProject) => {
  const [projectState, setProjectState] = useState([]);
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [modalCreate, setModalCreate] = useState(false);
  const [employeeUpdate, setEmployeeUpdate] = useState([]);
  const [employeeInProject, setEmployeeInProject] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [titleModal, setTitleModal] = useState({ title: '', button: '' });
  const [selectedUser, setSelectedUser] = useState([]);
  const format = (str) => {
    const s2 = str.split('-');
    return `${s2[2]}-${s2[1]}-${s2[0]}`;
  };
  const checkStaetPj = (str) => {
    if (str === 'Đang làm') {
      return 'badge bg-warning text-dark';
    }
    return 'badge bg-success';
  };
  const formatStr = (str) => {
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

  useEffect(() => {
    setLoginData(propProject.userlogin);
    if (Object.keys(propProject.userlogin).length === 0) {
      history.push('/');
    }
  }, [propProject.userlogin]);
  useEffect(() => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i of propProject.employees) {
      result.push({ value: i.id, label: i.name });
    }
    setEmployeeInProject(result);
  }, [propProject.employees]);
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    setProjectState(propProject.projectReducer.projects);
  }, [propProject.projectReducer.projects]);
  useEffect(() => {
    const results = propProject.projectReducer.projects.filter((user) => formatStr(user.name)
      .toLowerCase()
      .includes(formatStr(searchTerm).toLowerCase()));
    setProjectState(results);
  }, [searchTerm]);
  // Set employees in redux
  // Thêm nhân sự vào dự án
  return (
    <Formik
      initialValues={{
        _id: '',
        name: '',
        start: '',
        end: '',
        state: '',
        members: [],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Nhập tên dự án.';
        }
        if (!values.start) {
          errors.start = 'Required';
        }
        if (!values.end) {
          errors.end = 'Required';
        }
        if (new Date(values.start) > new Date(values.end)) {
          errors.start = 'Thời gian bắt đầu phải trước thời gian kết thúc.';
          errors.end = 'Thời gian kết thúc  phải muộn hơn thời gian bắt đầu.';
        }
        return errors;
      }}
    >
      {(prop) => {
        const {
          values,
          touched,
          errors,
          // isSubmitting,
          handleChange,
          handleBlur,
          // handleSubmit,
        } = prop;
        function resetValues() {
          values._id = '';
          values.name = '';
          values.start = '';
          values.end = '';
          values.state = '';
          values.members = [];
        }
        const onClickSend = () => {
          values.members = [];
          for (const i of employeeUpdate) {
            values.members.push(`${i.value}`);
          }
          console.log('employeeUpdate', employeeUpdate);
          console.log('values', values);
          if (Object.keys(errors).length === 0) {
            if (titleModal.title === 'Thêm dự án') {
              testAPI.post('/projects/create', values).then((data) => {
                resetValues();
                propProject.addProject(data.data.data[0]);
                setModalCreate(false);
              }).catch((err) => {
              });
            } else {
              testAPI.post(`/projects/update/${values._id}`, values).then((data) => {
                resetValues();
                propProject.updateProject(data.data.data[0]);
                setModalCreate(false);
              }).catch((err) => {
              });
            }
          }
        };
        const confirmDelete = () => {
          testAPI.post(`projects/delete/${values._id}`).then((data) => {
            propProject.deleteProject(values._id);
            setModalDelete(false);
            resetValues();
          }).catch((err) => {
          });
        };
        return (
          <>
            <div className="projectPage">
              <div className="topProject">
                <div className="dashBoardTitle">
                  <h1 className="hiSoftText">Hisoft EMS</h1>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      propProject.actionLogOut();
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
                    <Col xs={2} className="FirstColumnInProject">
                      <ul className="test">
                        <li>
                          <Link to="/dashboard" className="link-dashboard">
                            Dashboard
                          </Link>
                        </li>
                        {loginData.role === 'AD' ? (
                          <li>
                            <Link to="/employee">Nhân sự</Link>
                          </li>
                        ) : (
                          <p />
                        )}
                        <li>
                          <Link to="/project" className="clickProject">
                            Dự án
                          </Link>
                        </li>
                        <li>
                          <Link to="/report">Báo cáo</Link>
                        </li>
                      </ul>
                    </Col>
                    <Col xs={10} className="maintainEmployee">
                      <div className="main-header">
                        <h2>Danh sách dự án</h2>
                        <Row>
                          {loginData.role === 'AD' ? (
                            <Col md={6}>
                              <Button
                                className="buttonDashBoard"
                                onClick={() => {
                                  setTitleModal({ title: 'Thêm dự án', button: 'Thêm' });
                                  setModalCreate(true);
                                }}
                              >
                                Thêm mới
                              </Button>
                            </Col>
                          ) : (
                            <p />
                          )}
                          <Col md={{ span: 6, offset: 6 }} className=" m-auto d-flex justify-content-lg-end col-md-6 offset-md-6">
                            <InputGroup className="mb-3 search-header">
                              <FormControl
                                placeholder="Tìm kiếm"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className="input-search flex-grow-9 "
                                onChange={handleChangeSearch}
                                value={searchTerm}
                              />
                              <Button className="button-search">
                                <i className="fas fa-search" />
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                      </div>
                      <Table>
                        <thead className="thead-project row-header">
                          <tr>
                            <th colSpan="2">Tên</th>
                            <th colSpan="2">Ngày bắt đầu</th>
                            <th colSpan="2">Ngày hoàn thành</th>
                            <th colSpan="2" className="text-center">Trạng thái</th>
                            <th colSpan="2" className="text-center">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectState.length > 0 ? (
                            projectState.map((project) => (
                              <tr id={project._id} className="_pj-row">
                                <td className="tbody-name md-col-2" colSpan="2">
                                  {project.name}
                                </td>
                                <td className="tbody-start md-col-2" colSpan="2">
                                  {format(project.start)}
                                </td>
                                <td className="tbody-finishDate md-col-2" colSpan="2">
                                  {format(project.end)}
                                </td>
                                <td className="tbody-state  text-center md-col-2" colSpan="2">
                                  <span
                                    className={`${checkStaetPj(
                                      project.state,
                                    )} fontSizeInState`}
                                  >
                                    {project.state}
                                  </span>
                                </td>
                                <td className="tbody-hanhDong md-col-2 text-center" colSpan="2">
                                  <Button
                                    className="_button-edit btn btn-primary"
                                    onClick={() => {
                                      setTitleModal({ title: 'Sửa', button: 'Sửa' });
                                      setModalCreate(true);
                                      const result = [];
                                      // eslint-disable-next-line no-restricted-syntax
                                      if (project.memberInProject.length !== 0) {
                                        for (const i of project.memberInProject) {
                                          result.push({ value: i._id, label: i.name });
                                        }
                                      }
                                      Object.assign(values, project);
                                      setSelectedUser(result);
                                    }}
                                  >
                                    Sửa
                                  </Button>
                                  <Button
                                    className="_button-delete btn-danger"
                                    onClick={() => {
                                      Object.assign(values, project);
                                      // console.log('values', values);
                                      setModalDelete(true);
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <th>End</th>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            {/* Modal create project */}
            <Modal
              show={modalCreate}
              onHide={() => {
                resetValues();
                setModalCreate(false);
              }}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{titleModal.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate>
                  {/* Name of project */}
                  <Form.Group>
                    <Form.Label htmlFor="name">Tên dự án</Form.Label>
                    <Form.Control
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nhập tên"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name && 'error'}
                    />
                    {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Group>
                  {/* start */}
                  <Form.Group>
                    <Form.Label htmlFor="start">Bắt đầu</Form.Label>
                    <Form.Control
                      id="start"
                      name="start"
                      type="date"
                      value={values.start}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={errors.start && touched.start && 'error'}
                    />
                    {errors.start && touched.start && (
                    <div className="input-feedback">{errors.start}</div>
                    )}
                  </Form.Group>
                  {/* Ket thuc */}
                  <Form.Group>
                    <Form.Label htmlFor="end">Kết thúc</Form.Label>
                    <Form.Control
                      id="end"
                      name="end"
                      type="date"
                      value={values.end}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={errors.end && touched.end && 'error'}
                    />
                    {errors.end && touched.end && (
                    <div className="input-feedback">{errors.end}</div>
                    )}
                  </Form.Group>
                  {/* Trang thai */}
                  <Form.Label htmlFor="state">Trạng thái</Form.Label>
                  <Form.Control
                    as="select"
                    name="state"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                    onChange={handleChange}
                    value={values.state}
                    defaultValue="Chọn trạng thái."
                  >
                    <option value="...">...</option>
                    <option value="Đang làm">Đang làm</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                  </Form.Control>
                  {/* Nhân sự */}
                  <Form.Label htmlFor="Thành viên">Thành viên</Form.Label>
                  <Select
                    isMulti
                    name="colors"
                    options={employeeInProject}
                    defaultValue={[...selectedUser]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(data) => {
                      console.log('data in change', data);
                      setEmployeeUpdate(data);
                    }}
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={onClickSend}
                >
                  {titleModal.button}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetValues();
                    setModalCreate(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Modal delete */}
            <Modal
              show={modalDelete}
              onHide={() => {
                setModalDelete(false);
              }}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Thông báo từ Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>Chắc chắn muốn xóa.</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={confirmDelete}
                  className="btn-danger btn"
                >
                  Xóa
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalDelete(false);
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

Project.ProTypes = {
  projectReducer: ProTypes.array.isRequired,
  loginReducer: ProTypes.objectOf(ProTypes.object).isRequired,
  actionLogOut: ProTypes.func.isRequired,
  getProject: ProTypes.func.isRequired,
  addProject: ProTypes.func.isRequired,
  deleteProject: ProTypes.func.isRequired,
  userlogin: ProTypes.objectOf(ProTypes.object).isRequired,
  employees: ProTypes.objectOf(ProTypes.object).isRequired,
  updateProject: ProTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  projectReducer: state.projectReducer,
  userlogin: state.loginReducer.userInfo,
  employees: state.employees.employees,
});
export default connect(mapStateToProps, {
  getProject,
  actionLogOut,
  addProject,
  deleteProject,
  updateProject,
})(Project);
