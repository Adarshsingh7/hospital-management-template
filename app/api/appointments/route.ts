import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import { Appointment } from "@/lib/models";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_123456789_abcdef");

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { fullName, contactNumber, email, department, doctor, date, timeSlot, reason } = body;

    // Validation
    if (!fullName || !contactNumber || !department || !doctor || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      fullName,
      contactNumber,
      email: email || "",
      department,
      doctor,
      date,
      timeSlot,
      reason: reason || "",
    });

    // Send confirmation email via Resend if email is provided
    if (email && email.trim()) {
      try {
        await resend.emails.send({
          from: "V.K. Medical Center <appointments@resend.dev>",
          to: email.trim(),
          subject: `Appointment Confirmed - ${doctor}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <h2 style="color: #be123c; border-bottom: 2px solid #be123c; padding-bottom: 10px; margin-top: 0;">V.K. Medical Center</h2>
              <p style="font-size: 16px; font-weight: bold; color: #1e293b;">Appointment Confirmation Receipt</p>
              <p>Dear <strong>${fullName}</strong>,</p>
              <p>Your appointment has been successfully scheduled. Details are below:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; width: 35%;">Specialty</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${department}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Specialist Doctor</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${doctor}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">OPD Date</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Time Slot</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${timeSlot}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Contact Number</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${contactNumber}</td>
                </tr>
                ${reason ? `
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Symptoms / Reason</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${reason}</td>
                </tr>
                ` : ""}
              </table>
              
              <div style="background-color: #fff1f2; border-left: 4px solid #f43f5e; padding: 12px; margin-top: 20px;">
                <p style="margin: 0; font-size: 13px; color: #9f1239; font-weight: bold;">Important Guidelines:</p>
                <ul style="margin: 5px 0 0 0; padding-left: 20px; font-size: 13px; color: #4c0519;">
                  <li>Please arrive 15 minutes before your scheduled slot.</li>
                  <li>In case of emergency or cancellation, please call +91 9450987101 or +91 9839454508.</li>
                  <li>Address: Akbarpur-Baskhari Road, near Kisan Nursery, Akbarpur, Ambedkar Nagar.</li>
                </ul>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                This is an automated confirmation email from V.K. Medical Center. Please do not reply directly to this email.
              </p>
            </div>
          `
        });
        console.log(`Confirmation email sent successfully via Resend to: ${email}`);
      } catch (emailError) {
        console.error("Resend confirmation email failed to send:", emailError);
      }
    }

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create appointment:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create appointment";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Authentication Check
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch appointments";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
