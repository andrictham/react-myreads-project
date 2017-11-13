import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import includes from 'lodash/includes'
import Book from './Book'

// TODO: Refactor each bookshelf to a reusable component.

class Bookshelves extends Component {
	render() {
		const {
			books,
			updateBookshelf,
			whichShelf,
			currentlyReading,
			wantToRead,
			read,
		} = this.props
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Currently Reading</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books
										.filter(book => {
											return includes(currentlyReading, book.id)
										})
										.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													title={book.title}
													authors={book.authors}
													thumbnail={
														book.imageLinks ? book.imageLinks.thumbnail : ''
													}
													shelf={whichShelf(book.id)}
													onUpdate={updateBookshelf}
												/>
											</li>
										))}
								</ol>
							</div>
						</div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Want to Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books
										.filter(book => {
											return includes(wantToRead, book.id)
										})
										.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													title={book.title}
													authors={book.authors}
													thumbnail={
														book.imageLinks ? book.imageLinks.thumbnail : ''
													}
													shelf={whichShelf(book.id)}
													onUpdate={updateBookshelf}
												/>
											</li>
										))}
								</ol>
							</div>
						</div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books
										.filter(book => {
											return includes(read, book.id)
										})
										.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													title={book.title}
													authors={book.authors}
													thumbnail={
														book.imageLinks ? book.imageLinks.thumbnail : ''
													}
													shelf={whichShelf(book.id)}
													onUpdate={updateBookshelf}
												/>
											</li>
										))}
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

export default Bookshelves
