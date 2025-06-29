import detect from 'detect-port';
import { exec } from 'child_process';

const PORT = 3000;

(async () => {
  const _port = await detect(PORT);
  if (_port === PORT) {
    console.log(`✅ Port ${PORT} is free.`);
    process.exit(0);
  }

  // Kill process on the port
  console.log(`⛔ Port ${PORT} is in use. Killing process...`);
  exec(`lsof -ti tcp:${PORT} | xargs kill -9`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Failed to kill process on port ${PORT}:`, err);
      process.exit(1);
    } else {
      console.log(`✅ Port ${PORT} has been freed.`);
      process.exit(0);
    }
  });
})();
