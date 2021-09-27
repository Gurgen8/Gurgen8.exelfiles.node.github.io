import Excel from "../models/Excel";


async function migrate() {
  await Excel.sync({ alter: true });
  console.log('ok');
  process.exit(0)
}

migrate();
