import Cookie from 'js-cookie';

export default async function cookieDestroyer() {
    await Cookie.remove('accessToken');
    await Cookie.remove('refreshToken');
}
