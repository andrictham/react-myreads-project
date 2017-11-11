import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Search from './Search'

class BooksApp extends React.Component {
	state = {}

	render() {
		return (
			<div className="app">
				<Route exact path="/" component={Bookshelves} />
				<Route exact path="/search" component={Search} />
			</div>
		)
	}
}

export default BooksApp
