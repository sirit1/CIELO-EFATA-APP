const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'https://xzjoruazhlwmaebnqqbv.supabase.co';
const SERVICE_ROLE_KEY = 'sb_secret_6kkLxGJ0_hIujkLb7QIVSw_xUzC6NrK';

// Leer los 3 bloques SQL
const bloque1 = fs.readFileSync('./SQL_BLOQUE_1_TABLAS.sql', 'utf8');
const bloque2 = fs.readFileSync('./SQL_BLOQUE_2_INDICES.sql', 'utf8');
const bloque3 = fs.readFileSync('./SQL_BLOQUE_3_BADGES.sql', 'utf8');

const bloques = [
  { name: 'BLOQUE 1: TABLAS', sql: bloque1 },
  { name: 'BLOQUE 2: ÍNDICES', sql: bloque2 },
  { name: 'BLOQUE 3: BADGES', sql: bloque3 }
];

async function executeSql(sql, nombre) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });
    
    const options = {
      hostname: 'xzjoruazhlwmaebnqqbv.supabase.co',
      path: '/rest/v1/rpc/execute_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ ${nombre}: SUCCESS`);
            resolve(parsed);
          } else {
            console.log(`❌ ${nombre}: ERROR - ${body}`);
            reject(new Error(body));
          }
        } catch (e) {
          // Algunos endpoints devuelven status 200 sin JSON
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ ${nombre}: SUCCESS`);
            resolve({ success: true });
          } else {
            console.log(`❌ ${nombre}: ERROR - ${body}`);
            reject(new Error(body));
          }
        }
      });
    });

    req.on('error', (e) => {
      console.error(`❌ ${nombre}: ERROR - ${e.message}`);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

// Ejecutar todos los bloques
(async () => {
  console.log('🚀 Iniciando setup de base de datos...\n');
  
  for (const bloque of bloques) {
    try {
      await executeSql(bloque.sql, bloque.name);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1s entre ejecuciones
    } catch (error) {
      console.error(`Error en ${bloque.name}:`, error.message);
    }
  }
  
  console.log('\n✅ Setup completado!');
  console.log('📊 Verifica en Supabase → Table Editor que veas 8 tablas nuevas');
})();
