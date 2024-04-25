import React, {FC, useEffect} from "react";
import AppRouter from "./components/AppRouter";
import NavigateBar from "./components/NavigateBar";
import { Layout } from "antd";
import './App.css'
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";


const App:FC = () => {
  const {setUser, setIsAuth} = useActions()
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({email: localStorage.getItem('email' || '')} as IUser)
      setIsAuth(true);
    }
  }, [])

  return (
    <Layout>
      <NavigateBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
