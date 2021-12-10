import React, {useEffect, useContext} from 'react'
import axios from "axios"
import { Table, Space, message as Message, Modal, Spin, Typography } from 'antd';
import { Input,Button } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, UserDeleteOutlined, EyeOutlined, DownloadOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import Pagination from "./Pagination"
import {api} from "../api/base"
import {TodoContext} from "../Context/todo/todo-context"
import {UserContext} from "../Context/user/user-context"
const { Paragraph, Title } = Typography;


const Todo = () => {

    const {todoState, updateTodoState} = useContext(TodoContext)
    const { signOut, userDetails } = useContext(UserContext)

    const [todoItem, setTodoItem] = React.useState("")
    const [edit, setEdit] = React.useState("")
    const [editId,setEditId] = React.useState("")
    const [screenType, setScreenType] = React.useState("desktop");

    useEffect(() => {
        console.log(todoState)
    }, [todoState])

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

    const handleFectch = async () => {
        const {user} = userDetails
    
        const headerValue = user?.token
        const userId = user?._id
    
        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")
    
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }
    
            const {data} = await axios.get(`${api}/api/todo?page=${1}&pageSize=${10}` , config)
            let result = data.result
    
            updateTodoState({
              total: result.total,
              todos: result.todos,
              message: null,
            })
        } catch(err){
            updateTodoState({
              total: todoState.total,
              todos: todoState.todos,
              message: { message: err.message, type: "error" },
            })
        }
    }

    const handleDelete = async (id) => {
        const {user} = userDetails

        const headerValue = user.token
        const userId = user._id
    
        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")
    
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }
    
            const { data } = await axios.delete(`${api}/api/todo/${id}`, config)
            console.log(data)

            let updateTodo = todoState.todos.filter(todo => todo._id !== id)

            updateTodoState({
                todos: updateTodo,
                total: todoState.total,
                success: todoState.success,
                message: { message: "Item deleted successfully", type: "success" },
            })
    
        }catch(err){
            updateTodoState({
                todos: todoState.todos,
                total: todoState.total,
                success: todoState.success,
                message: { message: "An error occured", type: "error" },
            })
        }
    }

    const handleEdit = async (text, record) => {
        const {user} = userDetails

        const headerValue = user.token
        const userId = user._id

        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }

            const body = {
                name: text,
                content: text,
                status: record.status
            }

            const {data} = await axios.put(`${api}/api/todo/${record._id}`, body , config)
            let result = data.result
            let message = data.message

            updateTodoState({
                todos: todoState.todos,
                total: todoState.total,
                success: todoState.success,
                message: { message: "Edit successful", type: "success" },
            })

            handleFectch()

        }
        catch(err){
            updateTodoState({
                todos: todoState.todos,
                total: todoState.total,
                success: todoState.success,
                message: { message: err.message, type: "error" },
            })
        }

        setEdit(text)
        setEditId(record._id)
    }


    const handleViewTodo = async (id) => {
        const {user} = userDetails

        updateTodoState({
            todos: todoState.todos,
            todo: null,
            total: todoState.total,
            success: todoState.success,
            message: null,
            viewLoading:true,
        })

        const headerValue = user.token
        const userId = user._id

        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }

            const {data} = await axios.get(`${api}/api/todo/${id}` , config)
            let result = data.result
            let message = data.message

            updateTodoState({
                todos: todoState.todos,
                todo: {...result, message},
                total: todoState.total,
                success: todoState.success,
                message: null,
                viewLoading:false
            })
        }catch(err){
            updateTodoState({
                todos: todoState.todos,
                todo: null,
                total: todoState.total,
                success: todoState.success,
                message: { message: `Something went wrong: ${err.message}`, type: "error" },
                viewLoading:false
            })
        }
    }


    const handleMessaging = (message) => {
        if(message && message.type === "success")
            Message.success(message.message, ()=> {
            
            updateTodoState({
                todos: todoState.todos,
                total: todoState.total,
                message: null,
            })
        })
        else{
            console.log(message)
        }

        if(message && message.type === "error"){
            Message.error(message.message, ()=> {
                updateTodoState({
                    todos: todoState.todos,
                    total: todoState.total,
                    message: null,
                })
            })
        }else{
            console.log(message)
        }

        if(message && message.type === "info"){
            Message.info(message.message, ()=> {
                updateTodoState({
                    todos: todoState.todos,
                    total: todoState.total,
                    message: null,
                })
            })
        }
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

    useEffect(() => {
        console.log("test")
       handleMessaging(todoState.message)
    }, [todoState.message])

    useEffect (() => {
        handleTodoDownload(todoState.file)
    }, [todoState.file])

    const handleKeyPress = (e) => {
        if(e.charCode === 13){
            handleCreateTodo()
            setTodoItem("")
        }
    }

    const handleCreateTodo = async () => {
        let todo = todoItem.trim()

        if(todo.length >= 1){
            const {user} = userDetails

            const headerValue = user.token
            const userId = user._id

            const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${authorization}`,
                    },
                }
        
                const body = {
                    name: todo,
                    content: todo
                }
                const {data} = await axios.post(`${api}/api/todo`, body , config)
        
                let message = data.message
                let result = data.result

                updateTodoState({
                    total: todoState.total,
                    todos: [{...result, message}, ...todoState.todos],
                    message: { message: "created", type: "success" },
                })

                console.log(todoState)
                
            }
            catch(err){
                console.log(err)
                updateTodoState({
                    total: todoState.total,
                    todos: todoState.todos,
                    message: { message: err?.message, type: "error" },
                })
            }
            setTodoItem("")
        }
    }

    const handleUploadTodos = () => {
        document.getElementById("upload-btn").click()
    }

    const handleUpload = async (e) => {
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        //dispatch(uploadTodoItem(formData))        

        const {user} = userDetails

        const headerValue = user.token
        const userId = user._id

        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authorization}`
                },
            }

            const {message} = await axios.post(`${api}/api/todo/upload`, formData , config)

            updateTodoState({
                total: todoState.total,
                todos: todoState.todos,
                message: { message: "File upload successful", type: "success" },
            })

            //dispatch(fetchTodos({page:1, pageSize:25}))


        }catch(err){
            updateTodoState({
                total: todoState.total,
                todos: todoState.todos,
                message: { message: "An error occured", type: "error" },
            })
        }

    }

    const handleDownloadTodos = async (e) => {
        //dispatch(downloadTodos())
        const {user} = userDetails

        const headerValue = user.token
        const userId = user._id

        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }

            const file = await axios.post(`${api}/api/todo/download` , {}, config)

            const blobFile = new Blob([file.data], {type:"csv"})

            updateTodoState({
                total: todoState.total,
                todos: todoState.todos,
                message: { message: "Download success", type: "success" },
                file: blobFile
            })

        }catch(err){
            console.log(err)
            updateTodoState({
                total: todoState.total,
                todos: todoState.todos,
                message: { message: err.message, type: "error" },
                file: null
            })

        }
    }

    const handleSignOut = () => {
        signOut()
    }

    const handleClose = () => {
        updateTodoState({
            todos: todoState.todos,
            todo: null,
            total: todoState.total,
            success: todoState.success,
            message: null,
        })
    }

    function handleTodoDownload (blob) {
        if(blob){
            const a_tag = document.getElementById("download")
            const url = window.URL.createObjectURL(blob)

            a_tag.href = url
            a_tag.download = "myTodos.csv"
            a_tag.click()

            updateTodoState({
                total: todoState.total,
                todos: todoState.todos,
                message: { message: "", type: "none" },
                file: null
            })
        }
    }

    return (
        <>
            <Title level={1}>  </Title>

            <Modal title={todoState?.todo?.name ? todoState?.todo.name : "-"} visible={todoState?.todo || todoState.viewLoading} onOk={handleClose} onCancel={handleClose}>
                {todoState?.todo?.name}
                {todoState.viewLoading && <Spin size="middle" />}
            </Modal> 

            <div className="signout-button">
                <Tooltip title="Sign out">
                    <Button type="primary" onClick={handleSignOut} icon={<UserDeleteOutlined />} size={"small"}> 
                        Sign Out
                    </Button> 
                </Tooltip>
            </div>

            <div className="input-holder"> 
                <Input className="input-field" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add todo item" /> 

                <Tooltip title="Add todo item">
                    <Button type="primary" onClick={handleCreateTodo} shape="circle" icon={<PlusOutlined />} size={"large"} />
                </Tooltip>

                <Tooltip title="Upload csv file">
                    <Button type="primary" onClick={handleUploadTodos} shape="circle" icon={<UploadOutlined />} size={"large"} />
                </Tooltip>
                <input hidden type="file" accept=".csv" onChange={handleUpload} id="upload-btn"/>

                <Tooltip title="Download all todo items">
                    <Button type="primary" onClick={handleDownloadTodos} shape="circle" icon={<DownloadOutlined />} size={"large"} />
                </Tooltip>
                <a href="" hidden download id="download"> </a>
            </div>

            <Table className="table-style" columns={screenType !== "mobile" ? columns : mobileColumns} pagination={false} rowKey={record => record._id} dataSource={todoState.todos} />
            <Pagination/>
        </>
    )
}

export default Todo


// @@  - Structuring the context state to maintain the current components without much change. 