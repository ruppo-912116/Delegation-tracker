import React from 'react';
import { Link } from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';
class Error extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
              {this.props.err}
            </p>
          </div>;
    }
}
export default Error;