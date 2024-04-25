import React, { FC, useState } from "react";
import {Button, Form, Input} from "antd";
import rules from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions} from "../hooks/useActions";


const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.isAuth);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()

    const submit = () => {
        login(email, password)
    }
    return (
        <Form
        onFinish={submit}
        >
            {error && <div style={{color: 'red'}}> 
                {error}
            </div>}
            <Form.Item
                label = "Email"
                name = "email"
                rules={[rules.required('Please input your email!')]}
            >
                <Input value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label = "Password"
                name = "password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input value={password} onChange={e => setPassword(e.target.value)} type={"password"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
  };
  
  export default LoginForm;