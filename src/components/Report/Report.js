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
import moment from 'moment';
import { Collapse, DatePicker, Space } from 'antd';
import { getAllOts } from '../../store/ots/Action';

import './index.css';
import testAPI from '../../untils/api';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

const Report = (propsReport) => {
  const [listOts, setListOts] = useState([]);
  const [repostState, setReportState] = useState([]);
  const history = useHistory();
  const initialSearch = {
    name: '',
    projectId: '',
    start: '',
    finish: '',
  };
  const [dateState, setDateState] = useState(['', '']);

  const dateFormatList = ['DD/MM/YYYY'];
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  function onChange(date, dateString) {
    setSearchTerm({
      ...searchTerm,
      start: dateString[0].split('/').reverse().join('-'),
      finish: dateString[1].split('/').reverse().join('-'),
    });
    // console.log('date string', dateState);
    // console.log('date state', date);
  }
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
  useEffect(() => {
    testAPI.post('ots/getAll').then((data) => {
      propsReport.getAllOts(data.data.data);
      setListOts(data.data.data);
    });
  }, []);
  useEffect(() => {
    setListOts(propsReport.reportOts);
  }, [propsReport.reportOts]);
  // Update vao reducer trong redux
  const handleChangeSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const results = propsReport.reportOts.filter((data) => formatName(data._id[0].name)
      .toLowerCase()
      .includes(formatName(searchTerm.name).toLowerCase()));
    setListOts(results);
  }, [searchTerm.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.projectId === '') {
      testAPI.post('ots/getAll', searchTerm).then((data) => {
        propsReport.getAllOts(data.data.data);
        setListOts(data.data.data);
        searchTerm.name = '';
      }).catch((err) => {
      });
    } else {
      testAPI.post('ots/serachOption', searchTerm).then((data) => {
        setListOts(data.data.data);
        propsReport.getAllOts(data.data.data);
      }).catch((err) => {
      });
    }
  };
  const resultDirect = [];
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
                    <p to="/report">
                      Báo cáo
                      <ul className="optionOtOts">
                        <li>
                          <Link className="clickProject" to="/report/">OTS</Link>
                        </li>
                        <li>
                          <Link to="/report/salary">Salary</Link>
                        </li>
                      </ul>
                    </p>
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
                        <Space direction="vertical" size={11} className="ant-space-Fromto d-flex">
                          <RangePicker className="d-flex datePickInReport" onChange={onChange} format={dateFormatList} />
                        </Space>
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
                          <td className="text-center col-md-4 report-table">
                            <Link
                              to="/report/ots"
                              onClick={() => {
                                resultDirect.push(report);
                                propsReport.getAllOts(resultDirect);
                              }}
                            >
                              Xem chi tiết
                            </Link>
                          </td>
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
