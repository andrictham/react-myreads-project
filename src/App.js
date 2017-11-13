import React from 'react'
import { Route } from 'react-router-dom'
import includes from 'lodash/includes'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Search from './Search'

class BooksApp extends React.Component {
	state = {
		books: [],
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: [],
		},
		loading: true,
	}

	fetchBooks = () => {
		const { assignBooksToShelf } = this
		BooksAPI.getAll().then(books => {
			this.setState({
				loading: false,
				books,
				shelves: {
					currentlyReading: assignBooksToShelf(books, 'currentlyReading'),
					wantToRead: assignBooksToShelf(books, 'wantToRead'),
					read: assignBooksToShelf(books, 'read'),
				},
			})
		})
	}

	assignBooksToShelf = (books, shelf) => {
		// This function lets us track which books belong in which shelves. That way, we don’t have to keep polling the server for state changes to a book’s “shelf” prop, and updates will reflect much faster to the user.

		return books.filter(book => book.shelf === shelf).map(book => book.id)
	}

	whichShelf = bookID => {
		// This function checks our `shelf` state and sees if that book currently resides in one of these shelves, then returns the name of that shelf as a string. This lets us dynamically track our bookshelf state from the frontend without relying on the results of a second API call to `getAll()`.

		const isCurrentlyReading = includes(
			this.state.shelves.currentlyReading,
			bookID,
		)
		const isWantToRead = includes(this.state.shelves.wantToRead, bookID)
		const isRead = includes(this.state.shelves.read, bookID)

		if (isCurrentlyReading) {
			return 'currentlyReading'
		}
		if (isWantToRead) {
			return 'wantToRead'
		}
		if (isRead) {
			return 'read'
		} else {
			return 'none'
		}
	}

	componentDidMount() {
		this.fetchBooks()
	}

	updateBookshelf = (bookToUpdate, targetBookshelf) => {
		this.setState({
			loading: true,
		})
		BooksAPI.update(bookToUpdate, targetBookshelf).then(response => {
			this.setState(state => ({
				loading: false,
				shelves: {
					...response,
				},
			}))
		})
		this.fetchBooks()
	}

	render() {
		const { books, shelves } = this.state
		return (
			<div className="app">
				{this.state.loading && <span>Loading...</span>}
				<Route
					exact
					path="/"
					render={() => (
						<Bookshelves
							books={books}
							{...shelves}
							updateBookshelf={this.updateBookshelf}
							whichShelf={this.whichShelf}
						/>
					)}
				/>
				<Route
					exact
					path="/search"
					render={() => (
						<Search
							updateBookshelf={this.updateBookshelf}
							whichShelf={this.whichShelf}
						/>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
