import React, { Component } from 'react';
import Card1 from './cardsUI.js';
import Searchbar from "../search/Searchbar.js";
import {poolList, poolsUnite, totalPools, totalPoolsNumber} from "../services/poolList";
import {search} from "./utils";

// searchlist is to store the search result
// Search Variable is to store the search input
let SearchList;
let isMounted = true;
let Uppere = "";




export default class CardMain extends Component {

    state = {
        Pools : [],
        loading: false,
        error: false,
        errorMessage: "",
        SearchList:[]
    }

    async componentDidMount(){
        try{
        await totalPools()
        let index=  [];
        for(let i=1; i<= parseInt(totalPoolsNumber/100); i++){
         index.push(i)
        }
        await Promise.all(index.map(async i => {
            await poolList(i)
        }))
        this.setState({
        Pools: poolsUnite,
        loading: true,
        error:false,
        message: "Loading..."
        }, () => {
        if (poolsUnite && isMounted){
            this.setState({
                loading: false
            });
        }
        })
    }
    catch(err){
        this.setState({
            error: true,
            errorMessage: err.message,
            loading: false
        })
        console.log(err.message);
    }
    }

    // the function is for search method
    // upon search, this function is called and the state of the pools is changed
    searchTrigger = async (e) => {

        Uppere = e.toLowerCase();
        let resultPool = await search(`[BASE_URL_HERE]/pools?q=${Uppere}`)

        SearchList = resultPool

        this.setState({loading: false})

        if (SearchList.length === 0){
        this.setState({
        loading: true,
        message:"No pools found"
        })
        }   
    }


    render() {
        return (
            <div>
            {this.state.error ? <div className="d-flex justify-content-center">{this.state.errorMessage}</div>:
                <div id="mainId">
                <Searchbar trigger={this.searchTrigger}/>
                { this.state.loading ?
                 <div className="d-flex justify-content-center">{this.state.message}</div>   
                :<div>
                   {Uppere === "" ? <Card1 pools={this.state.Pools}/> : <Card1 pools={SearchList}/> }
                </div>
                }
                </div>
            }
            </div>
        )
    }
}

