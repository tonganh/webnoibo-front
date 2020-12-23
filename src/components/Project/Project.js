/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

import {
  Button, Col, Container, Row, Table,
} from 'react-bootstrap';

import ProTypes from 'prop-types';
import './index.css';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getProject } from '../../store/project/Action';
import testAPI from '../../untils/api';

const Project = (propProject) => {
  const [projectState, setProjectState] = useState([]);
  const history = useHistory();
  const loginDadta = propProject.loginReducer.userInfo;
  if (Object.keys(loginDadta).length === 0) {
    history.push('/');
  }
  useEffect(() => {
    if (loginDadta.role === 'AD') {
      testAPI.get('projects/admin').then((data) => {
        // propProject.getProject(d)
        propProject.getProject(data.data.data);
        console.log('data in project', data);
      });
    } else {
      console.log('Khong phai Admin');
    }
  }, []);
  useEffect(() => {
    setProjectState(propProject.projectReducer.projects);
  }, [propProject.projectReducer.projects]);

  // const xoa_dau = (str) => {
  //   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  //   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  //   str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  //   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  //   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  //   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  //   str = str.replace(/đ/g, 'd');
  //   str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  //   str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  //   str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  //   str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  //   str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  //   str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  //   str = str.replace(/Đ/g, 'D');
  //   return str;
  // };
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
  return (
    <div className="projectPage">
      <div className="topProject">
        <div className="projectTitle">
          <h1 className="hiSoftText">Hisoft EMS</h1>
        </div>
      </div>
      <div className="bodyDashboard">
        <Container fluid>
          <Row>
            <Col xs={2} className="FirstColumnInDashBoard">
              <div>
                <Link to="/">Dashboard</Link>
              </div>
              <div>
                <Link to="/employee">Nhân sự</Link>
              </div>
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
              <Button className="buttonDashBoard">Thêm mới</Button>
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
                        <td className={`tbody-state text-center ${checkStaetPj(project.trangthai)}`}>
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
  );
};

Project.ProTypes = {
  projectReducer: ProTypes.array.isRequired,
  loginReducer: ProTypes.objectOf(ProTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  projectReducer: state.projectReducer,
  loginReducer: state.loginReducer,
});
export default connect(mapStateToProps, {
  getProject,
})(Project);
