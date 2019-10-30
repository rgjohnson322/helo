import React, { Component } from 'react'
import { getSession, updateUser } from '../../Ducks/Reducers/UserReducer';
import { getAllPosts, getPostByTitle } from '../../Ducks/Reducers/PostReducer'
import { connect } from 'react-redux';
import "./Dashboard.css"
import Axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            profile_pic: "",
            searchTitle: ""
        }
    }


    componentDidMount() {
        this.props.getSession();
        this.props.getAllPosts()

    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    updateUser = () => {
        this.props.updateUser(this.state)
    }
    searchByTitle = () => {
        const { searchTitle } = this.state
        this.props.getPostByTitle(searchTitle)

    }

    render() {
        return (
            <div className="dashdiv">
                <h1>{this.props.match.params.username}</h1>

                <input name="profile_pic"
                    onChange={this.handleInput}></input>
                <button onClick={this.updateUser()}>edit</button>
                <input
                    placeholder="Search by Title"
                    name="searchTitle"
                    onChange={this.handleInput}
                    value={this.state.searchTitle} />
                <button onClick={this.searchByTitle}>Search</button>

                <div>
                    {this.props.posts ? this.props.posts.map((posts, i) => {
                        return <div className="Dashboard-Post" key={i}>
                            <h1>{posts.title}</h1>

                        </div>
                    }) : null}
                </div>
            </div >

        )
    }
}


const mapStateToProps = reduxState => {
    return {
        posts: reduxState.PostReducer.posts,
        user_id: reduxState.UserReducer.user_id,
        username: reduxState.UserReducer.username,
        profile_pic: reduxState.UserReducer.profile_pic

    }
}

export default connect(mapStateToProps, { getSession, updateUser, getAllPosts, getPostByTitle })(Dashboard)