import React, {useState, useEffect, useContext} from 'react'
import { Form, Input, Button, Typography, Spin } from 'antd';
import axios from "axios"
import {api} from "../api/base"
import 'antd/dist/antd.css';
import Message from "./Message"
import {UserContext} from "../Context/user/user-context"
import {TodoContext} from "../Context/todo/todo-context"

const { Title } = Typography;

const Login = ({button}) => {

    const {userDetails, getUserDetails, updateUserDetails} = useContext(UserContext)
    const {todoState, updateTodoState} = useContext(TodoContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleFectch = async (user) => {
        //const {user} = userDetails
    
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

    const onFinish = async (values) => {
        setLoading(true)
        setSuccess(false)
        try{
            const config = {
                'Content-Type': 'application/json',
            }
    
            const body = {
                email: username,
                password: password
            }
    
            const {data} = await axios.post(`${api}/api/login/`, body , config)
            let message = data.message
            let result = data.result

            console.log(data.result)

            setLoading(false)
            setSuccess(true)
            updateUserDetails(data.result)

            handleFectch(data.result)
        
            localStorage.setItem('userInfo', JSON.stringify({user: result}))
    
        }
        catch(err){
            console.log(err)
            setError(err?.message)
            setLoading(false)
            setSuccess(false)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCheck = () => {
        console.log(getUserDetails)
    }

    return (
        <section className="login-form" >

        <Title level={2}> Login </Title>

        {error && <Message id="error_message" message={error} type={"error"} />}
        {/* {success && <Message data-testid="success_message" message={user.message} type={"success"} />} */}
        {loading && <Spin size="small"/>}

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                rules={[{ required: true, message: 'Please enter your email!' }]}
            >
                <Input data-testid="email"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password data-testid="password"/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                 <Button data-testid="submit-button" onClick={handleCheck} type="primary" htmlType="submit">
                    Submit
                </Button>
                {button}
            </Form.Item>
        </Form>
        </section>
    )
}

export default Login

