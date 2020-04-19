import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthorWrapper, AuthorBox, AuthorInfo, Button } from './style';


class Author2 extends PureComponent {
	render() {
		return (
			<AuthorWrapper>
				<AuthorBox>
						<p>Author_id: 002</p>
						<p>Author_name: Alex</p>
						<p>Cata: Science, Computer, Engineering</p>
            <p>Followers: </p>
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

export default connect(mapState, mapDispatch)(Author2);
