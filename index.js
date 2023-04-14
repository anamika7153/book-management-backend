require('dotenv').config()

const db = require('./database')
const mongoose = require('mongoose')
const express = require('express')
const BookModel = require('./database/book')
const AuthorModel = require('./database/author')
const PublicationModel = require('./database/publication')

const app = express();
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000
mongoose.connect(MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("MongoDB Connected!"))

app.get("/", (req,res) => {
    // return res.json({"Welcome": `to my Book Company Backend`});
    return res.json({"Welcome": `to my Book Company Backend`});

})

/*
Route               /books
Description         Get all Books
Access              PUBLIC
Parameter           NONE
Methods             GET
*/
// http://localhost:3000/books

app.get("/books", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

/*
Route               /book-isbn
Description         Get all Books based on ISBN
Access              PUBLIC
Parameter           isbn
Methods             GET
*/
// http://localhost:3000/book-isbn/12345two

app.get("/book-isbn/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const getBook = await BookModel.find({isbn: isbn}) 
    if( getBook.length === 0){
    return res.json({"error": `No book found for ISBN of ${isbn}`});
    }
    return res.json(getBook[0])
})

/*
Route               /book-category
Description         Get all Books based on category
Access              PUBLIC
Parameter           category
Methods             GET
*/
//get category of book
// http://localhost:3000/book-category/c++
// http://localhost:3000/book-category/fiction
// http://localhost:3000/book-category/programming
// http://localhost:3000/book-category/web-dev
app.get("/book-category/:category", async (req,res) => {
    const {category} = req.params;
    const getBooks = await BookModel.find({category: category}) 
    if( getBooks.length === 0){
    return res.json({"error": `No book found for category of ${category}`});
    }
    return res.json(getBooks)
})

/*
Route               /authors
Description         Get all Authors
Access              PUBLIC
Parameter           NONE
Methods             GET
*/
// http://localhost:3000/authors

app.get("/authors", async (req,res) => {
    const getAllAuthors = await AuthorModel.find()
    return res.json(getAllAuthors)
})

/*
Route               /publications
Description         Get all Publications
Access              PUBLIC
Parameter           NONE
Methods             GET
*/
// http://localhost:3000/publications

app.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find()
    return res.json(getAllPublications)
})


/*
Route               /author-id
Description         Get author based on id
Access              PUBLIC
Parameter           id
Methods             GET
*/
// http://localhost:3000/author-id/1

app.get("/author-id/:id", async (req,res) => {
    let {id} = req.params;
    // id = Number(id)
    const getSpecificAuthor = await AuthorModel.findOne({id: id});
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
})


/*
Route               /author-isbn
Description         Get author based on isbn
Access              PUBLIC
Parameter           isbn
Methods             GET
*/
// http://localhost:3000/author-isbn/12345two

app.get("/author-isbn/:isbn", async (req,res) => {
    let {isbn} = req.params;
    // const getSpecificAuthor = await db.authors.filter((author) => author.books.includes(isbn)) 
    const getSpecificAuthors = await AuthorModel.find({books:isbn});
    if(getSpecificAuthors.length ===0) {
        return res.json({"error": `No author found for ISBN of ${isbn}`});
    }
    return res.json(getSpecificAuthors)
})


/*
Route               /publication-id
Description         Get publication based on isbn
Access              PUBLIC
Parameter           isbn
Methods             GET
*/
// http://localhost:3000/publication-isbn/12345two
app.get("/publication-isbn/:isbn", async (req,res) => {
    let {isbn} = req.params;
    // isbn = Number(isbn)
    // const getSpecificPublications = await db.publications.filter((publication) => publication.books.includes(isbn)) 
    const getSpecificPublications = await PublicationModel.find({books:isbn});
    if(getSpecificPublications.length ===0) {
        return res.json({"error": `No Publication found for ISBN of ${isbn}`});
    }
    console.log(getSpecificPublications)
    return res.json(getSpecificPublications)
})

/*
Route               /book
Description         Post a book
Access              PUBLIC
Parameter           NONE
Methods             POST
*/
app.post("/book", async (req,res) => {
    // const {newBook} = req.body;
    // db.books.push(newBook)
    // db.books.push(req.body);
    const addNewBook = await BookModel.create(req.body)
    return res.json({bookAdded: addNewBook, message: "Book added!"});
})


/*
Route               /author
Description         Post an author
Access              PUBLIC
Parameter           NONE
Methods             POST
*/
// http://localhost:3000/author

app.post("/author", async (req,res) => {
    // db.authors.push(req.body);
    const addNewAuthor = await AuthorModel.create(req.body)
    return res.json({authorAdded: addNewAuthor, message: "Author added!"});
})

/*
Route               /publication
Description         Post a publication
Access              PUBLIC
Parameter           author
Methods             POST
*/
app.post("/publication", async (req,res) => {
    const addNewPublication = await PublicationModel.create(req.body)
    return res.json({publicationAdded: addNewPublication, message: "Publication added!"});
})


