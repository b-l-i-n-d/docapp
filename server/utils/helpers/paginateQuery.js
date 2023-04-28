const paginateQuery = async (mongoQuery, page, limit) => {
    const skip = (page - 1) * (limit || 10);
    const count = await mongoQuery.clone().countDocuments();
    const data = await mongoQuery.clone().skip(skip).limit(limit);

    return {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        data,
    };
};

export default paginateQuery;
