import React from 'react'
import { Table, Space, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Input,Button } from 'antd';
import { PlusOutlined, DeleteTwoTone, UploadOutlined, UserDeleteOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Typography } from 'antd';
import {createTodoItem, uploadTodoItem, deleteTodoItem, editTodoItem} from "../Actions/todoActions"
import {signOutUser} from "../Actions/userAction"


const { Paragraph } = Typography;

const Todo = () => {
    const dispatch = useDispatch()
    const [todoItem, setTodoItem] = React.useState("")
    const [edit, setEdit] = React.useState("")
    const [editId,setEditId] = React.useState("")

    const handleDelete = (id) => {
        dispatch(deleteTodoItem(id))
    }

    const handleEdit = (text, record) => {
        dispatch(editTodoItem(text, record))
        setEdit(text)
        setEditId(record._id)
    }

    const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Todo',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) =>  <Paragraph editable={{ onChange: (e) => handleEdit(e, record) }}>{record._id === editId ? edit : text}</Paragraph>
    },
    // {
    //     title: "Content",
    //     dataIndex: 'content',
    //     key: "content",
    //     render: (text, record) =>  <Paragraph editable={{ onChange: (e) => handleEdit(e, record) }}>{record._id === editId ? edit : text}</Paragraph>
    // },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => <p> {text}</p>
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="large">
                <Tooltip title="Delete todo item">
                    <DeleteTwoTone style={{color:"red !important"}} onClick={()=> handleDelete(record._id)} size={"large"} color="secondary" />
                </Tooltip>
            </Space>
        ),
    },
    ];

    const Todos = useSelector(state => state.todo)
    const {todos, success, error} = Todos

    const handleCreateTodo = () => {
        let todo = todoItem.trim()

        if(todo.length >= 1){
            dispatch(createTodoItem(todoItem))
            setTodoItem("")
        }
    }

    const handleUploadTodos = () => {
        document.getElementById("upload-btn").click()
    }

    const handleUpload = (e) => {
        console.log(e)
        let file = e.target.files[0]
        const formData = new FormData()

        formData.append("file", file)
        console.log(formData)
        console.log(file)
        dispatch(uploadTodoItem(formData))        

    }

    const handleKeyPress = (e) => {
        if(e.charCode === 13){
            dispatch(createTodoItem(todoItem))
            setTodoItem("")
        }
    }

    const handleSignOut = () => {
        dispatch(signOutUser())
    }

    return (
        <>
            <div style={{height:"30px", marginBottom:"3em", display:'inline-block'}}>  </div>

            <div className="input-holder"> 
                <Input className="input-field" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add todo item" /> 

                <Tooltip title="Add todo item">
                    <Button type="primary" onClick={handleCreateTodo} shape="circle" icon={<PlusOutlined />} size={"large"} />
                </Tooltip>

                <Tooltip title="Upload csv file">
                    <Button type="primary" onClick={handleUploadTodos} shape="circle" icon={<UploadOutlined />} size={"large"} />
                </Tooltip>
                <input hidden type="file" accept=".csv" onChange={handleUpload} id="upload-btn"/>

                <Tooltip title="Sign out">
                    <Button style={{marginLeft:"20px"}} type="primary" onClick={handleSignOut} icon={<UserDeleteOutlined />} size={"small"}> 
                        Sign Out
                    </Button> 
                </Tooltip>
            </div>

            <Table className="table-style" columns={columns} rowKey={record => record._id} dataSource={todos} />
        </>
    )
}

export default Todo
