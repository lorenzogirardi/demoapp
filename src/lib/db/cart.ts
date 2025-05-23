import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const cookieStore = cookies();
  const newCart = await prisma.cart.create({
    data: {},
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  // Note: We need to use .set() instead of .delete() then .set() because
  // Next.js throws error when mixing these operations
  cookieStore.set("cartId", newCart.id);

  return {
    ...newCart,
    size: 0,
    subtotal: 0,
  };
}