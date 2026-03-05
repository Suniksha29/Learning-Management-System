import { pool } from '../config/database';

async function showDatabaseSchema() {
  try {
    console.log('='.repeat(60));
    console.log('DATABASE CONNECTION DETAILS');
    console.log('='.repeat(60));
    
    const connection = await pool.getConnection();
    
    // Get database info
    const [rows]: any = await connection.query('SELECT DATABASE() as db_name');
    console.log(`\nDatabase Name: ${rows[0].db_name}`);
    
    // Get user info
    const [user]: any = await connection.query('SELECT USER() as user_info');
    console.log(`Connected User: ${user[0].user_info}`);
    
    // Get MySQL version
    const [version]: any = await connection.query('SELECT VERSION() as version');
    console.log(`MySQL Version: ${version[0].version}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('TABLES AND STRUCTURE');
    console.log('='.repeat(60));
    
    // Show all tables
    const [tables]: any = await connection.query(`
      SELECT 
        TABLE_NAME,
        TABLE_ROWS,
        CREATE_TIME
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = '${rows[0].db_name}'
      ORDER BY TABLE_NAME
    `);
    
    console.log(`\nFound ${tables.length} table(s):\n`);
    
    for (const table of tables) {
      console.log(`\n📊 Table: ${table.TABLE_NAME}`);
      console.log(`   Rows: ${table.TABLE_ROWS}`);
      console.log(`   Created: ${table.CREATE_TIME}`);
      
      // Get column structure
      const [columns]: any = await connection.query(`
        SELECT 
          COLUMN_NAME,
          DATA_TYPE,
          IS_NULLABLE,
          COLUMN_KEY,
          COLUMN_DEFAULT,
          EXTRA
        FROM information_schema.COLUMNS 
        WHERE TABLE_SCHEMA = '${rows[0].db_name}'
          AND TABLE_NAME = '${table.TABLE_NAME}'
        ORDER BY ORDINAL_POSITION
      `);
      
      console.log('\n   Columns:');
      console.log('   ' + '-'.repeat(50));
      for (const col of columns) {
        const nullable = col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL';
        const key = col.COLUMN_KEY === 'PRI' ? 'PRIMARY KEY' : '';
        const extra = col.EXTRA ? col.EXTRA : '';
        console.log(`   • ${col.COLUMN_NAME.padEnd(20)} ${col.DATA_TYPE.padEnd(15)} ${nullable.padEnd(10)} ${key} ${extra}`);
      }
      
      // Get indexes
      const [indexes]: any = await connection.query(`SHOW INDEX FROM ${table.TABLE_NAME}`);
      if (indexes.length > 0) {
        console.log('\n   Indexes:');
        console.log('   ' + '-'.repeat(50));
        const uniqueIndexes = new Set();
        for (const idx of indexes) {
          if (!uniqueIndexes.has(idx.Key_name)) {
            uniqueIndexes.add(idx.Key_name);
            console.log(`   • ${idx.Key_name} (${idx.Column_name})`);
          }
        }
      }
      
      console.log('');
    }
    
    // Sample data from each table
    console.log('\n' + '='.repeat(60));
    console.log('SAMPLE DATA');
    console.log('='.repeat(60));
    
    for (const table of tables) {
      console.log(`\n📋 ${table.TABLE_NAME} (first 3 rows):`);
      const [data]: any = await connection.query(`SELECT * FROM ${table.TABLE_NAME} LIMIT 3`);
      console.table(data);
    }
    
    connection.release();
    console.log('\n✓ Schema inspection completed!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

showDatabaseSchema();
