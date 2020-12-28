/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import {
  Button, Col, Container, Row, Table, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import ProTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { getAllOts } from '../../store/ots/Action';

import './index.css';
import testAPI from '../../untils/api';

const Report = (propsReport) => {
  const [listOts, setListOts] = useState([]);
  const [repostState, setReportState] = useState([]);
  const history = useHistory();
  const initialSearch = {
    name: '',
    projectId: '',
    startfinish: '',
  };
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const formatName = (str) => {
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
  if (Object.keys(propsReport.reportOts).length === 0) {
    history.push('/');
  }
  useEffect(() => {
    setListOts(propsReport.reportOts);
  }, [propsReport.reportOts]);
  // Update vao reducer trong redux
  const handleChangeSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
    console.log('search', searchTerm);
  };

  useEffect(() => {
    const results = propsReport.reportOts.filter((data) => formatName(data._id[0].name)
      .toLowerCase()
      .includes(formatName(searchTerm.name).toLowerCase()));
    setListOts(results);
  }, [searchTerm]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.projectId === '') {
      testAPI.post('ots/getAll').then((data) => {
        propsReport.getAllOts(data.data.data);
        setListOts(data.data.data);
      });
    } else {
      testAPI.post('ots/serachOption', searchTerm).then((data) => {
        if (data.data.message === 'fail') {
          console.log('123123');
        } else {
          propsReport.getAllOts(data.data.data);
          setListOts(data.data.data);
        }
      }).catch((err) => {
        console.log('err', err);
      });
    }
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
                    <Link to="/report" className="clickProject">
                      Báo cáo
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={10} className="maintainEmployee">
                <div className="main-header">
                  <h2>
                    Báo cáo
                    {' '}
                    {'>'}
                    {' '}
                    Onsite
                  </h2>

                  <Form className="form-search" onSubmit={handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col} md="3">
                        <Form.Control
                          placeholder="Tên các nhân viên"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          className="input-search-report flex-grow-9 "
                          id="name"
                          type="text"
                          name="name"
                          value={searchTerm.name}
                          onChange={handleChangeSearch}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="3">
                        <Form.Control
                          placeholder="Thời gian từ ngày đến ngày"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          className="input-search-report flex-grow-9 "
                          type="text"
                          name="startfinish"
                          onChange={handleChangeSearch}
                          value={searchTerm.startfinish}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="3">
                        <Form.Control
                          // as="select"
                          // custom
                          // aria-label="Recipient's username"
                          // aria-describedby="basic-addon2"
                          className="flex-grow-9 select-Project"
                          name="projectId"
                          onChange={handleChangeSearch}
                          value={searchTerm.project}
                          as="select"
                          id="inlineFormCustomSelect"
                          custom
                        >
                          <option value="">Tất cả</option>
                          {
                            propsReport.projects.length > 0 ? (
                              propsReport.projects.map((project, index) => (
                                <option value={project._id}>{project.name}</option>
                              ))
                            ) : (<option>Không có gì cả.</option>)
                          }
                        </Form.Control>
                      </Form.Group>
                      <Form.Group as={Col} md="3" className="d-flex">
                        <Button type="submit" className="search-Report">Tìm kiếm</Button>
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </div>
                <Table>
                  <thead className="thead-project row-header">
                    <tr className="row">
                      <th className="text-center col-md-4">Tên</th>
                      <th className="text-center col-md-4">Tổng số buổi</th>
                      <th className="text-center col-md-4">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOts.length > 0 ? (
                      listOts.map((report, index) => (
                        <tr id={index} className="d-flex">
                          <td className="text-center col-md-4 report-table">{report._id[0].name}</td>
                          <td className="text-center col-md-4 report-table">{report.timeofday.length}</td>
                          <td className="text-center col-md-4 report-table">Xem Chi tiết</td>
                        </tr>
                      ))) : (
                        <p>Không có báo cáo nào.</p>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

    </>
  );
};
Report.ProTypes = {
  reportOts: ProTypes.array.isRequired,
  getAllOts: ProTypes.func.isRequired,
  projects: ProTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  reportOts: state.otsReducer.reportOts,
  projects: state.projectReducer.projects,
});

export default connect(mapStateToProps, {
  getAllOts,
})(Report);
