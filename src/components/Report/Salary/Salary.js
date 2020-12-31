/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import ProTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllSalary } from '../../../store/salary/Action';
import './index.css';
import testAPI from '../../../untils/api';
import ExportCSV from './ExportCSV';
import Tablesalary from './TableSalary';

const Salary = (propSalaries) => {
  const [salariesList, setSalariesList] = useState([]);
  useEffect(() => {
    testAPI.post('/salaries/admin').then((data) => {
      propSalaries.getAllSalary(data.data.data);
    });
  },
  []);
  useEffect(() => {
    setSalariesList(propSalaries.salariesReport);
  },
  [propSalaries.salariesReport]);
  console.log('1231', salariesList);
  const handleChange = (e) => {
    console.log('handlechange', e.target.checked);
  };
  function splitBigNumber(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <div className="projectPage">
      <div className="topProject">
        <div className="dashBoardTitle">
          <h1 className="hiSoftText">Hisoft EMS</h1>
          <Button
            onClick={() => {
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
                <li>
                  <Link to="/employee">Nhân sự</Link>
                </li>
                <li>
                  <Link to="/project">
                    Dự án
                  </Link>
                </li>
                <li>
                  <Link to="/report/">
                    Báo cáo
                  </Link>
                  <ul className="test">
                    <li><Link to="/report/">OTS</Link></li>
                    <li>
                      <Link className="clickProject" to="/report/salary">Lương</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </Col>
            <Col xs={10} className="maintainEmployee">
              <div className="main-header d-flex justify-content-md-around">
                <h2>Bảng lương nhân viên</h2>

                <ExportCSV />

              </div>
              <Table striped bordered hover responsive className="hihi">
                <thead className="thead-project row-header">
                  <tr>
                    <th rowSpan={2}>STT</th>
                    <th rowSpan={2}>Tên</th>
                    <th rowSpan={2}>Vị trí</th>
                    <th rowSpan={2}>Lương cơ bản</th>
                    <th rowSpan={2}>Lương OT</th>
                    <th colSpan={2}>Trợ cấp</th>
                    <th rowSpan={2}>Tạm ứng</th>
                    <th rowSpan={2}>Tổng</th>
                    <th rowSpan={2}>Trạng thái</th>
                  </tr>
                  <tr rowSpan={1}>
                    <th colSpan={1}>Onsite</th>
                    <th colSpan={1}>Phương tiện</th>
                  </tr>
                </thead>
                <tbody>

                  {salariesList.length > 0 ? (
                    salariesList.map((report, index) => (
                      <tr id={index} className="text-center textinSalary">
                        <td>{index + 1}</td>
                        <td>{report.employeeInfo[0].name}</td>
                        <td>{report.employeeInfo[0].role}</td>
                        <td>{splitBigNumber(report.basicSalary)}</td>
                        <td>{splitBigNumber(report.ot)}</td>
                        <td>0</td>
                        <td>{splitBigNumber(report.salaryMember[0].travelexpenses)}</td>
                        <td>{splitBigNumber(report.advancePayment)}</td>
                        <td>{splitBigNumber(report.total)}</td>
                        <td>
                          <Form.Check aria-label="option 1" checked={report.state} onChange={handleChange} />
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
  );
};
Salary.ProTypes = {
  salariesReport: ProTypes.array.isRequired,
  getAllSalary: ProTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  salariesReport: state.salariesReducer.salaries,
});
export default connect(mapStateToProps, {
  getAllSalary,
})(Salary);
