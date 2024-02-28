import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const storeByUserName = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserName) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await prismadb.category.create({
      data: {
        name,
        billboardId: billboardId || null,
        storeId,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
    
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
