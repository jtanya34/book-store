
/* eslint-disable no-undef */
const chai = require('chai');
const http = require('chai-http');
const app = require('../app.js');



const data = {
    title: 'bookTest',
    price: 123,
    units: 5,
    description: 'test a book route',
  };
  
const signupCredentials = {
user:{
  name: 'test11',
  email: 'test11@gmail.com',
  password: 'test11',
  isSeller:true
}
};
const loginCredentials = {

  email: 'rahul@moodcafe.in',
  password: 'test',
};

xdescribe('/signup', () => {
    it('Should Check response', (done) => {
      const agent = chai.use(http).request.agent(app);
      agent
        .post('/auth/signup')
        .send(signupCredentials)
        .end((err, response) => {
          if (err) return done(err);
          chai.expect(response.success).to.not.equal(true);
          done();
          agent.close();
          return 0;
        });
    });
  });

xdescribe('/login', () => {
  it('Should Check response', (done) => {
    const agent = chai.use(http).request.agent(app);
    agent
      .post('/auth/login')
      .send(loginCredentials)
      .end((err, response) => {
        if (err) return done(err);
        chai.expect(response.success).to.not.equal(true);
        done();
        agent.close();
        return 0;
      });
  });
});

xdescribe('test the book route', () => {
    it('GET books', (done) => {
      const agent = chai.use(http).request.agent(app);
      agent
        .get('/auth/books')
        .end((err, response) => {
          if (err) return done(err);
          chai.expect(response.body[1].title).to.equal('Sample book 1');
          done();
          agent.close();
          return 0;
        });
    });
  });
  
  
xdescribe('test the add book ', () => {
    it('add books', (done) => {
      const agent = chai.use(http).request.agent(app);
      agent
        .post('/auth/addBook')
        .send(data)
        .end((err, response) => {
          if (err) return done(err);
          chai.expect(response.body.title).to.equal('bookTest');
          done();
          agent.close();
          return 0;
        });
    });
  });
  
  describe('test the purchase route ', () => {
    it('purchase  books', (done) => {
      const agent = chai.use(http).request.agent(app);
      const id='5cef07de90457124c46efbcd';
      const email='rahul@moodcafe.in'
      agent
        .get(`/auth/buybook/${id}/${email}`)
        .end((err, response) => {
          if (err) return done(err);
          chai.expect(response.body.title).to.equal('bookTest');
          done();
          agent.close();
          return 0;
        });
    });
  });
  