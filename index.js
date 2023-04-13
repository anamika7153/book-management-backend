const db = require('./database')

// console.log(db);

const express = require('express')
const app = express();

app.get("/", (req,res) => {
    // return res.json({"Welcome": `to my Book Company Backend`});
    return res.json("Welcome");

})

app.get("/books", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
})

//get specific book
// http://localhost:3000/book/12345two
app.get("/book/:isbn", (req,res) => {
    const {isbn} = req.params;
    const getBook = db.books.filter((book) => book.ISBN === isbn) 
    if( getBook.length === 0){
    return res.json({"error": `No book found for ISBN of ${isbn}`});
    }
    return res.json(getBook[0])
})

//get category of book
// http://localhost:3000/book-category/c++
// http://localhost:3000/book-category/fiction
// http://localhost:3000/book-category/programming
// http://localhost:3000/book-category/web-dev
app.get("/book-category/:category", (req,res) => {
    const {category} = req.params;
    const getBooks = db.books.filter((book) => book.category.includes(category)) 
    if( getBooks.length === 0){
    return res.json({"error": `No book found for category of ${category}`});
    }
    return res.json(getBooks)
})

//get all authors
// http://localhost:3000/authors
app.get("/authors", (req,res) => {
    const getAllAuthors = db.authors
    return res.json(getAllAuthors)
})

//get specific author
// http://localhost:3000/author/1
app.get("/author/:id", (req,res) => {
    let {id} = req.params;
    id = Number(id)
    const getAuthor = db.authors.filter((author) => author.id === id) 
    if( getAuthor.length === 0){
    return res.json({"error": `No author found for ISBN of ${id}`});
    }
    return res.json(getAuthor[0])
})

//get authors of isbn
// http://localhost:3000/author-isbn/12345two
app.get("/author-isbn/:isbn", async (req,res) => {
    let {isbn} = req.params;
    console.log(isbn)
    // isbn = Number(isbn)
    const getSpecificAuthor = await db.authors.filter((author) => author.books.includes(isbn)) 
    if(getSpecificAuthor.length ===0) {
        return res.json({"error": `No author found for ISBN of ${isbn}`});
    }
    console.log(getSpecificAuthor)
    // if( getAuthors.length === 0){
    // return res.json({"error": `No author found for ISBN of ${isbn}`});
    // }
    return res.json(getSpecificAuthor)
})

//get all publications
// http://localhost:3000/publications
app.get("/publications", (req,res) => {
    const getAllPublications = db.publications
    return res.json(getAllPublications)
})

app.listen(3000, ()=> {
    console.log("Server is running!")
})