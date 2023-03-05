import Cookie from 'js-cookie';

export default async function cookieDestroyer() {
    await Cookie.remove('access_token');
    await Cookie.remove('refresh_token');
}
