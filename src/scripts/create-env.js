const fs = require('fs');

const apiKey = process.env.apiKey;

if (!apiKey) {
  throw new Error('apiKey no está configurada en Netlify');
}

const content = `export const environment = {
  production: true,
  apiKey: '${apiKey}',
};
`;

fs.writeFileSync(
  'src/environments/environments.ts',
  content
);

console.log('Environment creado correctamente');