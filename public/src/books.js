function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const status = [];
  const borrowedYes = books.filter((book) => book.borrows.every((transaction) => transaction.returned));
  const borrowedNo = books.filter((book) => book.borrows.some((transaction) => !transaction.returned));
  status.push(borrowedNo);
  status.push(borrowedYes);
  
  return status;
}

function getBorrowersForBook(book, accounts) {
  const result = book.borrows.map((transaction) => {
    const accountInfo = accounts.find((account) => transaction.id === account.id);
    const newTransaction = {...transaction, ...accountInfo,};
    return newTransaction;
  });
  result.splice(10);
  return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
