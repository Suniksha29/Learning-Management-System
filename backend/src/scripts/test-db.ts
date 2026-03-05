import { pool } from '../config/database';

async function testConnection() {
  try {
    console.log('Connecting to database...');
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✓ Successfully connected to the database!');
    
    // Get database info
    const [rows]: any = await connection.query('SELECT DATABASE() as db_name');
    console.log(`Current Database: ${rows[0].db_name}`);
    
    // Get user info
    const [user]: any = await connection.query('SELECT USER() as user_info');
    console.log(`User: ${user[0].user_info}`);
    
    // Show all tables
    const [tables]: any = await connection.query('SHOW TABLES');
    console.log('\nTables in database:');
    console.table(tables.map((t: any) => t[`Tables_in_${rows[0].db_name}`]));
    
    // Get row counts for each table
    console.log('\nRow counts:');
    for (const tableRow of tables) {
      const tableName = tableRow[`Tables_in_${rows[0].db_name}`];
      const [count]: any = await connection.query(`SELECT COUNT(*) as count FROM ${tableName}`);
      console.log(`  ${tableName}: ${count[0].count} rows`);
    }
    
    connection.release();
    console.log('\n✓ Database test completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error connecting to database:', error);
    process.exit(1);
  }
}

testConnection();
