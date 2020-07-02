import RegisterService from '@service/register'

/**
 * Customer register
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const customerRegister = async (req, res) => {
  try {
    await RegisterService.customerRegister(
      req.body.email, req.body.password,
      req.body.fullName, req.body.phoneNumber
    )
    res.status(201).send({
      message: 'Success'
    })
  }
  catch (error) {
    console.log(error)
    res.status(400).send({
      message: 'Failed'
    })
  }
}

export {
  customerRegister
}