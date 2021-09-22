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
  //formats books into genres and rent counts per book
  //sort genres by frequency
  let countedGenres = [];
  countedGenres = books.map((book) => {
    console.log(book.genre);
    console.log(countedGenres[book.genre]);
    let genre = countedGenres[book.genre];
    console.log(genre);
    (genre) ? (genre.count++) : (genre = {
        name: book.genre,
         count: 1})
      console.log(genre);
      return genre;
      })
      
  const sortedGenres = countedGenres.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1)
  return sortedGenres.slice(0,5);
}

function getMostPopularBooks(books) {
  //sorts books based on borrow history length
 const sortedBooks = books.sort((bookA,bookB) => bookA.borrows.length < bookB.borrows.length ? 1 : -1)
  //reformats sorted array to match desired format
 let popularBooks = sortedBooks.map(book => {return {name: book.title, count: book.borrows.length}});
//  sortedBooks.forEach(book => {popularBooks.push({name: book.title,count:book.borrows.length})})
 return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  //
  //
  //reformat array to match desired format
  return mostPopularAuthors.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
