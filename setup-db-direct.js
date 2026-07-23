const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://xzjoruazhlwmaebnqqbv.supabase.co';
const SERVICE_ROLE_KEY = 'sb_secret_6kkLxGJ0_hIujkLb7QIVSw_xUzC6NrK';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function setupDatabase() {
  console.log('🚀 Iniciando setup de base de datos...\n');

  try {
    // BLOQUE 1: TABLAS
    console.log('📝 Ejecutando BLOQUE 1: Creando tablas...');
    const bloque1SQL = fs.readFileSync('./SQL_BLOQUE_1_TABLAS.sql', 'utf8');
    
    // Ejecutar cada statement por separado
    const statements1 = bloque1SQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const stmt of statements1) {
      try {
        const { data, error } = await supabase.rpc('query_exec', { sql: stmt });
        if (error) {
          console.log(`⚠️ Warning: ${error.message}`);
        } else {
          console.log('✅ Tabla creada');
        }
      } catch (e) {
        // Ignorar errores si la tabla ya existe
        if (!e.message.includes('already exists')) {
          console.error('Error:', e.message);
        }
      }
    }

    console.log('\n✅ BLOQUE 1 completado\n');

    // BLOQUE 2: ÍNDICES
    console.log('📝 Ejecutando BLOQUE 2: Creando índices...');
    const bloque2SQL = fs.readFileSync('./SQL_BLOQUE_2_INDICES.sql', 'utf8');
    
    const statements2 = bloque2SQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const stmt of statements2) {
      try {
        const { data, error } = await supabase.rpc('query_exec', { sql: stmt });
        if (error) {
          console.log(`⚠️ ${error.message}`);
        } else {
          console.log('✅ Índice creado');
        }
      } catch (e) {
        console.log(`⚠️ ${e.message}`);
      }
    }

    console.log('\n✅ BLOQUE 2 completado\n');

    // BLOQUE 3: BADGES
    console.log('📝 Ejecutando BLOQUE 3: Insertando 25 badges...');
    const bloque3SQL = fs.readFileSync('./SQL_BLOQUE_3_BADGES.sql', 'utf8');
    
    const statements3 = bloque3SQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const stmt of statements3) {
      try {
        const { data, error } = await supabase.rpc('query_exec', { sql: stmt });
        if (error) {
          console.log(`⚠️ ${error.message}`);
        } else {
          console.log('✅ Badges insertados');
        }
      } catch (e) {
        console.log(`⚠️ ${e.message}`);
      }
    }

    console.log('\n✅ BLOQUE 3 completado\n');

    console.log('\n🎉 ¡Setup completado exitosamente!');
    console.log('📊 Verifica en Supabase → Table Editor que veas 8 tablas nuevas');
    console.log('\n⚡ Próximo paso: npm run dev');

  } catch (error) {
    console.error('Error fatal:', error.message);
    process.exit(1);
  }
}

setupDatabase();
