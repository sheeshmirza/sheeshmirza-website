import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    // Log verified inquiry data for backend ingestion / webhook forwarding
    console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${subject}`);
    console.log(`Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully.",
    });
  } catch (error) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred while processing the request.",
      },
      { status: 500 },
    );
  }
}
