/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import { CSVLink } from 'react-csv';
import Button from 'react-bootstrap/Button';

const ExportReactCSV = ({ csvData, fileName }) => (
  <Button variant="warning">
    <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
  </Button>
);

export default ExportReactCSV;
