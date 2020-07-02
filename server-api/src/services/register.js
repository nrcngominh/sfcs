import AccountRepo from '@repository/account'
import bcrypt from 'bcrypt';

/**
 * Register for customer
 * @param {String} email 
 * @param {String} password 
 * @param {String} fullName 
 * @param {String} phoneNumber 
 */
const customerRegister = async (email, password, fullName, phoneNumber) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await AccountRepo.createCustomer(email, hashedPassword, fullName, phoneNumber)
}

export default {
  customerRegister
}