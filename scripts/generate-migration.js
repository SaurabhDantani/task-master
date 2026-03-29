const { execSync } = require('child_process');

// Parse arguments to find the migration name
const args = process.argv.slice(2);
let name = 'migration';

const nameIndex = args.indexOf('--name');
if (nameIndex !== -1 && args[nameIndex + 1]) {
  name = args[nameIndex + 1];
} else if (args[0] && !args[0].startsWith('-')) {
  // Otherwise take the first positional argument
  name = args[0];
}

console.log(`⏳ Generating migration in: src/database/migrations/${name}`);

const command = `npm run typeorm -- migration:generate -d src/config/data-source.ts src/database/migrations/${name}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
