
const bcrypt = require('bcrypt');
const userSchema = require('../database/model');


async function register(details) {
  let hashpassword;
  let newuser;
  let user;
  try {
    hashpassword = await bcrypt.hash(details.password, 10);
  } catch (e) {
    throw new Error(e);
  }
  try {
    newuser = await new userSchema.User({ name: details.name, email: details.email, password: hashpassword ,isSeller:details.isSeller});
  } catch (e) {
    throw new Error(e);
  }
  try {
    user = await newuser.save(newuser);
  } catch (e) {
    throw new Error(e);
  }
  return user;
}

async function userLogin(details) {
  const user = await userSchema.User.find({ email: details.email });
  const match = await bcrypt.compare(details.password, user[0].password);
  return match;
}


async function getBooks() {
  const books = await userSchema.Books.find()
  return books;
}

async function buyBook(id,email) {
  let cartBooks;
  let purchasebook;
  const book = await userSchema.Books.findById({"_id":id},(err,doc)=>{
    if(err){
      console.log("Something wrong when updating data!");
  }
  if(doc.units>0){
  doc.units=doc.units-1;
  doc.save(); 
  }
  })
 
  try {
    if(book.units>0){
      cartBooks = await new userSchema.Purchase({ bookId: book._id, email: email});  
}
  } catch (e) {
    throw new Error(e);
  }
  
  try {
    purchasebook = await cartBooks.save(cartBooks);
  } catch (e) {
    throw new Error(e);
  }
  console.log(purchasebook)
  return purchasebook;
}


async function addBook(book) {
  let addbook;
  let newbook;
  try {
    addbook = await userSchema.Books(book);
  } catch (e) {
    throw new Error(e);
  }
  try {
    newbook = await addbook.save(addbook);
  } catch (e) {
    throw new Error(e);
  }
  return addbook;
}

module.exports = {
  register,
  userLogin,
  getBooks,
  buyBook,
  addBook
};
