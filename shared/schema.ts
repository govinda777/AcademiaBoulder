import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  date: timestamp("date").notNull(),
  image: text("image").notNull(),
  location: text("location").notNull(),
  capacity: text("capacity").notNull(),
  price: text("price").notNull(),
  categories: json("categories").$type<{
    name: string;
    requirements: string;
    prizes: string;
  }[]>(),
  schedule: json("schedule").$type<{
    time: string;
    activity: string;
  }[]>(),
  speakers: json("speakers").$type<{
    name: string;
    role: string;
    bio: string;
    image: string;
  }[]>(),
  requirements: json("requirements").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

// Programs table
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  image: text("image").notNull(),
  progress: integer("progress").notNull(),
  progressLabel: text("progress_label").notNull(),
  features: json("features").$type<string[]>(),
  levels: json("levels").$type<{
    level: string;
    description: string;
    skills: string[];
  }[]>(),
  instructors: json("instructors").$type<{
    name: string;
    role: string;
    bio: string;
    image: string;
  }[]>(),
  schedule: json("schedule").$type<{
    days: string;
    times: string;
    duration: string;
  }>(),
  pricing: json("pricing").$type<{
    monthly: string;
    quarterly: string;
    annual: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
});

// Schedules table (for scheduling widget)
export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  experienceLevel: text("experience_level").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  scheduleType: text("schedule_type").notNull(), // "aula-experimental", "horario-livre", "avaliacao-tecnica"
  status: text("status").default("pending").notNull(), // "pending", "confirmed", "cancelled"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertScheduleSchema = createInsertSchema(schedules).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Community forum topics
export const forumTopics = pgTable("forum_topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id),
  commentsCount: integer("comments_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertForumTopicSchema = createInsertSchema(forumTopics).omit({
  id: true,
  commentsCount: true,
  createdAt: true,
});

// Community forum comments
export const forumComments = pgTable("forum_comments", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").references(() => forumTopics.id),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertForumCommentSchema = createInsertSchema(forumComments).omit({
  id: true,
  createdAt: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(), // "new", "read", "replied"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Schedule = typeof schedules.$inferSelect;
export type InsertSchedule = z.infer<typeof insertScheduleSchema>;

export type ForumTopic = typeof forumTopics.$inferSelect;
export type InsertForumTopic = z.infer<typeof insertForumTopicSchema>;

export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = z.infer<typeof insertForumCommentSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
