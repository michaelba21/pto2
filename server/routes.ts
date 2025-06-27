import type { Express } from "express";
import { storage } from "./storage.ts";
import { insertContactSubmissionSchema } from "@shared/schema.ts";
import { emailService } from "./emailService.ts";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<void> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      console.log("New contact submission:", submission);

      try {
        await Promise.all([
          emailService.sendContactNotification(submission),
          emailService.sendAutoReply(submission),
        ]);
        console.log("Emails sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      res.json({
        success: true,
        message: "Contact form submitted successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
}