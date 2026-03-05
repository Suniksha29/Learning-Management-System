const axios = require('axios');

const API_URL = 'https://learning-management-system-2-fjlm.onrender.com/api';

async function testRegistration() {
  console.log('Testing registration endpoint...\n');
  
  try {
    // Test 1: Check if API is reachable
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed:', health.data);
    
    // Test 2: Try registration
    console.log('\n2. Testing registration...');
    const randomId = Math.random().toString(36).substring(7);
    const testData = {
      email: `test_${randomId}@example.com`,
      password: 'Test1234!',
      name: 'Test User',
      username: `testuser_${randomId}`
    };
    
    console.log('Sending registration request...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(`${API_URL}/auth/register`, testData);
    console.log('✅ Registration successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error occurred:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received - CORS or network issue');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testRegistration();
