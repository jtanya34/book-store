/* eslint-disable no-undef */
const chai = require('chai');
const user = require('../src/authenticationController');


const signupCredentials = {
  name: 'test',
  email: 'test@gmal.com',
  password: 'a',
  isSeller:false
};

const book = {
    title: 'bookTest',
    price: 123,
    units: 5,
    description: 'test a book route',
  };

xdescribe('test usersave data', () => {
  it('Should return user saved Data', async () => {
    // eslint-disable-next-line max-len
    const data = await user.register(signupCredentials);
    chai.expect(data.name).to.deep.equal(signupCredentials.name);
  });
});

xdescribe('test loginuser data', () => {
  it('Should return user saved Data', async () => {
    const data = await user.userLogin(signupCredentials);
    chai.expect(data).to.deep.equal(true);
  });
});

xdescribe('test get book ', () => {
    it('Should return all books', async () => {
      const data = await user.getBooks()
      chai.expect(data[1].title).to.deep.equal('Sample book 1');
    });
  });
  
  xdescribe('test puchase book ', () => {
    it('Should return purchase book', async () => {
        const id='5cded862064ea22c78b3516e';
      const email='rahul@moodcafe.in'
      const data = await user.buyBook(id,email)
      console.log(data)
      chai.expect(data.title).to.deep.equal('Sample book 2');
    });
  });
  

describe('test add book ', () => {
    it('Should return new book', async () => {
      const data = await user.addBook(book);
      console.log(data)
      chai.expect(data.title).to.deep.equal('bookTest');
    });
  });
  