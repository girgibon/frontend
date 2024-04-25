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
    if (localStorage.getItem('isAuth')) {
      setUser({email: localStorage.getItem('email' || '')} as IUser)
      setIsAuth(true);
    }
  }, [setIsAuth, setUser])

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
