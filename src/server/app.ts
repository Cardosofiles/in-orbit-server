// libraries
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

// routes
import { createCompletionRoute } from '@/server/routes/create-completion'
import { createGoalRoute } from '@/server/routes/create-goal'
import { getPendingGoalsRoute } from '@/server/routes/get-pending-goals'
import { getWeekSummaryRoute } from '@/server/routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'in.orbit',
      description: 'API for managing goals and progress',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server',
      },
    ],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

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
