import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Search from './Search'

class BooksApp extends React.Component {
	state = {
		books: [],
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			console.log(books)
			this.setState({
				books,
			})
		})
	}

	render() {
		const { books } = this.state
		return (
			<div className="app">
				<Route exact path="/" render={() => <Bookshelves books={books} />} />
				<Route exact path="/search" component={Search} />
			</div>
		)
	}
}

export default BooksApp
