import urls from './urls.js';

const { hostname } = new URL(urls.CLIENT_URL);

const access = {
    name: process.env.COOKIE_ACCESS_NAME,
    options: {
        sameSite: 'none',
        domain: hostname,
        httpOnly: false,
        secure: true,
        maxAge: process.env.ACCESS_EXP,
    },
    delete: {
        sameSite: 'none',
        domain: hostname,
        httpOnly: false,
        secure: true,
        maxAge: new Date(null),
    },
};

const refresh = {
    name: process.env.COOKIE_REFRESH_NAME,
    options: {
        sameSite: 'none',
        domain: hostname,
        httpOnly: true,
        secure: true,
        maxAge: process.env.REFRESH_EXP,
    },
    delete: {
        sameSite: 'none',
        domain: hostname,
        httpOnly: true,
        secure: true,
        maxAge: new Date(null),
    },
};

export default { access, refresh };
