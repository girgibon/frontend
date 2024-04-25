import React, { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import { rules } from '../utils/rules';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import './RegisterForm.css';

const RegisterForm: FC = () => {
    const { error, isLoading } = useTypedSelector(state => state.isAuth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { registration } = useActions();

    const submit = () => {
        registration(email, password)
    };

    return (
        <div className="register-form-wrapper"> {}
            <Form onFinish={submit} className="register-form">
                {error && (
                    <div style={{ color: 'red' }}>
                        {error}
                    </div>
                )}

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[rules.required('Please input your email!')]}
                >
                    <Input className="register-email-input" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[rules.required('Please input your password!')]}
                >
                    <Input className="register-input" value={password} onChange={e => setPassword(e.target.value)} type="password" />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;