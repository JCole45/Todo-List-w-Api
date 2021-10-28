import React from 'react'
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'


const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Todo',
    dataIndex: 'name',
    key: 'name',
    render: text => <a> {text}</a>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: text => <a> {text}</a>
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


const Todo = () => {
    const dispatch = useDispatch()

    const Todos = useSelector(state => state.todo)
    const {todos} = Todos
    return (
        <>
            <Table columns={columns} dataSource={todos} />
        </>
    )
}

export default Todo
