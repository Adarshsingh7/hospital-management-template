import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import { Admin, hashPassword } from "@/lib/models";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if any admin exists in the database. If not, seed default admin.
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultPasswordHash = hashPassword("admin123");
      await Admin.create({
        username: "admin",
        passwordHash: defaultPasswordHash,
      });
      console.log("Seeded default admin user: admin / admin123");
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const hashedPasswordInput = hashPassword(password);
    if (admin.passwordHash !== hashedPasswordInput) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
