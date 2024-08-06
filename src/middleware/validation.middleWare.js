export const validtion = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate({ ...req.body, ...req.params,...req.query }, { abortEarly: false })
        if (validationResult.error) {
            return res.json({ massage: "validaton", validationResult: validationResult.error.details })
        }
        return next()
    }
}