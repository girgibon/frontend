import React, { FC } from "react";
import { Layout, Menu, Dropdown, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

interface Props {
    hideUserDropdown?: boolean; 
}

const NavigateBar: FC<Props> = ({ hideUserDropdown }) => {
    const router = useNavigate();
    const { isAuth, user } = useTypedSelector(state => state.isAuth);
    const { logout } = useActions();

    const handleLogout = () => {
        logout();
    };

    const menu = (
        <Menu theme="dark">
            <Menu.Item key="logout" onClick={handleLogout}>Exit</Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header>
            <Row justify="space-between" align="middle">
                <Menu theme="dark" mode="horizontal" selectable={false}>
                    {!isAuth ? (
                        <Menu.Item onClick={() => router(RouteNames.LOGIN)} key={1}>
                            Login
                        </Menu.Item>
                    ) : (
                        <>
                            <Menu.Item onClick={() => router(RouteNames.ACTIVE_TASKS)} key={2}>
                                Active Tasks
                            </Menu.Item>
                            <Menu.Item onClick={() => router(RouteNames.EVENT)} key={3}>
                                Calendar
                            </Menu.Item>
                        </>
                    )}
                </Menu>
                {isAuth && (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <div style={{ color: "white", cursor: "pointer" }}>
                            {user?.email || "User not found"}
                        </div>
                    </Dropdown>
                )}
            </Row>
        </Layout.Header>
    );
};

export default NavigateBar;