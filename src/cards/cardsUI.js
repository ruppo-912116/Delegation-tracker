import React from 'react';
import {Card} from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './cardStyle.css';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';


let colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'info',
  'light',
  'dark',
]



// Card UI for the pools
const Card1 = ({pools, history}) => {

  let paginationBasic = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
  
    return (<div style={{flex:1, justifyContent:"center"}}>
    <Pagination size="lg">
    <Pagination.First/>
    <Pagination.Prev/>
    {items.map(item => {
      return item
    })}
    <Pagination.Next/>
    <Pagination.Last/>
    </Pagination>
    </div>);
  }

  const poolList = pools.length ? pools.map((pool,index) => {

    let colorChoice = colors[index%7] === "dark"? "white":"black";
    
    return(
      <div key={pool.pool_hash}
       style={{padding:16,width:"25%"}}>
        <Card
        key={index}
        bg={colors[index%7]}
        text={colors[index%7] === 'dark' ? "light": "dark"}
        style={{height:"100%",justifyContent:"center"}}>
        <Card.Body>

          <Card.Title
          style={{cursor: "pointer"}}
          onClick={()=> {
           return history.push("/timeline",{pool})}}>
          {pool.name}
          </Card.Title>

            <Card.Text style={{color: colorChoice }}>
              {pool.description}
            </Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  }):(
    <div style={{display:"flex",justifyContent: "center",alignItems: "center", height: "700px"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        <Spinner
        animation="border"
        variant="primary" 
        role="status">
        </Spinner>
        <h2 style={{paddingLeft: 16}}>Loading...</h2>
      </div>
    </div>
  );


  return(
    <div>
    <div className="container">{poolList}</div>
    </div>

);

}

export default withRouter(Card1);