const app = require('../../src/app');

describe('\'votes\' service', () => {
  it('registered the service', () => {
    const service = app.service('votes');
    expect(service).toBeTruthy();
  });
});
