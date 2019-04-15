import request from 'supertest';

import app from '../index';
import phoneNumberModule from '../utils/phoneModules';

describe('PhoneBook Controller', () => {
  beforeEach((done) => {
    phoneNumberModule.cleanFile();
    done();
  });

  it('should generate phone numbers at random without sort and limit params', (done) => {
    request(app)
      .get('/api/v1/phone-numbers')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Successfully fetches phone numbers');
        expect(res.body.data.phoneNumbers).toHaveLength(10);
        done();
      });
  });

  it('should generate phone numbers at random with sort and limit params', (done) => {
    request(app)
      .get('/api/v1/phone-numbers?sort=ASC&limit=100')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Successfully fetches phone numbers');
        expect(res.body.data.phoneNumbers).toHaveLength(100);
        done();
      });
  });

  it('should sort the phone numbers in DESC order', (done) => {
    request(app)
      .get('/api/v1/phone-numbers?sort=DESC&limit=100')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Successfully fetches phone numbers');
        expect(res.body.data.phoneNumbers).toHaveLength(100);
        done();
      });
  });

  it('should persist phone numbers in the csv file', (done) => {
    request(app)
      .post('/api/v1/phone-numbers-list')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Successfully saved phone numbers into the file');
        expect(res.body.data.phoneNumbers).toHaveLength(0);
        done();
      });
  });

  it('should clear all phone numbers in the csv file', (done) => {
    request(app)
      .delete('/api/v1/clear-phone-numbers')
      .expect(202)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(202);
        expect(res.body).toHaveProperty('message', 'Successfully deleted phone numbers');
        done();
      });
  });
});
