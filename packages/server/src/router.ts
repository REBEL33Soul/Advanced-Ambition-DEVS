import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.string().optional())
    .query(({ input }) => {
      return `Hello ${input ?? 'World'}`;
    }),
});

export type AppRouter = typeof appRouter;