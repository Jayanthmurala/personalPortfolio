export const dynamic = 'force-dynamic';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { name, email, subject, company, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio System" <${process.env.EMAIL_USER}>`,
    to: 'jayanthmurala1@gmail.com',
    replyTo: email,
    subject: `🚀 [${subject}] Message from ${name}`,
    text: `New portfolio message:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not specified'}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #111; border-radius: 12px; background-color: #050505; color: #fff;">
        <h2 style="color: #00f5c4; border-bottom: 2px solid #a259ff; padding-bottom: 10px;">${subject}</h2>
        <p style="font-size: 16px;"><strong>From:</strong> ${name} ${company ? `(${company})` : ''}</p>
        <p style="font-size: 14px; color: #aaa;"><strong>Email:</strong> ${email}</p>
        <div style="margin-top: 25px; padding: 20px; background-color: #111; border-radius: 8px; border-left: 5px solid #a259ff;">
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      </div>
    `,
  };

  const acknowledgementOptions = {
    from: `"Jayanth Murala" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Success! Your message launched to Jayanth Murala 🚀`,
    text: `Hi ${name},\n\nThank you for reaching out! I've received your message regarding "${subject}" and I'll get back to you shortly.\n\nVisit my site: https://jayanthmurala.me\n\nBest,\nJayanth Murala`,
    html: `
      <div style="background-color: #050505; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 20px; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background: #0a0d14; border: 1px solid #1a1a1a; border-radius: 24px; padding: 40px; overflow: hidden; position: relative;">
          <!-- Branding Header -->
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; background: linear-gradient(to right, #00f5c4, #a259ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 2px;">
            JAYANTH MURALA
          </h1>
          <p style="color: #00f5c4; font-size: 12px; font-weight: 700; letter-spacing: 4px; margin-top: 5px; text-transform: uppercase;">
            Full Stack Developer
          </p>
          
          <div style="margin: 40px 0; height: 1px; background: linear-gradient(to right, transparent, #1a1a1a, transparent);"></div>
          
          <!-- Profile Picture -->
          <div style="margin-bottom: 20px;">
            <img src="https://ik.imagekit.io/jayanthmurala05/ChatGPT_Image_Mar_30__2025__05_06_26_PM-removebg-preview.png?updatedAt=1751966158471" alt="Jayanth Murala" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #00f5c4; padding: 5px; background: #0d1117;">
          </div>

          <!-- Content -->
          <h2 style="font-size: 24px; margin-bottom: 20px; color: #fff;">Hello ${name}! 👋</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; margin-bottom: 30px;">
            Your message regarding <span style="color: #00f5c4; font-weight: 600;">"${subject}"</span> has successfully reached my system. 
            I appreciate you taking the time to visit my portfolio.
          </p>
          
          <div style="background: #0d1117; border-radius: 16px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #a259ff;">
             <p style="margin: 0; color: #fff; font-style: italic; font-size: 14px;">
               "I'll review your details and get back to you within 24-48 hours. Looking forward to our connection!"
             </p>
          </div>

          <!-- Social Links -->
          <div style="margin-top: 40px;">
            <p style="font-size: 13px; color: #4b5563; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Stay Connected</p>
            <a href="https://github.com/Jayanthmurala" style="text-decoration: none; margin: 0 10px; color: #00f5c4; font-weight: 600;">GitHub</a>
            <a href="https://www.linkedin.com/in/jayanth-murala-0045b2281" style="text-decoration: none; margin: 0 10px; color: #00f5c4; font-weight: 600;">LinkedIn</a>
            <a href="https://www.instagram.com/jayanthmurala_/" style="text-decoration: none; margin: 0 10px; color: #00f5c4; font-weight: 600;">Instagram</a>
          </div>
          
          <div style="margin-top: 40px; font-size: 11px; color: #374151;">
             © ${new Date().getFullYear()} Jayanth Murala. All rights reserved.
          </div>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails concurrently
    const results = await Promise.allSettled([
      transporter.sendMail(mailOptions),
      transporter.sendMail(acknowledgementOptions)
    ]);

    // Check if the primary notification succeeded
    if (results[0].status === 'rejected') {
      console.error('Primary email failed:', results[0].reason);
      throw new Error('Failed to send primary notification');
    }

    if (results[1].status === 'rejected') {
      console.warn('Acknowledgement email failed:', results[1].reason);
    }

    return NextResponse.json({ message: 'Email sequence completed' });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({
      message: 'Error sending email',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}