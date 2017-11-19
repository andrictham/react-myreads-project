import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import includes from 'lodash/includes'
import startCase from 'lodash/startCase'
import Book from './Book'

class Bookshelves extends Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf name="currentlyReading" {...this.props} />
						<Bookshelf name="wantToRead" {...this.props} />
						<Bookshelf name="read" {...this.props} />
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

const Bookshelf = ({
	name,
	books,
	updateBookshelf,
	whichShelf,
	currentlyReading,
	wantToRead,
	read,
}) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">
			{// Convert name of bookshelf to Title case (wantToRead -> Want To Read)
			startCase(name)}
		</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{books
					.filter(book => {
						// We want to filter books by whether they belong in the bookshelf
						return includes(eval(name), book.id)
						// `eval()` evaluates the name of bookshelf as an expression, so it gets treated like a reference to a variable. This lets us access the currentlyReading, wantToRead, and read props that are passed in.
					})
					.map(book => (
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

export default Bookshelves
