import React, {useState, useEffect} from 'react'
import { Form, Input, Button, Typography, Spin } from 'antd';
import 'antd/dist/antd.css';
import Message from "./Message"
import {loginUser} from "../Actions/userAction"
import { useDispatch, useSelector } from 'react-redux'
import {USER_LOGIN_RESET} from "../Constants/userConstants"


const { Title } = Typography;

const Login = ({button}) => {

    const userLoginData = useSelector(state=> state.userLogin)
    const { user, success, error, loading} = userLoginData

    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onFinish = (values) => {
        dispatch(loginUser(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        dispatch({
            type: USER_LOGIN_RESET
        })
    }, [])

    return (
        <section className="login-form" >

        <Title level={2}> Login </Title>

        {error && <Message message={error} type={"error"} />}
        {success && <Message message={user.message} type={"success"} />}
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
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                 <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {button}
            </Form.Item>
        </Form>
        </section>
    )
}

export default Login

