const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    // Insert 1000 users
    const users = [];
    for (let i = 1; i <= 1000; i++) {
      const email = `user${i}@example.com`;
      const password = await bcrypt.hash('password123', 10);
      const role = i <= 10 ? 'ADMIN' : i <= 100 ? 'EDITOR' : 'VIEWER';
      users.push(`('${email}', '${password}', '${role}', true)`);
    }
    await pool.query(`
      INSERT INTO users (email, password, role, is_active)
      VALUES ${users.join(', ')}
    `);

    // Insert 100,000 documents
    const documents = [];
    for (let i = 1; i <= 100000; i++) {
      const title = `Document ${i}`;
      const description = `Description for document ${i}`;
      const filePath = `uploads/doc${i}.pdf`;
      const createdById = (i % 1000) + 1; // Cycle through user IDs
      documents.push(`('${title}', '${description}', '${filePath}', ${createdById})`);
    }
    await pool.query(`
      INSERT INTO documents (title, description, file_path, created_by_id)
      VALUES ${documents.join(', ')}
    `);

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await pool.end();
  }
}

seed();