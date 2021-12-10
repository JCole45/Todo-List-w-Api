import React, {useState, useEffect, useContext} from 'react'
import { Form, Input, Button, Typography, Spin } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios"
import {api} from "../api/base"
import Message from "./Message"
import { useSelector } from 'react-redux'
import {UserContext} from "../Context/user/user-context"

const { Title } = Typography;


const Register = ({button}) => {

    const {getUserDetails, updateUserDetails, registerUser, userRegisterDetails} = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const userRegisterData = useSelector(state => state.userRegister)
    const {user} = userRegisterData

    useEffect(() => {
    }, [])

    const onFinish = async (values) => {
        //dispatch(registerUser(values))

        setLoading(true)
        setSuccess(false)

        try{
            const config = {
                'Content-Type': 'application/json',
            }
    
            const body = {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirm_password
            }
    
            const {result, message} = await axios.post(`${api}/api/signup`, body , config)
            setLoading(false)
            setSuccess(true)

            registerUser(result)
        }
        catch(err){
            setError(err.message)
            setLoading(false)
            setSuccess(false)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <section className="register-form" >
            <Title level={2}> Register </Title>

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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
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

export default Register

