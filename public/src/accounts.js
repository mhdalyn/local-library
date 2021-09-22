//searches for a specific account ID in accounts
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

//sorts accounts alphabetically by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

//returns a total for number of times account has borrowed books
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => book.borrows.forEach((borrow) => {
      if(borrow.id === account.id) total++
     }
    )
  )
  return total;
}

//returns an array of all books checked out by an account & includes author
function getBooksPossessedByAccount(account, books, authors) {
  let userID = account.id
  let accountInventory = books.filter(book => (book.borrows[0].id === userID && book.borrows[0].returned === false));
  let booksPossessed = accountInventory.map((book) => {
    let {name, ...author} = authors.find((author) => author.id === book.authorId);
    return {...book,borrows: book.borrows, author: {name, ...author}
    };})
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
