import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertProjectSchema, insertSkillSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleError = (res: Response, error: any) => {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.errors 
      });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  // API Routes
  // Projects routes
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Skills routes
  app.get("/api/skills", async (req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/skills/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid skill ID" });
      }
      
      const skill = await storage.getSkill(id);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      
      res.json(skill);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/skills", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Contact/Messages routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json({ 
        success: true, 
        messageId: message.id,
        message: "Your message has been sent successfully." 
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
