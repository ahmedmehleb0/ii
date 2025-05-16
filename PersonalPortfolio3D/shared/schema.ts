import { pgTable, text, serial, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  image: text("image"),
  tags: jsonb("tags").default([]).notNull(),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  icon: text("icon").notNull(),
  proficiency: integer("proficiency").notNull(), // 0-100 value
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Messages table (for contact form)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: text("email").notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  read: integer("read").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define insert schemas for each table
export const insertUserSchema = createInsertSchema(users, {
  name: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
}).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  bio: true,
  profileImage: true,
});

export const insertProjectSchema = createInsertSchema(projects, {
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  link: z.string().optional(),
}).pick({
  title: true,
  description: true,
  image: true,
  tags: true,
  link: true,
});

export const insertSkillSchema = createInsertSchema(skills, {
  category: z.string().optional(),
}).pick({
  name: true,
  icon: true,
  proficiency: true,
  category: true,
});

export const insertMessageSchema = createInsertSchema(messages, {
  subject: z.string().optional(),
}).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Define types for each schema
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
