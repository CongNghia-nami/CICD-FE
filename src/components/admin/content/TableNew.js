import React, { useState } from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Edward King 0',
    age: 32,
    address: 'London, Park Lane no. 0',
  },
  {
    key: '2',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1',
  },
  {
    key: '3',
    name: 'Edward King 2',
    age: 32,
    address: 'London, Park Lane no. 2',
  },
  {
    key: '4',
    name: 'Edward King 3',
    age: 32,
    address: 'London, Park Lane no. 3',
  },
  {
    key: '5',
    name: 'Edward King 4',
    age: 32,
    address: 'London, Park Lane no. 4',
  },
  {
    key: '6',
    name: 'Edward King 5',
    age: 32,
    address: 'London, Park Lane no. 5',
  },
  {
    key: '7',
    name: 'Edward King 6',
    age: 32,
    address: 'London, Park Lane no. 6',
  },
  {
    key: '8',
    name: 'Edward King 7',
    age: 32,
    address: 'London, Park Lane no. 7',
  },
  {
    key: '9',
    name: 'Edward King 8',
    age: 32,
    address: 'London, Park Lane no. 8',
  },
  {
    key: '10',
    name: 'Edward King 9',
    age: 32,
    address: 'London, Park Lane no. 9',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const MyTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rowSelection={rowSelection}
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default MyTable;
