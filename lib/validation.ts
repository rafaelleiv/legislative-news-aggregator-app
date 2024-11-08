import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' }),

  summary: z
    .string()
    .min(5, { message: 'Summary must be at least 5 characters long' }),

  topics: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .min(1, { message: 'Please select at least one topic' }),

  states: z
    .array(z.object({ id: z.number(), name: z.string(), code: z.string() }))
    .min(1, { message: 'Please select at least one state' }),

  image: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');
          return contentType && contentType.startsWith('image/');
        } catch {
          return false;
        }
      },
      { message: 'The image URL is not accessible or is not an image' }
    ),

  link: z
    .string()
    .url({ message: 'Please enter a valid URL for the source link' }),
});
