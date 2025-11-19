const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

// Validation helper
const validateContactData = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.push("Please provide a valid email address");
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  if (data.subject && data.subject.length > 100) {
    errors.push("Subject must be less than 100 characters");
  }

  if (data.message && data.message.length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  return errors;
};

const createContact = async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const { name = "", email = "", subject = "", message = "" } = req.body;

    // Validate user input
    const validationErrors = validateContactData({ name, email, subject, message });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Save to MongoDB
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await newContact.save();

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // Email Content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // You receive message
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p>This message was sent from your portfolio contact form.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Success Response
    res.status(201).json({
      success: true,
      message: "Message sent successfully! I will contact you soon.",
    });

  } catch (error) {
    console.error("Email/Mongo Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while sending message.",
      error: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).select("-__v");

    res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error("Fetching contacts error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve contacts",
      errors: ["Internal server error"],
    });
  }
};

module.exports = { createContact, getAllContacts };
