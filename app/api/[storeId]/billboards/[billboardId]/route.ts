import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const { billboardId, storeId } = params;

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!storeId) return new NextResponse("Store not found", { status: 404 });
    if (!billboardId)
      return new NextResponse("Billboard not found", { status: 404 });

    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Store not found", { status: 404 });

    const billboard = await prismadb.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_ID_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const { billboardId, storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!billboardId) {
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

    const billboard = await prismadb.billboard.delete({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_ID_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
