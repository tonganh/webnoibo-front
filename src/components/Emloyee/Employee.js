/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import {
  Button, Col, Container, Row, Table,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import { Link } from 'react-router-dom';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import testAPI from '../../untils/api';
import { getEmployeesList } from '../../store/employees/Action';

import './index.css';

const Employee = (prop) => {
  const Employees = prop.employees.employees;
  // console.log(prop.userLogin);

  useEffect(() => {
    if (prop.userLogin.role === 'AD') {
      testAPI.get('/employees/').then((data) => {
        prop.getEmployeesList(data.data);
      });
    }
  }, []);
  return (
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
              prop.userLogin.role === 'AD'
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
              prop.userLogin.role === 'AD'
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
                      Employees.map((data) => (
                        <tr id={data.id} className="row-header">
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>123</td>
                          <td>123</td>
                          <td>
                            <Button className="_button-edit">Sửa</Button>
                            <Button className="_button-delete btn-danger">Xóa</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr id={0}>
                        <td>Xin lỗi bạn không thể xem danh sách này.</td>
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
})(Employee);
