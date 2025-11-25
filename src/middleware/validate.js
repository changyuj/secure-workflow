const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin','analyst').default('analyst')
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const workflowSchema = Joi.object({
  title: Joi.string().max(255).required(),
  owner: Joi.string().required(),
  status: Joi.string().valid('pending','in_progress','done').default('pending'),
  steps: Joi.array().items(Joi.string()).default([])
});

function validateBody(schema) {
  return (req,res,next)=>{
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    req.body = value;
    next();
  }
}

module.exports = { validateBody, registerSchema, loginSchema, workflowSchema };
