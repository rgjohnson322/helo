
import React, {Component} from 'react'

export default class Post extends Component {
    render() {
        return (
            <div style={{marginLeft: '50vw'}}>
                <h1>{this.props.match.params.id}</h1>
                <h1>post</h1>
            </div>
        )
    }
}