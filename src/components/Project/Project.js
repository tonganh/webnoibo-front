/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */

import React from 'react';
import {
  Button, Col, Container, Row, Table,
} from 'react-bootstrap';
import ProTypes from 'prop-types';
import { getProject } from '../../store/project/Action';
import './index.css';
// eslint-disable-next-line import/order
import { connect } from 'react-redux';

const Project = (props) => (
  <div className="projectPage">
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
            <h2>Danh sách dự án</h2>
            <Button className="buttonDashBoard">Thêm mới</Button>
            <Table>
              <thead className="thead-project text-center">
                <th>Tên</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hoàn thành</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </thead>
              <tbody>
                {props.projects.length > 0 ? (
                  props.projects.map((project) => (
                    <tr id={project.id}>
                      <td className="tbody-name text-center">{project.name}</td>
                      <td className="tbody-start text-center">{project.start}</td>
                      <td className="tbody-finishDate text-center">{project.finishDate}</td>
                      <td className="tbody-state text-center">{project.state}</td>
                      <td className="tbody-hanhDong text-center">{project.hanhDong}</td>
                    </tr>
                  ))
                ) : (
                  <p>End</p>
                ) }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

Project.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  projects: ProTypes.array.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  getProject: ProTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  projects: state.projects,
});
export default connect(mapStateToProps, {
  getProject,
})(Project);
