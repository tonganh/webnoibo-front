/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Table } from 'react-bootstrap';

const TableSalary = (props) => {
  function splitBigNumber(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
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
        {props.salariesList.length > 0 ? (
          props.salariesList.map((report, index) => (
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
                <Form.Check
                  aria-label="option1"
                  checked={report.state}
                  onChange={props.handleChange}
                />
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
  );
};
export default TableSalary;
