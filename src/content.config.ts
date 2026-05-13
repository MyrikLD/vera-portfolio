import { defineCollection, z } from 'astro:content';

// Content is managed by Keystatic — these definitions silence the auto-generation warning.
// Do NOT query these collections directly; use @keystatic/core/reader instead.
const projects = defineCollection({ type: 'content' });
const profile = defineCollection({ type: 'content' });

export const collections = { projects, profile };
