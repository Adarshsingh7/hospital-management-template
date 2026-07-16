import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import { Doctor } from "@/lib/models";
import { appointmentDoctors } from "@/lib/site-data";

export async function GET() {
  try {
    await dbConnect();
    let doctors = await Doctor.find({}).sort({ name: 1 });

    if (doctors.length === 0) {
      console.log("No doctors found in DB. Seeding default doctors...");
      const seedDoctors = appointmentDoctors.map((doc) => {
        let opdDays = [doc.opdDay];
        if (doc.name === "Dr. Amit Sharma") {
          opdDays = [1, 3, 5];
        } else if (doc.name === "Dr. Priya Singh") {
          opdDays = [2, 6];
        }
        return {
          name: doc.name,
          department: doc.department,
          specialty: doc.specialty,
          subspecialty: doc.subspecialty,
          availability: doc.availability,
          rating: doc.rating || "4.8",
          image: doc.image,
          opdDays,
          startTime: "11:00 AM",
          endTime: "03:30 PM",
        };
      });

      await Doctor.insertMany(seedDoctors);
      doctors = await Doctor.find({}).sort({ name: 1 });
    }

    return NextResponse.json({ success: true, doctors });
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch doctors" },
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
    const { name, department, specialty, subspecialty, availability, rating, image, opdDays, startTime, endTime } = body;

    if (!name || !department || !specialty || !opdDays || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: "Missing required doctor fields" },
        { status: 400 }
      );
    }

    const newDoc = await Doctor.create({
      name,
      department,
      specialty,
      subspecialty: subspecialty || "",
      availability: availability || "",
      rating: rating || "4.8",
      image: image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250&h=250",
      opdDays,
      startTime,
      endTime,
    });

    return NextResponse.json({ success: true, doctor: newDoc }, { status: 201 });
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
    const { id, name, department, specialty, subspecialty, availability, rating, image, opdDays, startTime, endTime } = body;

    if (!id || !name || !department || !specialty || !opdDays || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: "Missing required doctor fields" },
        { status: 400 }
      );
    }

    const updatedDoc = await Doctor.findByIdAndUpdate(
      id,
      {
        name,
        department,
        specialty,
        subspecialty: subspecialty || "",
        availability: availability || "",
        rating: rating || "4.8",
        image: image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250&h=250",
        opdDays,
        startTime,
        endTime,
      },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json(
        { success: false, error: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, doctor: updatedDoc });
  } catch (error) {
    console.error("Failed to update doctor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update doctor" },
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
        { success: false, error: "Missing doctor ID" },
        { status: 400 }
      );
    }

    await Doctor.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
