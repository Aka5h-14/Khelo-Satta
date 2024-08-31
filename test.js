const z = require('zod');
const validator = require('validator');

const schema = z.object({
    name: z.string(),
    phoneNumber: z.string().refine(validator.isMobilePhone),
    password: z.string(),
    email: z.string().email()
})

const schema2 = z.object({
    phoneNumber: z.string().refine(validator.isMobilePhone)
})

module.exports = {
    schema , schema2
}