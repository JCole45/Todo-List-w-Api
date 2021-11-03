import React, {useEffect} from 'react'
import { Table, Space, message as Message, Modal, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Input,Button } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, UserDeleteOutlined, EyeOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import {createTodoItem, uploadTodoItem, deleteTodoItem, editTodoItem, fetchTodo} from "../Actions/todoActions"
import {signOutUser} from "../Actions/userAction"
import {GET_TODO_RESET, CLEAR_MESSAGE} from "../Constants/todoConstants"

const { Paragraph, Title } = Typography;

const Todo = () => {
    const dispatch = useDispatch()
    const [todoItem, setTodoItem] = React.useState("")
    const [edit, setEdit] = React.useState("")
    const [editId,setEditId] = React.useState("")
    const [screenType, setScreenType] = React.useState("desktop");

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 800) {
            setScreenType("desktop");
          }
    
          if (window.innerWidth > 550 && window.innerWidth < 800) {
            setScreenType("tablet");
          }
          if (window.innerWidth < 550) {
            setScreenType("mobile");
          }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      });

    const handleDelete = (id) => {
        dispatch(deleteTodoItem(id))
    }

    const handleEdit = (text, record) => {
        dispatch(editTodoItem(text, record))
        setEdit(text)
        setEditId(record._id)
    }

    const handleViewTodo = (id) => {
        dispatch(fetchTodo(id))
    }

    const handleMessaging = (message) => {
        if(message)
        Message.info(message, ()=> {
            dispatch({
                type: CLEAR_MESSAGE
            })
        })
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
                <Tooltip title="View todo">
                    <EyeOutlined className="view-btn" style={{color:"#1890ff"}} onClick={()=> handleViewTodo(record._id)} />
                </Tooltip>

                <Tooltip title="Delete todo item">
                <DeleteOutlined className="delete-btn" style={{color:"red"}} onClick={()=> handleDelete(record._id)} />
                </Tooltip>

            </Space>
        ),
    },
    ];

    const mobileColumns = [
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
                    <Tooltip title="View todo">
                        <EyeOutlined className="view-btn" style={{color:"#1890ff"}} onClick={()=> handleViewTodo(record._id)} />
                    </Tooltip>
    
                    <Tooltip title="Delete todo item">
                    <DeleteOutlined className="delete-btn" style={{color:"red"}} onClick={()=> handleDelete(record._id)} />
                    </Tooltip>
    
                </Space>
            ),
        },
    ];

    const Todos = useSelector(state => state.todo)
    const {todos, success, error, message} = Todos

    const getTodo = useSelector(state => state.getTodo)
    const {todo, success: getTodoSuccess, error: getTodoError, loading: getTodoLoading} = getTodo

    useEffect(() => {
       handleMessaging(message)
    }, [message])

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
        let file = e.target.files[0]
        const formData = new FormData()

        formData.append("file", file)
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

    const handleClose = () => {
        dispatch({
            type: GET_TODO_RESET
        })
    }

    return (
        <>
            <Title level={1}> Todo App </Title>

            <Modal title={todo.name ? todo.name : "-"} visible={getTodoSuccess || getTodoLoading} onOk={handleClose} onCancel={handleClose}>
                {todo.name}
                {getTodoLoading && <Spin size="miffle" />}
            </Modal> 

            <div className="signout-button">
            <Tooltip title="Sign out">
                <Button type="primary" onClick={handleSignOut} icon={<UserDeleteOutlined />} size={"small"}> 
                    Sign Out
                </Button> 
            </Tooltip>
            </div>

            <div style={{height:"30px", marginBottom:"3em", display:'inline-block'}}>  </div>

            <div className="input-holder"> 
                <span >
                <Input className="input-field" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add todo item" /> 

                <Tooltip title="Add todo item">
                    <Button type="primary" onClick={handleCreateTodo} shape="circle" icon={<PlusOutlined />} size={"large"} />
                </Tooltip>

                <Tooltip title="Upload csv file">
                    <Button type="primary" onClick={handleUploadTodos} shape="circle" icon={<UploadOutlined />} size={"large"} />
                </Tooltip>
                <input hidden type="file" accept=".csv" onChange={handleUpload} id="upload-btn"/>
                </span>

            </div>

            <Table className="table-style" columns={screenType !=="mobile" ? columns : mobileColumns} rowKey={record => record._id} dataSource={todos} />
        </>
    )
}

export default Todo
