function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  const borrowedBook = books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.returned === false){
        count++
      }
    })
  });
  return count;
}

function getMostCommonGenres(books) {
  let mostCommonGenres = {};
  const commonGenres = books.forEach((book) => {
    const genres = book.genre;
    if (mostCommonGenres[genres] == null) {
      mostCommonGenres[genres] = 1;
    } else {
      mostCommonGenres[genres] +=1;
    }
  });
  let countArray = [];
  for (const [key, value] of Object.entries(mostCommonGenres)){
    countArray.push({
      'name' : key,
      'count' : value
    });
  }
    countArray.sort((a, b) => b.count - a.count)
  return countArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    return {name: book.title, count: book.borrows.length}  
 }).sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.reduce((result, author) => {
    var {
      name: { first, last },
       id,
     } = author;
 result[id] = { name: `${first} ${last}`, count: 0 };
 books.forEach((book) => {
  if (book.authorId === id) 
  result[id].count += book.borrows.length; 
});
return result;
}, {});
const values = Object.values(popularAuthors); 
  return values.sort((a, b) => b.count - a.count).slice(0, 5);
}

function sortByPopularity(item1, item2){
  return item2.count - item1.count
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
