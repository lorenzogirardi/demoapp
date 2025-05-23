import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {
  let products = [];
  
  try {
    products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Create mock products if database is not available
    products = [
      {
        id: "mock-product-1",
        name: "Mock Product 1",
        description: "This is a mock product since database is not available",
        price: 9.99,
        imageUrl: "/placeholder.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "mock-product-2",
        name: "Mock Product 2",
        description: "This is another mock product",
        price: 19.99,
        imageUrl: "/placeholder.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "mock-product-3",
        name: "Mock Product 3",
        description: "This is yet another mock product",
        price: 29.99,
        imageUrl: "/placeholder.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/hero-image.jpg"
            className="w-full max-w-sm rounded-lg shadow-2xl"
            alt="Hero Image"
          />
          <div>
            <h1 className="text-5xl font-bold">Platform Engineering Demo App</h1>
            <p className="py-6">
              This is a demo e-commerce application built with Next.js, Tailwind CSS, and DaisyUI.
              Authentication has been removed from this application.
            </p>
            <Link href="/products" className="btn-primary btn">
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}