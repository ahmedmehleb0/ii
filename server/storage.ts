import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  messages, type Message, type InsertMessage
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

// Interface with CRUD methods for all tables
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill methods
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Message methods
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<boolean>;
  deleteMessage(id: number): Promise<boolean>;
}

// In-memory storage implementation (for development/fallback)
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private projectsMap: Map<number, Project>;
  private skillsMap: Map<number, Skill>;
  private messagesMap: Map<number, Message>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentSkillId: number;
  private currentMessageId: number;

  constructor() {
    this.usersMap = new Map();
    this.projectsMap = new Map();
    this.skillsMap = new Map();
    this.messagesMap = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentSkillId = 1;
    this.currentMessageId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      name: insertUser.name || null,
      email: insertUser.email || null,
      bio: insertUser.bio || null,
      profileImage: insertUser.profileImage || null
    };
    this.usersMap.set(id, user);
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: now,
      link: insertProject.link || null,
      image: insertProject.image || null,
      tags: insertProject.tags || []
    };
    this.projectsMap.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projectsMap.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updateData };
    this.projectsMap.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projectsMap.delete(id);
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skillsMap.values());
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skillsMap.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const now = new Date();
    const skill: Skill = { 
      ...insertSkill, 
      id, 
      createdAt: now,
      category: insertSkill.category || null
    };
    this.skillsMap.set(id, skill);
    return skill;
  }

  async updateSkill(id: number, updateData: Partial<InsertSkill>): Promise<Skill | undefined> {
    const skill = this.skillsMap.get(id);
    if (!skill) return undefined;
    
    const updatedSkill = { ...skill, ...updateData };
    this.skillsMap.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.skillsMap.delete(id);
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messagesMap.values());
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return this.messagesMap.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const now = new Date();
    const message: Message = { 
      ...insertMessage, 
      id, 
      read: 0, 
      createdAt: now,
      subject: insertMessage.subject || null
    };
    this.messagesMap.set(id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.messagesMap.get(id);
    if (!message) return false;
    
    message.read = 1;
    this.messagesMap.set(id, message);
    return true;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messagesMap.delete(id);
  }
}

// PostgreSQL storage implementation
export class PostgresStorage implements IStorage {
  private db;
  
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return await this.db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await this.db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await this.db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return await this.db.select().from(skills);
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const result = await this.db.select().from(skills).where(eq(skills.id, id)).limit(1);
    return result[0];
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const result = await this.db.insert(skills).values(insertSkill).returning();
    return result[0];
  }

  async updateSkill(id: number, updateData: Partial<InsertSkill>): Promise<Skill | undefined> {
    const result = await this.db.update(skills).set(updateData).where(eq(skills.id, id)).returning();
    return result[0];
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await this.db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return await this.db.select().from(messages);
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const result = await this.db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return result[0];
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await this.db.insert(messages).values(insertMessage).returning();
    return result[0];
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const result = await this.db.update(messages).set({ read: 1 }).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await this.db.delete(messages).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }
}

// Use PostgreSQL if DATABASE_URL is available, otherwise use in-memory storage
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
