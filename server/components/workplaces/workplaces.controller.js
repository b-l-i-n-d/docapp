import Workplace from './workplaces.model.js';

const getAllWorkplaces = async (req, res) => {
    const { search } = req.query;

    try {
        if (search.length > 0 && search !== 'undefined') {
            const workplaces = await Workplace.find({
                $text: { $search: search },
            })
                .select('orgName')
                .lean();

            return res.status(200).json(workplaces);
        }

        const workplaces = await Workplace.find({}).limit(100).select('orgName').lean();

        return res.status(200).json(workplaces);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default { getAllWorkplaces };
