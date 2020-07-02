import Router from 'express'
import AuthMiddleware from '../middlewares/auth-middleware'
import AccountRepo from '../../repositories/account'
import OrderRepo from '../../repositories/order'
import FoodRepo from '../../repositories/food'

const TransactionRouter = Router()
TransactionRouter.all('/', AuthMiddleware)

/*
 * Get order info
 */
TransactionRouter.get('/', async (req, res) => {
  try {
    const account = await AccountRepo.findByEmail(req.jwtDecodedData.email)
    console.log(account._id)
    const orders = await OrderRepo.findByAccountId(account._id)
    res.status(200).send(orders.map(order => {
      return {
        billId: order.billId,
        date: order.date.toLocaleDateString("de-AT").replace('.', '/').replace('.', '/'),
        totalMoney: order.totalMoney,
        hasPaid: order.hasPaid
      }
    }))
  }
  catch (error) {
    console.log(error)
    res.status('404').send({
      message: "Failed"
    })
  }
})

/*
 * Get order info
 */
TransactionRouter.get('/:billId', async (req, res) => {
  try {
    let bill = await OrderRepo.findByBillId(req.params.billId)
    const date = bill.date.toLocaleDateString("de-AT").replace('.', '/').replace('.', '/')
    const processedItems = await Promise.all(bill.items.map(async item => {
      const food = await FoodRepo.findById(item.foodId)
      return {
        food: food,
        quantity: item.quantity
      }
    }))
    console.log(processedItems)
    res.status(200).send({
      _id: bill._id,
      billId: bill.billId,
      momoTransId: bill.momoTransId,
      accountId: bill.accountId,
      date: date,
      totalMoney: bill.totalMoney,
      items: processedItems,
      hasPaid: bill.hasPaid
    })
  }
  catch (error) {
    console.log(error)
    res.status('404').send({
      message: "Failed"
    })
  }
})

export default TransactionRouter