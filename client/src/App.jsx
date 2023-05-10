import { ConfigProvider, Result, notification, theme } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';
import './App.css';
import { AdminOnly, NotRequireAuth, PresistLogin, RequiredAuth } from './components/Auth';
import { themeConfig } from './configs';
import Main from './layouts/Main';
import { Admin, Home, Login, Signup, User } from './pages';

function App() {
    notification.config({
        placement: 'bottomRight',
        duration: 3,
    });

    useEffect(() => {
        themeChange(false);
    }, []);

    const currentTheme = useSelector((state) => state.theme.theme);
    const { darkAlgorithm, defaultAlgorithm } = theme;

    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === themeConfig.DARK ? darkAlgorithm : defaultAlgorithm,

                token: {
                    wireframe: false,
                    colorPrimary: currentTheme === themeConfig.DARK ? '#722ED1' : '#7a7676',
                },
            }}
        >
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
                                <Route index element={<User.Appointments.Index />} />
                                <Route path="personal" element={<User.Appointments.Personal />} />
                                <Route path="patient" element={<User.Appointments.Patient />} />
                            </Route>
                            <Route path="profile">
                                <Route index element={<User.Profile />} />
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
                        <Route path="/forgot-password" element={<User.ForgotPassword />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Route>
                    <Route path="/reset-password" element={<User.ResetPassword />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
}

export default App;
