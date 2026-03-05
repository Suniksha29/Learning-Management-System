import { pool, query } from '../config/database';

async function runTests() {
  console.log('🧪 Starting LMS Comprehensive Tests...\n');
  
  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Verify all tables exist
    console.log('Test 1: Verifying database schema...');
    const tables = await query<any[]>('SHOW TABLES');
    const expectedTables = ['users', 'subjects', 'sections', 'videos', 'enrollments', 'video_progress', 'refresh_tokens', 'migrations'];
    const actualTables = tables.map(t => Object.values(t)[0] as string);
    
    for (const table of expectedTables) {
      if (!actualTables.includes(table)) {
        throw new Error(`Missing table: ${table}`);
      }
    }
    console.log('✅ All tables exist\n');
    passed++;

    // Test 2: Verify subjects are seeded
    console.log('Test 2: Verifying course data...');
    const subjects = await query<any[]>('SELECT * FROM subjects ORDER BY id');
    if (subjects.length !== 4) {
      throw new Error(`Expected 4 subjects, got ${subjects.length}`);
    }
    console.log(`✅ Found ${subjects.length} courses:`);
    subjects.forEach(s => console.log(`   - ${s.title} (${s.slug})`));
    console.log('');
    passed++;

    // Test 3: Verify sections count
    console.log('Test 3: Verifying sections...');
    const sections = await query<any[]>('SELECT COUNT(*) as count FROM sections');
    if (sections[0].count !== 24) {
      throw new Error(`Expected 24 sections, got ${sections[0].count}`);
    }
    console.log(`✅ Found ${sections[0].count} sections\n`);
    passed++;

    // Test 4: Verify videos count
    console.log('Test 4: Verifying videos...');
    const videos = await query<any[]>('SELECT COUNT(*) as count FROM videos');
    if (videos[0].count !== 175) {
      throw new Error(`Expected 175 videos, got ${videos[0].count}`);
    }
    console.log(`✅ Found ${videos[0].count} videos\n`);
    passed++;

    // Test 5: Verify ordering logic
    console.log('Test 5: Testing ordering logic...');
    const testSubject = subjects[0];
    const testSections = await query<any[]>(
      'SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index',
      [testSubject.id]
    );
    
    // Verify sections are ordered correctly
    for (let i = 0; i < testSections.length - 1; i++) {
      if (testSections[i].order_index >= testSections[i + 1].order_index) {
        throw new Error('Sections not ordered correctly');
      }
    }
    
    // Verify videos are ordered correctly within sections
    for (const section of testSections) {
      const sectionVideos = await query<any[]>(
        'SELECT * FROM videos WHERE section_id = ? ORDER BY order_index',
        [section.id]
      );
      
      for (let i = 0; i < sectionVideos.length - 1; i++) {
        if (sectionVideos[i].order_index >= sectionVideos[i + 1].order_index) {
          throw new Error(`Videos not ordered correctly in section ${section.id}`);
        }
      }
    }
    console.log('✅ Ordering logic verified\n');
    passed++;

    // Test 6: Verify unique constraints
    console.log('Test 6: Testing unique constraints...');
    try {
      // Try to insert duplicate section order_index
      await query(
        'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
        [testSubject.id, 'Duplicate Test', testSections[0].order_index]
      );
      throw new Error('Should have failed on duplicate order_index');
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log('✅ Unique constraints working correctly\n');
        passed++;
      } else {
        throw error;
      }
    }

    // Test 7: Verify video progress tracking
    console.log('Test 7: Testing progress tracking...');
    const testUser = await query<any[]>('SELECT * FROM users WHERE email = ?', ['test@example.com']);
    if (testUser.length === 0) {
      throw new Error('Test user not found');
    }
    
    const firstVideo = await query<any[]>('SELECT * FROM videos LIMIT 1');
    if (firstVideo.length === 0) {
      throw new Error('No videos found');
    }
    
    // Insert progress
    await query(
      'INSERT INTO video_progress (user_id, video_id, last_position_seconds, is_completed) VALUES (?, ?, ?, ?)',
      [testUser[0].id, firstVideo[0].id, 100, true]
    );
    
    // Verify progress
    const progress = await query<any[]>(
      'SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?',
      [testUser[0].id, firstVideo[0].id]
    );
    
    if (progress.length === 0 || !progress[0].is_completed) {
      throw new Error('Progress not saved correctly');
    }
    console.log('✅ Progress tracking working\n');
    passed++;

    // Test 8: Verify enrollments
    console.log('Test 8: Testing enrollments...');
    const enrollments = await query<any[]>('SELECT COUNT(*) as count FROM enrollments');
    console.log(`✅ Found ${enrollments[0].count} enrollments\n`);
    passed++;

    // Summary
    console.log('='.repeat(50));
    console.log('📊 Test Summary:');
    console.log(`   Passed: ${passed}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Total: ${passed + failed}`);
    console.log('='.repeat(50));
    
    if (failed === 0) {
      console.log('\n🎉 All tests passed! LMS is ready for production!\n');
    } else {
      console.log('\n❌ Some tests failed. Please review the errors above.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    failed++;
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runTests();
