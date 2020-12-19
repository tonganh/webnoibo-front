/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

import React from 'react';
import {
  Button, Col, Container, Row, Table,
} from 'react-bootstrap';
import './index.css';

const Employee = () => (
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
            <div>
              <p>Dashboard</p>
            </div>
            <div>
              <p>Nhân sự</p>
            </div>
            <div>
              <p>Dự án</p>
            </div>
            <div>
              <p>Báo cáo</p>
            </div>
          </Col>
          <Col xs={10} className="mainterDashBoard">
            <h2>Danh sách nhân sự</h2>
            <Button className="buttonDashBoard">Thêm mới</Button>
            <Table>
              <thead>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày sinh</th>
                <th>Hành động</th>
              </thead>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Employee;
