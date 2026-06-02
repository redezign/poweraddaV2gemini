import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 5; // max 5 submissions per minute

  const limitData = rateLimitMap.get(ip) || [];
  // Filter out timestamps older than the window
  const activeRequests = limitData.filter((time) => now - time < windowMs);
  
  if (activeRequests.length >= maxRequests) {
    return true;
  }

  activeRequests.push(now);
  rateLimitMap.set(ip, activeRequests);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate Limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submission attempts. Please try again after a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { 
      formType, // "contact" | "quote" | "vendor"
      name, 
      phone, 
      email, 
      city, 
      message,
      // For Quote
      company,
      serviceRequired,
      budgetRange,
      projectDetails,
      // For Vendor
      companyName,
      contactPerson,
      productsOffered,
      website,
      businessDescription,
      // Security
      turnstileToken 
    } = body;

    // Basic Validation
    if (!formType || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (form type, phone, email)." },
        { status: 400 }
      );
    }

    // Turnstile Verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              secret: turnstileSecret,
              response: turnstileToken,
              remoteip: ip,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return NextResponse.json(
            { success: false, error: "Security check failed (Turnstile verification error)." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Turnstile verify failed:", err);
        // Fallback: don't crash under local dev without keys unless strict
      }
    } else {
      console.log("Skipping Turnstile verification - secret or token not provided.");
    }

    const timestamp = new Date().toISOString();

    // Prepare unified and descriptive payload for Google Sheets & Email
    const submissionData = {
      timestamp,
      ip,
      formType,
      // Contact fields
      name: name || contactPerson || companyName || "N/A",
      phone,
      email,
      city: city || "N/A",
      message: message || projectDetails || businessDescription || "N/A",
      // Quote-specific
      company: company || "N/A",
      serviceRequired: serviceRequired || "N/A",
      budgetRange: budgetRange || "N/A",
      projectDetails: projectDetails || "N/A",
      // Vendor-specific
      companyName: companyName || "N/A",
      contactPerson: contactPerson || "N/A",
      productsOffered: productsOffered || "N/A",
      website: website || "N/A",
      businessDescription: businessDescription || "N/A",
    };

    // 1. Google Sheets Integration via Apps Script
    let sheetsSuccess = false;
    const sheetsUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (sheetsUrl) {
      try {
        const sheetResponse = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });
        if (sheetResponse.ok) {
          sheetsSuccess = true;
        } else {
          console.error("Google Sheets API returned non-ok status:", sheetResponse.status);
        }
      } catch (err) {
        console.error("Failed sending data to Google Sheets:", err);
      }
    } else {
      console.log("No GOOGLE_APPS_SCRIPT_URL set - skipping sheet update.");
    }

    // 2. Email Notification via Resend API
    let resendSuccess = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = "vynentra@gmail.com";

    // Format HTML email content dynamically
    const emailSubject = `🚀 PowerAdda New Lead: [${formType.toUpperCase()}] from ${submissionData.name}`;
    let emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 8px;">New Lead Submission - PowerAdda</h2>
        <p>A new <strong>${formType}</strong> lead has been captured on the PowerAdda platform.</p>
        
        <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Submission Type</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${formType.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Timestamp</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${timestamp}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Full Name / Contact</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email Address</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone Number</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">City</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.city}</td>
          </tr>
    `;

    if (formType === "quote") {
      emailHtml += `
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Company Name</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Service Required</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.serviceRequired}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Budget Range</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.budgetRange}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Project Details</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.projectDetails}</td>
          </tr>
      `;
    } else if (formType === "vendor") {
      emailHtml += `
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Company Name</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Products Offered</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.productsOffered}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Website</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="${website}" target="_blank">${website}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Business Description</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.businessDescription}</td>
          </tr>
      `;
    } else {
      emailHtml += `
          <tr style="background:#f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionData.message}</td>
          </tr>
      `;
    }

    emailHtml += `
        </table>
        
        <p style="margin-top: 25px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          This submission was routed from the PowerAdda platform. IP: ${ip}
        </p>
      </div>
    `;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "PowerAdda Platform <onboarding@resend.dev>",
            to: adminEmail,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          resendSuccess = true;
        } else {
          const errBody = await emailResponse.text();
          console.error("Resend API rejected transmission:", errBody);
        }
      } catch (err) {
        console.error("Failed sending email notification through Resend:", err);
      }
    } else {
      console.log(`No RESEND_API_KEY set - simulate email to ${adminEmail}:`, emailSubject);
    }

    return NextResponse.json({
      success: true,
      message: "Lead successfully captured and routed.",
      data: {
        sheetsRouted: sheetsSuccess || (sheetsUrl ? false : "simulated"),
        emailSent: resendSuccess || (resendApiKey ? false : "simulated"),
        timestamp,
      },
    });

  } catch (error: any) {
    console.error("API Route Form Submission Failure:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred processing your submission." },
      { status: 500 }
    );
  }
}
