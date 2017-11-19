import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
	static propTypes = {
		updateBookshelf: PropTypes.func.isRequired,
		whichShelf: PropTypes.func.isRequired,
		appIsLoading: PropTypes.func.isRequired,
		appDidLoad: PropTypes.func.isRequired,
	}

	state = {
		query: '',
		results: [],
	}

	handleChange = event => {
		this.setState({ query: event.target.value })
		if (event.target.value.trim() !== '') {
			this.search(event.target.value.trim()) // Send our trimmed query to the server, if it’s not an empty string.
		} else {
			this.setState({
				results: [], // However, if our search string is empty on the client, don’t even bother sending it to the server.
			})
		}
	}

	search = query => {
		this.props.appIsLoading()
		// Fire off a search to our backend server
		BooksAPI.search(query, 20).then(results => {
			if (results instanceof Array) {
				// If valid results are returned, then we want to show it on our client
				this.setState({
					results,
				})
			} else {
				// If not, let’s go ahead and show nothing at all
				this.setState({
					results: [],
				})
			}
			this.props.appDidLoad()
		})
	}

	render() {
		const { updateBookshelf, whichShelf } = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						{/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={this.handleChange}
							autoFocus
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.results.map(book => (
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
	}
}

export default Search
