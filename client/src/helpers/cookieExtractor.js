import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

export default async function cookieExtractor(name) {
    const cookieContent = await Cookie.get(name);
    const decodedContent = await jwtDecode(cookieContent);

    return decodedContent;
}
