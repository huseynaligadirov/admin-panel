// mockApi.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);


mock.onPost('/login').reply(config => {
  const { username, password } = JSON.parse(config.data);
  if (username === 'admin' && password === 'password') {

    document.cookie = 'authToken=fake-jwt-token; path=/;';
    return [200, { message: 'Login successful' }];
  }
  return [401, { message: 'Invalid credentials' }];
});


mock.onGet('/dashboard/data').reply(config => {
  const token = document.cookie.includes('authToken=fake-jwt-token');
  if (token) {
    return [200, { data: 'Protected data' }];
  }
  return [403, { message: 'Forbidden' }];
});
