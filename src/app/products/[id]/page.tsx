import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      // Create mock product if not found
      return {
        id,
        name: `Mock Product ${id}`,
        description: "This is a mock product since database is not available",
        price: 9.99,
        imageUrl: "/placeholder.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    // Create mock product if database is not available
    return {
      id,
      name: `Mock Product ${id}`,
      description: "This is a mock product since database is not available",
      price: 9.99,
      imageUrl: "/placeholder.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Platform Engineering",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        unoptimized
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
