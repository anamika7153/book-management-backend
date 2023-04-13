let books = [ 
    {
        ISBN: "12345one",
        title: "Getting started with MERN",
        authors: [1,2],
        language: "en",
        pubDate: "2021-08-07",
        numOfPages: 285,
        category: ["fiction", "programming", "web-dev"],
        publication: 1,
    }, {
        ISBN: "12345two",
        title: "Getting Started with C++",
        authors: [1,2],
        language: "en",
        pubDate: "2021-02-07",
        numOfPages: 215,
        category: ["fiction", "c++", "programming", ],
        publication: 1,
    }, 
    {
        ISBN: "12345three",
        title: "Getting started with Java",
        authors: [2],
        language: "en" ,
        pubDate: "2021-01-07",
        numOfPages: 150,
        category: ["fiction", "java", "programming", ],
        publication: 1,
    } 
]

let authors = [
    {
        id: 1,
        name: "Ashwani Ranjan",
        books: ["12345one", "12345two"]    
    },
    {
        id: 2,
        name: "Rini Srivastava",
        books: ["12345one", "12345two"]    
    },
    {
        id: 1,
        name: "Anamika Yadav",
        books: []    
    }
    
]

let publications = [
    {
        id: 1,
        name : "Ranjan Publications",
        books: ["12345one", "12345two"],
    },
    {
        id: 2,
        name : "Rini Publications",
        books: [],
    }
]

module.exports = {books, authors, publications}