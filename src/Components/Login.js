import React, {useState, useEffect} from 'react'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import {loginUser} from "../Actions/userAction"
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

const dispatch = useDispatch()
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(loginUser(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section style={{width:'50%', margin:"0 auto"}}>
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
        label="Username"
        name="username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </section>
    )
}

export default Login

