import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import includes from 'lodash/includes'
import Book from './Book'

class Bookshelves extends Component {
	static propTypes = {
		books: PropTypes.array,
		updateBookshelf: PropTypes.func.isRequired,
		whichShelf: PropTypes.func.isRequired,
		currentlyReading: PropTypes.array,
		wantToRead: PropTypes.array,
		read: PropTypes.array,
	}

	filterBooksByShelf = (books, shelf) => {
		return books.filter(book => {
			// We want to filter our entire books array by whether they belong in the bookshelf array that is passed in.
			return includes(shelf, book.id)
		})
	}

	render() {
		const {
			books,
			updateBookshelf,
			whichShelf,
			currentlyReading,
			wantToRead,
			read,
		} = this.props

		let booksInShelves = {
			currentlyReading: this.filterBooksByShelf(books, currentlyReading),
			wantToRead: this.filterBooksByShelf(books, wantToRead),
			read: this.filterBooksByShelf(books, read),
		}

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf
							name="Currently Reading"
							books={booksInShelves.currentlyReading}
							whichShelf={whichShelf}
							updateBookshelf={updateBookshelf}
						/>
						<Bookshelf
							name="Want to Read"
							books={booksInShelves.wantToRead}
							whichShelf={whichShelf}
							updateBookshelf={updateBookshelf}
						/>
						<Bookshelf
							name="Read"
							books={booksInShelves.read}
							whichShelf={whichShelf}
							updateBookshelf={updateBookshelf}
						/>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

const Bookshelf = ({ name, books, updateBookshelf, whichShelf }) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{name}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{books.map(book => (
					<li key={book.id}>
						<Book
							book={book}
							title={book.title}
							authors={book.authors}
							thumbnail={book.imageLinks ? book.imageLinks.thumbnail : ''}
							shelf={whichShelf(book.id)}
							onUpdate={updateBookshelf}
						/>
					</li>
				))}
			</ol>
		</div>
	</div>
)

Bookshelf.propTypes = {
	name: PropTypes.string.isRequired,
	books: PropTypes.array,
	updateBookshelf: PropTypes.func.isRequired,
	whichShelf: PropTypes.func.isRequired,
}

export default Bookshelves
