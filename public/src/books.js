//searches library for an author by ID
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//searches library for a specific book by ID
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//creates two arrays to hold books that are either borrowed or returned
function partitionBooksByBorrowedStatus(books) {
  const borrowedStatus = [
    borrowedBooks = books.filter((book) =>book.borrows[0].returned === false),
    returnedBooks = books.filter((book) =>book.borrows[0].returned === true)
  ];
  return borrowedStatus;
}

//creates a list of accounts that have borrowed a book
function getBorrowersForBook(book, accounts) {
  let borrowersList = book.borrows.map(borrower => {
    let account = accounts.find((account) => account.id === borrower.id);
    return {...borrower, ...account}});
  return borrowersList.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
