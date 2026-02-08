const { PrismaClient } = require('../node_modules/@prisma/client');
const { hash } = require('../node_modules/bcryptjs');

(async () => {
  const prisma = new PrismaClient();
  const pw = await hash('Admin1234', 10);
  const u = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash: pw,
      role: 'admin',
    },
  });
  console.log(u);
  await prisma.$disconnect();
})();
