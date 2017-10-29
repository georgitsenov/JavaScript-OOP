/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

var library = (function () {
	var books = [];
	var categories = [];

	function listBooks(option) {
		if (books.length == 1) {
			return new Array(books[0]);
		}

		if(!option) {
			return books.sort((a, b) => {
				return a.id - b.id;
			}).map((book) => {
				return book.title;
			});
		} else if (option.category) {
			return books.sort((a, b) => {
				return a.id - b.id;
			}).filter(item => {
				return item.category === option.category;
			});
		} else if (option.author) {
			return books.sort((a, b) => {
				return a.id - b.id;
			}).filter(item => {
				return item.author === option.author;
			}).map(item => {
				return item.title;
			}
			);
		}
	}

	function addBook(book) {
		let isbnLength = Number(book.isbn).toString().length;

		// Check if book title is < 2 and > 100
		if (book.title.length < 2 || book.title.length > 100) {
			throw "Error";
		}

		// Check if book with the same ISBN existst
		if (books.some(bookItem => {
			if (book.isbn === bookItem.isbn) {
				return true;
			}
		})) {
			throw "Error";
		}

		// Check if the ISBN is 10 or 13 digits
		if (!(isbnLength === 10) && !(isbnLength === 13)) {
			throw "Error";
		}

		// Check if the author is non-empty string
		if (!book.author) {
			throw "Error";
		}

		// Check if the title already exists in the "books" array
		if (books.some(bookItem => {
			if (book.title === bookItem.title) {
				return true;
			}
		})) {
			throw "Error";
		}

		// Set the ID of the book
		book.ID = books.length + 1;

		// Set the book category to "undefined" or the specified value
		if(book.category) {
			category = {
				id: categories.length + 1,
				name: book.category
			};
		} else {
			book.category = "undefined";
			category = {
				id: categories.length + 1,
				name: "undefined"
			}
		}

		// if the book's category doesnot exist in the "categories" array - add it
		if (!categories.some((catName) => {
				return book.category === catName.name})) {
			categories.push(category);
		}

		// add the book to the "books" array
		books.push(book);

		// return the added book
		return book;
	}

	function listCategories() {
		return categories.sort((a, b) => {
				return a.id - b.id;
			}).map((category) => {
				return category.name;
			})
	}

	return {
		books: {
			list: listBooks,
			add: addBook
		},
		categories: {
			list: listCategories
		}
	};
} ());

library.books.add({
	title: "dranieto zapochva",
	author: "georgi tsenov",
	category: "conspiracy",
	isbn: 1234567891234
});

console.log(library.books.list());
