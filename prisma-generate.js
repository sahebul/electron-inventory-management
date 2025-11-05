import dotenv from "dotenv";

dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, ".env") });
import { spawn }  from'child_process';

const prismaGenerate = spawn('npx', ['prisma', 'generate'], {
  stdio: 'inherit',
  shell: true
});

prismaGenerate.on('close', (code) => {
  process.exit(code);
});