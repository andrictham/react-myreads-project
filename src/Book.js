import React, { Component } from 'react'

class Book extends Component {
	state = {
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
							<option value="none" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none" disabled>
								None
							</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">{authors}</div>
			</div>
		)
	}
}

export default Book
