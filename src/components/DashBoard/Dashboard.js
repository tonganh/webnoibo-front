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
import testAPI from '../../untils/api';
import { actionLogOut } from '../../store/login/Actions';
import { getProject } from '../../store/project/Action';
import { getAllOts } from '../../store/ots/Action';
import {
  getEmployeesList, updateEmployeeList, addUsertoList, deleteUser,
} from '../../store/employees/Action';
import './index.css';

const qs = require('querystring');

const Dashboard = (propsEmployee) => {
  const [modalState, setModalState] = useState(false);
  const [notiState, setNotiState] = useState('');
  const history = useHistory();
  if (Object.keys(propsEmployee.userLogin).length === 0) {
    history.push('/');
  }
  useEffect(() => {
    if (propsEmployee.userLogin.role === 'AD') {
      testAPI.get('/employees/').then((data) => {
        // eslint-disable-next-line no-unused-expressions
        propsEmployee.getEmployeesList(data.data);
      });
    }
  }, []);
  useEffect(() => {
    if (propsEmployee.userLogin.role === 'AD') {
      testAPI.post('/ots/getAll').then((data) => {
        // eslint-disable-next-line no-unused-expressions
        propsEmployee.getAllOts(data.data.data);
      });
    }
  }, []);
  useEffect(() => {
    if (propsEmployee.userLogin.role === 'AD') {
      testAPI.get('projects/admin').then((data) => {
        propsEmployee.getProject(data.data.data);
      });
    }
  }, [propsEmployee.loginReducer]);
  return (
    <Formik
      initialValues={{
        email: '', password: '', name: '', sinhnhat: '', dienthoai: '',
      }}
    >
      {(prop) => {
        const {
          values,
        } = prop;
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
                    <Col md={2} xs={12} className="FirstColumnInDashBoard col-sm">
                      <ul className="test">
                        <li>
                          <Link to="/dashboard" className="link-dashboard">Dashboard</Link>
                        </li>
                        {
                          propsEmployee.userLogin.role === 'AD'
                            ? (
                              <li>
                                <Link to="/employee">Nhân sự</Link>
                              </li>
                            ) : (<p />)
                        }
                        <li>
                          <Link to="/project">Dự án</Link>
                        </li>
                        <li>
                          <Link to="/report">Báo cáo</Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md={10} className="mainterDashBoard">
                      <div className="Rectangle-22 md-col-6">
                        <div className="md-col-6">
                          <i className="fas fa-people-carry" />
                        </div>
                        <div className="md-col-6 text-center">
                          <h1>Nhân viên</h1>
                          <h1>{propsEmployee.employees.employees.length}</h1>
                        </div>
                      </div>
                      <div className="Rectangle-22 md-col-6">
                        <div className="md-col-6">
                          <i className="fas fa-people-carry" />
                        </div>
                        <div className="md-col-6 text-center">
                          <h1>Dự án</h1>
                          <h1>{propsEmployee.projects.length}</h1>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
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
Dashboard.ProTypes = {
  employees: ProTypes.array.isRequired,
  getEmployeesList: ProTypes.func.isRequired,
  userLogin: ProTypes.object.isRequired,
  addUsertoList: ProTypes.func.isRequired,
  deleteUser: ProTypes.func.isRequired,
  actionLogOut: ProTypes.func.isRequired,
  getProject: ProTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  employees: state.employees,
  userLogin: state.loginReducer.userInfo,
  projects: state.projectReducer.projects,
  ots: state.otsReducer.reportOts,
});
export default connect(mapStatetoProps, {
  getEmployeesList,
  updateEmployeeList,
  addUsertoList,
  deleteUser,
  actionLogOut,
  getProject,
  getAllOts,
})(Dashboard);
