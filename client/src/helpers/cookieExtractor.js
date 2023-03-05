import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

export default async function cookieExtractor(cookieName) {
    const cookieContent = await Cookie.get(cookieName);
    const decodedContent = await jwtDecode(cookieContent);
    const { _id, name, email, role, isDoctor } = decodedContent;

    return { _id, name, email, role, isDoctor };
}
