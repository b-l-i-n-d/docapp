import Cookie from 'js-cookie';

export default async function cookieDestroyer(name) {
    await Cookie.remove(name);
}
