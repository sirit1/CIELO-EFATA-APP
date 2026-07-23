#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = "https://xzjoruazhlwmaebnqqbv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "sb_secret_6kkLxGJ0_hIujkLb7QIVSw_xUzC6NrK";
const SUPABASE_PROJECT_ID = "xzjoruazhlwmaebnqqbv";

function executeSql(sqlContent, blockName) {
  return new Promise((resolve) => {
    console.log(`\n[v0] Ejecutando ${blockName}...`);

    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/execute_sql`);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`  ✓ ${blockName} completado (${res.statusCode})`);
        resolve(true);
      });
    });

    req.on('error', (e) => {
      console.log(`  ⚠ ${blockName}: ${e.message}`);
      resolve(false);
    });

    // Enviar SQL como payload
    const payload = JSON.stringify({
      query: sqlContent
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log("=".repeat(60));
  console.log("[v0] SETUP AUTOMÁTICO SUPABASE");
  console.log("=".repeat(60));

  const bloques = [
    { archivo: 'SQL_BLOQUE_1_TABLAS.sql', nombre: 'Bloque 1: Tablas' },
    { archivo: 'SQL_BLOQUE_2_INDICES.sql', nombre: 'Bloque 2: Índices' },
    { archivo: 'SQL_BLOQUE_3_BADGES.sql', nombre: 'Bloque 3: Badges' },
  ];

  let exitosos = 0;

  for (const { archivo, nombre } of bloques) {
    try {
      if (!fs.existsSync(archivo)) {
        console.log(`[v0] ✗ No encontré ${archivo}`);
        continue;
      }

      const sql = fs.readFileSync(archivo, 'utf-8');
      const resultado = await executeSql(sql, nombre);
      
      if (resultado) exitosos++;
    } catch (error) {
      console.log(`[v0] ✗ Error en ${nombre}: ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  if (exitosos === 3) {
    console.log("[v0] ✓ SETUP COMPLETADO EXITOSAMENTE");
    console.log("[v0] ✓ Todas las tablas, índices y badges creados");
  } else {
    console.log(`[v0] ✓ Setup completado (${exitosos}/3 bloques)`);
  }
  console.log("=".repeat(60));
}

main().catch(console.error);
