import { Result } from 'antd';
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
                        <Route path="book-appionments">
                            <Route index element={<User.BookAppoinments />} />
                            <Route path=":doctorId" element={<User.DoctorDetails />} />
                        </Route>
                        <Route path="appointments">
                            <Route index element={<User.Appointments />} />
                        </Route>

                        <Route element={<AdminOnly />}>
                            <Route path="users">
                                <Route index element={<Admin.Users />} />
                            </Route>
                            <Route path="doctors">
                                <Route index element={<Admin.Doctors />} />
                            </Route>
                            <Route path="departments">
                                <Route index element={<Admin.Departments />} />
                            </Route>
                        </Route>
                        <Route
                            path="*"
                            element={
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                />
                            }
                        />
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
