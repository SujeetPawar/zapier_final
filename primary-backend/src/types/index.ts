import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  username: z.string().email(),
  password: z.string(),
});
export const SigninSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const zapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),

    })
  ),
});
