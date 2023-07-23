function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  let numOfBooksBorrowed = 0;
  for (let status in books) {
    const book = books[status];
    let result = book.borrows.filter((borrow) => borrow.id === account.id);
    numOfBooksBorrowed += result.length;
  }
  return numOfBooksBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessedByAccount = [];
  booksPossessedByAccount = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned);
  }).map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const newBook = { ...book, author,};
    return newBook;
  })
  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
