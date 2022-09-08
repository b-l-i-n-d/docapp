import { body, validationResult } from 'express-validator';

const userValidationRules = () => [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 chars long.'),
    body('email').isEmail().withMessage('Use a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm)
        .withMessage(
            'Password should be combination of one uppercase , one lower case, one special char.'
        ),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = {};
    errors.array().map((err) => {
        extractedErrors[err.param] = err.msg;
        return extractedErrors;
    });

    return res.status(422).json({
        message: extractedErrors,
    });
};

export default { userValidationRules, validate };
