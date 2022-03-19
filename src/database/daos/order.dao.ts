import { getRepository } from "typeorm"

import { Order } from '../entity/order.entity'
class OrderDao {
    constructor(){}

    public async getOrdersByUser(userId: string) {

        return getRepository(Order)
            .createQueryBuilder('orders')
            .where("user.id = (:id)", { id: userId })
            .getMany()
    }
}

export { OrderDao }