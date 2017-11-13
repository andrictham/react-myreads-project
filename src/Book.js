import React, { Component } from 'react'

class Book extends Component {
	state = {
		// It’s not generally a good practice to read state from props, but in this case we’re using a controlled component, and we don’t want to bother our parent components with the inner workings of our <select>.
		selectedShelf: this.props.shelf,
	}

	handleChange = event => {
		this.setState({
			selectedShelf: event.target.value,
		})
		this.props.onUpdate(this.props.book, event.target.value)
	}

	render() {
		const { title, authors, thumbnail } = this.props
		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${thumbnail})`,
						}}
					/>
					<div className="book-shelf-changer">
						<select
							value={this.state.selectedShelf}
							onChange={this.handleChange}
						>
							<option value="" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">
					{// `authors` are returned from the API as an array, so we want to make sure they’re displayed nicely on our client
					authors instanceof Array ? authors.join('; ') : ''}
				</div>
			</div>
		)
	}
}

export default Book
