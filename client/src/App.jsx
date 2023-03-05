import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';
import './App.css';
import { AdminOnly, NotRequireAuth, PresistLogin, RequiredAuth } from './components/Auth';
import Main from './layouts/Main';
import { Admin, Home, Login, Signup, User } from './pages';

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
                        <Route path="apply">
                            <Route index element={<User.ApplyDoctor />} />
                        </Route>

                        <Route element={<AdminOnly />}>
                            <Route path="doctors">
                                <Route index element={<Admin.Doctors />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<div>404</div>} />
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
