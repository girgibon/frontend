import React, { FC } from "react";
import { Card, Layout, Row } from "antd";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Card>
          <LoginForm />
          <Row justify="center" style={{ marginTop: 20 }}>
            <span>
              If you don't have an account,{" "}
              <Link to="/registration">register</Link>.
            </span>
          </Row>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;