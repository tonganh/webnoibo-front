/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Container,
  Row,
  Table,
  InputGroup,
  FormControl,
  Modal,
  Form,
} from 'react-bootstrap';

import ProTypes from 'prop-types';
import './index.css';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import { getProject } from '../../store/project/Action';
import { actionLogOut } from '../../store/login/actions';
import testAPI from '../../untils/api';

const Project = (propProject) => {
  const [projectState, setProjectState] = useState([]);
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [modalCreate, setModalCreate] = useState(false);
  useEffect(() => {
    setLoginData(propProject.loginReducer.userInfo);
    if (Object.keys(propProject.loginReducer.userInfo).length === 0) {
      history.push('/');
    }
  }, [propProject.loginReducer.userInfo]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
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
  useEffect(() => {
    if (propProject.loginReducer.userInfo.role === 'AD') {
      testAPI.get('projects/admin').then((data) => {
        propProject.getProject(data.data.data);
      });
    }
  }, [propProject.loginReducer.userInfo]);
  useEffect(() => {
    setProjectState(propProject.projectReducer.projects);
  }, [propProject.projectReducer.projects]);
  useEffect(() => {
    const results = propProject.projectReducer.projects.filter((user) => xoa_dau(user.name)
      .toLowerCase()
      .includes(xoa_dau(searchTerm).toLowerCase()));
    setProjectState(results);
  }, [searchTerm]);
  // Set employees in redux
  const format = (str) => {
    const s2 = str.split('-');
    return `${s2[2]}-${s2[1]}-${s2[0]}`;
  };
  const checkStaetPj = (str) => {
    if (str === 'Đang làm') {
      return 'danglam';
    }
    return 'xong';
  };
  // Thêm nhân sự vào dự án

  return (
    <Formik
      initialValues={{
        name: '',
        batdau: '',
        ketthuc: '',
        trangthai: '',
        thanhvien: [],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Nhập tên dự án.';
        }
        if (!values.batdau) {
          errors.batdau = 'Required';
        }
        if (!values.ketthuc) {
          errors.ketthuc = 'Required';
        }
        if (new Date(values.batdau) > new Date(values.ketthuc)) {
          errors.batdau = 'Thời gian bắt đầu phải trước thời gian kết thúc.';
          errors.ketthuc = 'Thời gian kết thúc  phải muộn hơn thời gian bắt đầu.';
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
          // handleSubmit,
        } = prop;
        return (
          <>
            <div className="projectPage">
              <div className="topProject">
                <div className="projectTitle">
                  <h1 className="hiSoftText">Hisoft EMS</h1>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      propProject.actionLogOut();
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
              <div className="bodyDashboard">
                <Container fluid>
                  <Row>
                    <Col xs={2} className="FirstColumnInDashBoard">
                      <div>
                        <Link to="/">Dashboard</Link>
                      </div>
                      {loginData.role === 'AD' ? (
                        <div>
                          <Link to="/employee">Nhân sự</Link>
                        </div>
                      ) : (
                        <p />
                      )}

                      <div>
                        <Link to="/project" className="linkToProject">
                          Dự án
                        </Link>
                      </div>
                      <div>
                        <p>Báo cáo</p>
                      </div>
                    </Col>
                    <Col xs={10} className="mainterDashBoard">
                      <h2>Danh sách dự án</h2>
                      <Row>
                        {loginData.role === 'AD' ? (
                          <Col md={4}>
                            <Button
                              className="buttonDashBoard"
                              onClick={() => {
                                setModalCreate(true);
                              }}
                            >
                              Thêm mới
                            </Button>
                          </Col>
                        ) : (
                          <p />
                        )}
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
                      <Table>
                        <thead className="thead-project text-center">
                          <tr>
                            <th>Tên</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày hoàn thành</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectState.length > 0 ? (
                            projectState.map((project) => (
                              <tr id={project.id}>
                                <td className="tbody-name text-center">
                                  {project.name}
                                </td>
                                <td className="tbody-start text-center">
                                  {format(project.batdau)}
                                </td>
                                <td className="tbody-finishDate text-center">
                                  {format(project.ketthuc)}
                                </td>
                                <td
                                  className={`tbody-state text-center ${checkStaetPj(
                                    project.trangthai,
                                  )}`}
                                >
                                  {project.trangthai}
                                </td>
                                <td className="tbody-hanhDong text-center">
                                  <Button className="_button-edit">Sửa</Button>
                                  <Button>Xóa</Button>
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
                setModalCreate(false);
              }}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Thêm dự án</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate>
                  {/* Name of project */}
                  <Form.Group>
                    <Form.Label htmlFor="name">New Name</Form.Label>
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
                  {/* Batdau */}
                  <Form.Group>
                    <Form.Label htmlFor="batdau">Bắt đầu</Form.Label>
                    <Form.Control
                      id="batdau"
                      name="batdau"
                      type="date"
                      value={values.batdau}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={errors.batdau && touched.batdau && 'error'}
                    />
                    {errors.batdau && touched.batdau && (
                      <div className="input-feedback">{errors.batdau}</div>
                    )}
                  </Form.Group>
                  {/* Ket thuc */}
                  <Form.Group>
                    <Form.Label htmlFor="ketthuc">Kết thúc</Form.Label>
                    <Form.Control
                      id="ketthuc"
                      name="ketthuc"
                      type="date"
                      value={values.ketthuc}
                      onChange={prop.handleChange}
                      onBlur={handleBlur}
                      className={errors.ketthuc && touched.ketthuc && 'error'}
                    />
                    {errors.ketthuc && touched.ketthuc && (
                      <div className="input-feedback">{errors.ketthuc}</div>
                    )}
                  </Form.Group>
                  {/* Trang thai */}
                  <Form.Label htmlFor="trangthai">Trạng thái</Form.Label>
                  <Form.Control
                    as="select"
                    name="trangthai"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                    value={values.trangthai}
                    onChange={handleChange}
                  >
                    <option value="Đang làm">Đang làm</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                  </Form.Control>
                  {/* Nhân sự */}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                // onClick={handleSubmit}
                >
                  Sửa
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log('123');
                    setModalCreate(false);
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
};
const mapStateToProps = (state) => ({
  projectReducer: state.projectReducer,
  loginReducer: state.loginReducer,
});
export default connect(mapStateToProps, {
  getProject,
  actionLogOut,
})(Project);
