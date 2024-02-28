import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const { categoryId, storeId } = params;

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!storeId) return new NextResponse("Store not found", { status: 404 });
    if (!categoryId)
      return new NextResponse("Billboard not found", { status: 404 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!billboardId)
      return new NextResponse("Billboard ID is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Store not found", { status: 404 });

    const category = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const { categoryId, storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!categoryId) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
