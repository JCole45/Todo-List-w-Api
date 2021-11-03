import React, {useEffect} from 'react'
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/antd.css';
import Message from "./Message"
import {registerUser} from "../Actions/userAction"
import { useDispatch, useSelector } from 'react-redux'
import {USER_REGISTER_RESET} from "../Constants/userConstants"

const { Title } = Typography;


const Register = ({button}) => {

    const dispatch = useDispatch()

    const userRegisterData = useSelector(state => state.userRegister)
    const {user, success, error} = userRegisterData

    useEffect(() => {
        dispatch({
            type: USER_REGISTER_RESET
        })
    }, [])

    const onFinish = (values) => {
        dispatch(registerUser(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <section style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:'50%', margin:"0 auto"}}>
            <Title level={2}> Register </Title>

            {error && <Message message={error} type={"error"} />}
            {success && <Message message={user.message} type={"success"} />}

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

