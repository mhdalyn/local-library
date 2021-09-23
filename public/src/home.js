const { partitionBooksByBorrowedStatus } = require("./books");

//provides a total for # of books in library
function getTotalBooksCount(books) {
  return books.length;
}

//provides a total for # of accts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//provides a total for number of books currently checked out
function getBooksBorrowedCount(books) {
  // const [borrowed] = partitionBooksByBorrowedStatus(books);
  const borrowed = books.filter((book) =>book.borrows[0].returned === false);
  return borrowed.length;
}

function getMostCommonGenres(books) {
  //formats books into genre objects
  let byGenres = books.reduce((acc, book) => {
    if (acc[book.genre] === undefined) {
      acc[book.genre] = {name: book.genre, count: 1}
    } else {
      acc[book.genre].count++;
    }
    return acc;
  }, {})
  let countedGenres = Object.values(byGenres);
  const sortedGenres = countedGenres.sort((genreA, genreB) => sortCompare(genreA, genreB))
  return sortedGenres.slice(0,5);
}

function getMostPopularBooks(books) {
  //sorts books based on borrow history length
 const sortedBooks = books.sort((bookA,bookB) => bookA.borrows.length < bookB.borrows.length ? 1 : -1)
  //reformats sorted array to match desired format
 let popularBooks = sortedBooks.map(book => {return {name: book.title, count: book.borrows.length}});
  //sortedBooks.forEach(book => {popularBooks.push({name: book.title,count:book.borrows.length})})
 return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  // authorPopularity = array of authorId from book with a sum of book.borrows.length for each book w/authorId
  let authorPopularity = authors.map((author) => {
    let booksByAuthor = books.filter((book) => book.authorId === author.id)
    let count = 0
    count = booksByAuthor.reduce((sum,book) => sum + book.borrows.length, count);
    return {name: (`${author.name.first} ${author.name.last}`), count: count};
  })
  // mostPopularAuthors = sort authors by popularity
  const mostPopularAuthors = authorPopularity.sort((author1,author2) => sortCompare(author1,author2))
  return mostPopularAuthors.slice(0,5);
}

let sortCompare = (object1,objectB) => object1.count < objectB.count ? 1 : -1;

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
