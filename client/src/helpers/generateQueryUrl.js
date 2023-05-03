export default function generateQueryUrl(url, params) {
    let query = url;
    if (params) {
        query += '?';
        Object.keys(params).forEach((key) => {
            if (params[key]) {
                query += `${key}=${params[key]}&`;
            }
        });
        query = query.slice(0, -1);
    }
    return query;
}
