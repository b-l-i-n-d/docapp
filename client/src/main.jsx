import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { store } from './redux/store';

// const LightTheme = lazy(() => import('./components/common/themes/lightTheme'));
// const NightTheme = lazy(() => import('./components/common/themes/nightTheme'));

// function ThemeSelector({ children }) {
//     const theme = localStorage.getItem('theme') || 'light';

//     return (
//         <>
//             <Suspense fallback={<></>}>
//                 {theme === 'light' && <LightTheme />}
//                 {theme === 'night' && <NightTheme />}
//             </Suspense>
//             {children}
//         </>
//     );
// }

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/* <ThemeSelector> */}
                <App />
                {/* </ThemeSelector> */}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
