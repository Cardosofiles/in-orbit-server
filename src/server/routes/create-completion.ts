import { z } from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createGoalCompletion } from '@/services/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        tags: ['goal'],
        description: 'Complete a goal',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { goalId } = request.body

      await createGoalCompletion({ goalId })

      return reply.status(201).send()
    }
  )
}
