import React, { Component } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

export default class Page extends Component {
    render() {
        const {postsPerPage, totalPosts, nextPage, prevPage} = this.props
        return (
        <nav>
        <Pagination
        size="lg" 
        style={{display:"flex", justifyContent:"center"}}>
            <Pagination.Prev
            href="#"
            onClick={() => prevPage()} />
            <Pagination.Next 
            href="#"
            onClick={() => nextPage()}/>
        </Pagination>
        </nav>
        )
    }
}
