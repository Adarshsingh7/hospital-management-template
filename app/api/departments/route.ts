import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import { Department } from "@/lib/models";
import { appointmentDepartments } from "@/lib/site-data";

export async function GET() {
  try {
    await dbConnect();
    let departments = await Department.find({}).sort({ name: 1 });

    if (departments.length === 0) {
      console.log("No departments found in DB. Seeding default departments...");
      await Department.insertMany(appointmentDepartments);
      departments = await Department.find({}).sort({ name: 1 });
    }

    return NextResponse.json({ success: true, departments });
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();
    const { name, icon } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Department name is required" },
        { status: 400 }
      );
    }

    const newDept = await Department.create({
      name,
      icon: icon || "calendar",
    });

    return NextResponse.json({ success: true, department: newDept }, { status: 201 });
  } catch (error: unknown) {
    console.error("Failed to create department:", error);
    const err = error as { code?: number };
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Department already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create department" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing department ID" },
        { status: 400 }
      );
    }

    await Department.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Failed to delete department:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete department" },
      { status: 500 }
    );
  }
}
