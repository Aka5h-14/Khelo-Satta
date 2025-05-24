const z = require('zod');
const validator = require('validator');

const schema = z.object({
    name: z.string(),
    phoneNumber: z.string().refine(validator.isMobilePhone),
    password: z.string().min(6),
    email: z.string().email()
})

const schema2 = z.object({
    phoneNumber: z.string().refine(validator.isMobilePhone),
    password: z.string().min(6),
})

module.exports = {
    schema , schema2
}