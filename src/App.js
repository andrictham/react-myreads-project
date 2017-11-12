import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Search from './Search'

class BooksApp extends React.Component {
	state = {
		books: [],
		loading: true,
	}

	updateBookshelf = (bookToUpdate, targetBookshelf) => {
		this.setState({
			loading: true,
		})
		BooksAPI.update(bookToUpdate, targetBookshelf).then(
			BooksAPI.getAll().then(books => {
				this.setState({
					books,
					loading: false,
				})
			}),
		)
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({
				books,
				loading: false,
			})
		})
	}

	render() {
		const { books } = this.state
		return (
			<div className="app">
				{this.state.loading && <span>Loading...</span>}
				<Route
					exact
					path="/"
					render={() => (
						<Bookshelves books={books} updateBookshelf={this.updateBookshelf} />
					)}
				/>
				<Route
					exact
					path="/search"
					render={() => <Search updateBookshelf={this.updateBookshelf} />}
				/>
			</div>
		)
	}
}

export default BooksApp
