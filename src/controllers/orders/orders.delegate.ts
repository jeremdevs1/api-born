import { getRepository } from "typeorm"
import { OrderDao } from "../../database/daos/order.dao"

class OrderDelegate {
    constructor(
        private orderDao: OrderDao
    ){}

    public async getOrders(userId: string) {

        return await this.orderDao.getOrdersByUser(userId)
    }
}

export { OrderDelegate }