import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthorWrapper, AuthorBox, AuthorInfo, Button } from './style';


class Author extends PureComponent {
	render() {
		return (
			<AuthorWrapper>
				<AuthorBox>
						<p>Author_id: 001</p>
						<p>Author_name: Adam</p>
						<p>Cata: Science, Computer, Engineering</p>
						<Button onClick={() => this.props.follow(this.author_id, this.author_name)}>Follow</Button>
				</AuthorBox>
			</AuthorWrapper>
		)
	}
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Author);
