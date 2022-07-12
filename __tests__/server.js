
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Routes working', () => {
  describe('/api/getRandomMovie', () => {   
    it('returns an object with props title, genre and image', () => {
      return request(server)
        .get('/api/getRandomMovie')
        .expect(200)
        .then(res => {
          expect(res.body.title).toBeTruthy();
          expect(res.body.genre).toBeTruthy();
          expect(res.body.image).toBeTruthy();
        })
    })
  })

  describe('/api/getAllMovies', () => {
    it('should return an array of all movies', () => {
      return request(server)
        .get('/api/getAllMovies')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0].title).toBe('V for Vendetta')
          expect(res.body[0].genre).toBe('Action')
        })
    })
  })

  // describe('/api/updateElo', () => {
  //   it ('should update elo', () => {
  //     return request(server)
  //       .put('/api/updateElo')
  //       .send({elo: 2000, movieId: 10})
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.elo).toBe(2000)
  //       })
  //       .put('/api/updateElo')
  //       .send({elo: 1000, movieId: 10})
  //   })
  // })

  describe('/api/newUser', () => {
    it('should create a new user in the database', () => {
      return request(server)
        .post('/api/newUser')
        .send({username: 'coolguy1', password: '123'})
        .expect(200)
        .then(res => {
          expect(res.body.username).toBe('coolguy1')
        })
    })
  })

  describe('/api/verifyUser', () => {
    beforeAll(() => {
      request(server)
      .post('/api/newUser')
      .send({username: 'coolguy1', password: '123'})
    })

    it('should give us a cookie :)', () => {
      return request(server)
        .post('/api/verifyUser')
        .send({username: 'coolguy1', password: '123'})
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.headers['set-cookie'])).toBe(true);
          expect(res.headers['set-cookie'].length).toBe(1)
        })
    })
  })
})