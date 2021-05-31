import React, { Component } from 'react';
import { Input} from "mdbreact";

import "./searchStyle.css";

export default class Searchbar extends Component {
    
    state = {
        search: ""
    }


    // call back function
    // on search, this function triggers the
    // trigger function passed as a prop from cardMain component
    onchange = (e) => {
        this.setState({
            search: e.target.value
        }, ()=> {
            this.props.trigger(this.state.search)
        });
    }

    render() {
        //console.log(this.props);
        return (
            <div 
            className="searchbar">
                <Input 
                label="Search pools"
                icon="search" 
                onChange={(e)=> this.onchange(e)}/>
            </div>
        )
    }
}
