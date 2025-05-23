"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  try {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items?.find((item) => item.productId === productId);

    if (articleInCart) {
      try {
        await prisma.cartItem.update({
          where: { id: articleInCart.id },
          data: { quantity: { increment: 1 } },
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      try {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: 1,
          },
        });
      } catch (error) {
        console.error("Error creating cart item:", error);
      }
    }

    revalidatePath("/products/[id]");
  } catch (error) {
    console.error("Error in incrementProductQuantity:", error);
  }
}
