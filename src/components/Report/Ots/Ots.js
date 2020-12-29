/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import ProTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Collapse, DatePicker, Space } from 'antd';
import './index.css';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const OtsReport = (propsOts) => {
  const [otsOptionList, setOtsOptionList] = useState([]);
  useEffect(() => {
    if (Object.keys(propsOts.reportOts) !== 0) {
      setOtsOptionList(propsOts.reportOts[0].timeofday);
    }
  }, [propsOts.reportOts]);
  const dateFormatList = ['DD/MM/YYYY'];
  const [dateState, setDateState] = useState(['', '']);
  function onChange(date, dateString) {
    setDateState(dateString);
  }
  useEffect(() => {
    if (dateState[0] !== '' && dateState[1] !== '') {
      const result = propsOts.reportOts[0].timeofday.filter((user) => (
        (moment.utc(user.date).format('DD/MM/YYYY'))
       >= moment.utc(dateState[0]).format('DD/MM/YYYY')
         && moment.utc(user.date).format('DD/MM/YYYY') <= moment.utc(dateState[1]).format('DD/MM/YYYY')
      ));
      setOtsOptionList(result);
      // console.log('result', (new Date(moment.utc('2020-12-21T00:00:00.000Z').format('DD/MM/YYYY'))).getTime());
      // console.log('123', moment.utc('2020-12-21T00:00:00.000Z').format('DD/MM/YYYY'));
    } else {
      setOtsOptionList(propsOts.reportOts[0].timeofday);
    }
  }, [dateState]);
  return (
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
                  <div>
                    <Link to="/report">Báo cáo</Link>
                    <ul className="optionOtOts">
                      <li>
                        <Link to="/report/ots" className="clickProject">OTS</Link>
                      </li>
                      <li>
                        OT
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </Col>
            <Col xs={10} className="maintainEmployee">
              <div className="main-header">
                <span>
                  <Link to="/report" className="linkhRefReport">Báo cáo</Link>
                </span>
                <i className="penci-faicon fa fa-angle-right linkhRefReport " />
                <span>
                  <Link to="/report/ots" className="linkhRefReport">OTS</Link>
                </span>
              </div>
              {
                Object.keys(propsOts.reportOts).length === 0 ? (<p />) : (
                  <div>
                    <div className="d-flex justify-content-md-between">
                      <div className="inHeadOfCollapse">
                        Có
                        {' '}
                        <span className="boldInSpanOt-Ots">{otsOptionList.length}</span>
                        {' '}
                        ngày OTS.
                      </div>
                      <div className="d-flex align-items-center searchDivOTS-OT">
                        Thời gian
                        <Space direction="vertical" size={12} className="ant-space-Fromto">
                          <RangePicker className="d-flex" onChange={onChange} format={dateFormatList} />
                        </Space>
                      </div>
                    </div>
                    <Collapse>
                      {otsOptionList.length > 0 ? (
                        otsOptionList.map((data, index) => (
                          <Panel header={moment.utc(data.date).format('DD/MM/YYYY')} key={index.toString()}>
                            <div>
                              Dự án:
                              {' '}
                              <span className="boldInSpanOt-Ots">{data.project[0].name}</span>
                            </div>
                            <div>
                              Ca:
                              {' '}
                              <span className="boldInSpanOt-Ots">{data.ship}</span>
                            </div>
                            <div>
                              Thời gian:
                              {' '}
                              <span className="boldInSpanOt-Ots">{data.from}</span>
                              {' ~ '}
                              <span className="boldInSpanOt-Ots">{data.to}</span>
                            </div>
                            <div>
                              Ghi chú:
                              {' '}
                              <span className="boldInSpanOt-Ots">{data.project[0].reason}</span>
                            </div>
                          </Panel>
                        ))
                      ) : (<p />)}
                    </Collapse>
                  </div>
                )
              }
              {/* <Collapse defaultActiveKey={['1']}>
                {setOtsOptionList.length > 0 ? (
                  setOtsOptionList.map((data,index)=>(
                    <Panel header={data.}></Panel>
                  ))
                ) : ()}
              </Collapse> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
OtsReport.ProTypes = {
  reportOts: ProTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  reportOts: state.otsReducer.reportOts,
  projects: state.projectReducer.projects,
});
export default connect(mapStateToProps, {
})(OtsReport);
