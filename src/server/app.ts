import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { createCompletionRoute } from '@/server/routes/create-completion'
import { createGoalRoute } from '@/server/routes/create-goal'
import { getPendingGoalsRoute } from '@/server/routes/get-pending-goals'
import { getWeekSummaryRoute } from '@/server/routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server listening 🔥')
  })

/***
 * Validation routes types
 * https://github.com/turkerdev/fastify-type-provider-zod
 *
 */