/*
Route               /book-update
Description         Update book based on isbn
Access              PUBLIC
Parameter           isbn
Methods             PUT
*/
// http://localhost:3000/book-update/12345two

app.put("/book-update/:isbn", async (req,res) => {
    const {isbn} = req.params;
    // db.books.forEach((book) => {
    //     if(book.ISBN === isbn) {
    //         // console.log(...book, ...req.body)
    //         return {...book, ...req.body}
    //     }
    //     return book
    // })
    // return res.json(db.books);
    try {
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new:true})
        return res.json({bookUpdated: updateBook, message: "Book updated!"});
        
    } catch (error) {
        console.log(error)
    }

})


/*
Route               /author-update
Description         Update author based on id
Access              PUBLIC
Parameter           id
Methods             PUT
*/
// http://localhost:3000/author-update/1

app.put("/author-update/:id", async (req,res) => {
    const {id} = req.params;
    // db.authors.forEach((author) => {
    //     if(author.id === id) {
    //         // console.log(...author, ...req.body)
    //         return {...author, ...req.body}
    //     }
    //     return author
    // })
    // return res.json(db.authors);
    try {
        const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, req.body, {new:true})
        return res.json({authorUpdated: updateAuthor, message: "Author updated!"});
        
    } catch (error) {
        console.log(error)
    }
})


/*
Route               /publication-update
Description         Update publication based on id
Access              PUBLIC
Parameter           id
Methods             PUT
*/
// http://localhost:3000/publication-update/1

app.put("/publication-update/:id", async (req,res) => {
    const {id} = req.params;
    // db.publications.forEach((publication) => {
    //     if(publication.id === id) {
    //         // console.log(...publication, ...req.body)
    //         return {...publication, ...req.body}
    //     }
    //     return publication
    // })
    // return res.json(db.publications);
    try {
        const updatePublication = await PublicationModel.findOneAndUpdate({id: id}, req.body, {new:true})
        return res.json({publicationUpdated: updatePublication, message: "Publication updated!"});
    } catch (error) {
        console.log(error)
    }
})


/*
Route               /book-delete
Description         Delete book based on isbn
Access              PUBLIC
Parameter           isbn
Methods             DELETE
*/
// http://localhost:3000/book-delete/12345one

app.delete("/book-delete/:isbn", async (req,res) => {
    const {isbn} = req.params;
    // const filteredBooks = db.books.filter((book) => {
    //     return book.ISBN !== isbn
    // })
    // db.books = filteredBooks
    // return res.json(db.books);
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json( {bookDeleted: deleteBook, message: "Book was Deleted !!!"} );
})


/*
Route               /book-author-delete
Description         Delete author from book based on isbn
Access              PUBLIC
Parameter           isbn,id
Methods             DELETE
*/
// http://localhost:3000/book-author-delete/12345one/1

app.delete("/book-author-delete/:isbn/:id", async (req,res) => {
    let {isbn,id} = req.params;
    // id = Number(id)
    // db.books.forEach((book) => {
    //     if(book.ISBN === isbn) {
    //         if(!book.authors.includes(id)) {
    //             return;
    //         }
    //         book.authors = book.authors.filter((author) => author!==id)
    //         return book;
    //     }
    //     return book;
    // })
    // return res.json(db.books);
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else {
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
        return res.json( {bookUpdated: updateBook, message: "Author was Deleted from the Book !!!"} );
    }
})


/*
Route               /author-book-delete
Description         Delete book from author based on id
Access              PUBLIC
Parameter           id,isbn
Methods             DELETE
*/
// http://localhost:3000/author-book-delete/1/12345one

app.delete("/author-book-delete/:id/:isbn", async (req,res) => {
    let {id,isbn} = req.params;
    // id = Number(id)
    // db.authors.forEach((author) => {
    //     if(author.id == id) {
    //         if(!author.books.includes(isbn)) {
    //             return;
    //         }
    //         author.books = author.books.filter((author) => author!==isbn)
    //         return author;
    //     }
    //     return author;
    // })
    // return res.json(db.authors);
    let getSpecificAuthor = await AuthorModel.findOne({id: id});
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    else {
        getSpecificAuthor.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, getSpecificAuthor, {new: true});
        return res.json( {authorUpdated: updateAuthor, message: "Author was Deleted from the Author !!!"} );
    }
})


/*
Route               /publication-delete
Description         Delete publication based on id
Access              PUBLIC
Parameter           id
Methods             DELETE
*/
// http://localhost:3000/publication-delete/1

app.delete("/publication-delete/:id", async (req,res) => {
    const {id} = req.params;
    // db.publications.forEach((publication) => {
    //     if(publication.id === id) {
    //         // console.log(...publication, ...req.body)
    //         return {...publication, ...req.body}
    //     }
    //     return publication
    // })
    // return res.json(db.publications);
    const deletePublication = await PublicationModel.deleteOne({id: id});
    return res.json( {publicationDeleted: deletePublication, message: "Publication was Deleted !!!"} );
})

app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}!`)
})