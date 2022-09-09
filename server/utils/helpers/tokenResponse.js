import { cookiesConfig } from '../../configs/index.js';

export default function tokenResponse(accessToken) {
    const localsAccessToken = accessToken;
    const backupResponse = {
        isAuth: true,
        message: 'all good.',
        data: {
            accessToken: cookiesConfig.access.name,
        },
    };
    return localsAccessToken || backupResponse;
}
