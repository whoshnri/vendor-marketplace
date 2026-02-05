// import { PrismaClient } from '@/lib/generated/prisma/client'
// import { PrismaPg } from '@prisma/adapter-pg'

// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient
// }

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// })

// const prisma = globalForPrisma.prisma || new PrismaClient({
//   adapter,
// })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export { prisma }
import { PrismaClient } from './generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})
const prisma = new PrismaClient({ adapter })

export { prisma }