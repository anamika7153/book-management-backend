const db = require('./database')

// console.log(db);

const express = require('express')
const app = express();
app.use(express.json())

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
    // isbn = Number(isbn)
    const getSpecificAuthor = await db.authors.filter((author) => author.books.includes(isbn)) 
    if(getSpecificAuthor.length ===0) {
        return res.json({"error": `No author found for ISBN of ${isbn}`});
    }
    console.log(getSpecificAuthor)
    return res.json(getSpecificAuthor)
})

//get all publications
// http://localhost:3000/publications
app.get("/publications", (req,res) => {
    const getAllPublications = db.publications
    return res.json(getAllPublications)
})

//get publications of isbn
// http://localhost:3000/publication-isbn/12345two
app.get("/publication-isbn/:isbn", async (req,res) => {
    let {isbn} = req.params;
    // isbn = Number(isbn)
    const getSpecificPublications = await db.publications.filter((publication) => publication.books.includes(isbn)) 
    if(getSpecificPublications.length ===0) {
        return res.json({"error": `No Publication found for ISBN of ${isbn}`});
    }
    console.log(getSpecificPublications)
    return res.json(getSpecificPublications)
})

//add a book
app.post("/book", (req,res) => {
    // const {newBook} = req.body;
    // db.books.push(newBook)
    db.books.push(req.body);
    return res.json(db.books);
})

//add an author
app.post("/author", (req,res) => {
    db.authors.push(req.body);
    return res.json(db.authors);
})

//add an publication
app.post("/publication", (req,res) => {
    db.publications.push(req.body);
    return res.json(db.publications);
})

//update a book
// http://localhost:3000/book-update/12345two
app.put("/book-update/:isbn", (req,res) => {
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            // console.log(...book, ...req.body)
            return {...book, ...req.body}
        }
        return book
    })
    return res.json(db.books);
})

//update a author
// http://localhost:3000/author-update/1
app.put("/author-update/:isbn", (req,res) => {
    const {id} = req.params;
    db.authors.forEach((author) => {
        if(author.id === id) {
            // console.log(...author, ...req.body)
            return {...author, ...req.body}
        }
        return author
    })
    return res.json(db.authors);
})

//update a publication
// http://localhost:3000/publication-update/1
app.put("/publication-update/:isbn", (req,res) => {
    const {id} = req.params;
    db.publications.forEach((publication) => {
        if(publication.id === id) {
            // console.log(...publication, ...req.body)
            return {...publication, ...req.body}
        }
        return publication
    })
    return res.json(db.publications);
})

app.listen(3000, ()=> {
    console.log(`Server is running at port ${3000}!`)
})