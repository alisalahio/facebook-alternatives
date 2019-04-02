const app = require('../../src/app');

describe('\'groups\' service', () => {
  it('registered the service', () => {
    const service = app.service('groups');
    expect(service).toBeTruthy();
  });
});
