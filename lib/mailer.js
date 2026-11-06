// lib/mailer.js — SMTP via nodemailer, lazy singleton. Never throws when unconfigured: returns { sent:false }.
import nodemailer from "nodemailer";
import { SITE } from "@/src/config/site";

let transporter = null;

export function isMailConfigured() {
  const e = process.env;
  return Boolean(e.SMTP_HOST && e.SMTP_USER && e.SMTP_PASS);
}

function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

export function ownerEmail() {
  return process.env[SITE.reply.ownerEmailEnv] || process.env.ORDER_EMAIL || SITE.contact.email;
}

export async function sendMail({ to, subject, html, text, replyTo, attachments }) {
  if (!isMailConfigured()) return { sent: false, reason: "not-configured" };
  try {
    const from = process.env.SMTP_FROM || `"${SITE.name}" <${process.env.SMTP_USER}>`;
    await getTransporter().sendMail({ from, to, subject, html, text, replyTo, attachments });
    return { sent: true };
  } catch (err) {
    console.error("[mailer]", err?.message || err);
    return { sent: false, reason: "send-failed" };
  }
}
