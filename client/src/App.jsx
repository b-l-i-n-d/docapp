import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';
import './App.css';
import { NotRequireAuth, PresistLogin, RequiredAuth } from './components/Auth';
import Main from './layouts/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <Routes>
            <Route element={<PresistLogin />}>
                <Route element={<RequiredAuth />}>
                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>
                <Route element={<NotRequireAuth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
