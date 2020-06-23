import Router from 'express'
import AuthMiddleware from '../middlewares/auth-middleware'
import OrderRepo from '../../repositories/account-repository'

const OrderRouter = Router()

OrderRouter.all('/', AuthMiddleware)

/*
 * Get cart info
 */
OrderRouter.get('/', async (req, res) => {
  try {
    const cart = await CartRepo.findById()
    res.status(200).send(cart.items)
  }
  catch(error) {
    res.status('404').send({
      message: "Failed"
    })
  }
})

/*
 * Post cart info
 */
OrderRouter.post('/', async (req, res) => {
  try {
    await OrderRepo.create({
      billId: "0005600921",
      accountId: "5ee0bf66dbc5342856486edc",
      discountCode: "HCMUT18",
      discountValue: "15%",
      items: [{
        foodId: "5eee1f065c86f2493b91b26c",
        quantity: 3
      },{

        foodId: "5eee1f065c86f2493b91b26d",
        quantity: 5
      }]
    })
    res.status(201).send({
      message: "Success"
    })
  }
  catch(error) {
    console.log(error)
    res.status('400').send({
      message: "Failed"
    })
  }
})

export default OrderRouter