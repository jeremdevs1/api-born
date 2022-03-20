import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { User } from "../../database/entity/user.entity";
import { Order } from "../../database/entity/order.entity";
import { Meal } from "../../database/entity/meal.entity";
import { Aliment } from "../../database/entity/aliment.entity";


export const order = async (req: Request, res: Response) => {
  const { order, userId } = req.body;
  var meals: Meal[] = [];
  const newOrder = new Order();
  newOrder.delivered = false;
  newOrder.meals = meals;
  newOrder.created_at = new Date();
  try {
    newOrder.user = await getRepository(User) // Get every ingredient that have 0 stocl
      .createQueryBuilder("user")
      .where("user.id = (:id)", { id: userId })
      .getOneOrFail();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "",
    });
  }

  for await (const element of order) {
    var meal: any;
    try {
      meal = await getRepository(Meal) // Get every ingredient that have 0 stocl
        .createQueryBuilder("meal")
        .where("meal.name = (:name)", { name: element.name })
        .getOneOrFail();

      let ingredients = element.ingredients;
      for (const property in ingredients) {
        if (ingredients[property]) {
          console.log(property);
          var aliment;

          try {
            aliment = await getRepository(Aliment) // Get every ingredient that have 0 stocl
              .createQueryBuilder("aliment")
              .where("aliment.name = (:name)", { name: property })
              .andWhere("aliment.stock > 0")
              .getOneOrFail();
          } catch (error) {
            return res.status(400).json({
              status: 400,
              message: "aliment not found.",
              data: {
                property,
              },
            });
          }

          try {
            getConnection()
              .createQueryBuilder()
              .update(Aliment)
              .set({ stock: aliment.stock - 1 })
              .where("name= :name", { name: aliment.name })
              .execute();
          } catch (error) {
            return res.status(400).json({
              status: 400,
              message: "erreur de prelevement.",
              data: {
                property,
              },
            });
          }
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "This order contain a meal that does not exist.",
        data: { name: element.name },
      });
    }
    meals.push(meal);
  }

  try {
    await getRepository(Order).save(newOrder);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error while sending the new order to the server.",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "No messages",
    data: {
      order: newOrder,
    },
  });
};
