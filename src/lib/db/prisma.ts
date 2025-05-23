import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a mock PrismaClient that returns empty arrays or null for all operations
class MockPrismaClient {
  product = {
    findMany: async () => [],
    findUnique: async () => ({
      id: "mock-product-id",
      name: "Mock Product",
      description: "This is a mock product since authentication has been removed",
      price: 9.99,
      imageUrl: "/placeholder.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    create: async (data: any) => ({
      id: "mock-product-id",
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };
  cart = {
    findUnique: async () => null,
    create: async () => ({
      id: "mock-cart-id",
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: null,
    }),
    update: async () => ({}),
  };
  cartItem = {
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  };
}

let prismaClient;

try {
  prismaClient = globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;
} catch (error) {
  console.warn("Failed to initialize Prisma client, using mock implementation", error);
  prismaClient = new MockPrismaClient();
}

export const prisma = prismaClient;