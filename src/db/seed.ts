import dayjs from 'dayjs'

import { client, db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Exercise', desiredWeeklyFrequency: 3 },
      { title: 'Workout', desiredWeeklyFrequency: 2 },
      { title: 'Grocery Shopping', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: result[2].id, createdAt: startOfWeek.add(2, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
