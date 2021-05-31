import React, { Component } from 'react'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import { registrations, poolFind} from "../../services/poolList";

import "../timelineStyle.css";
import Page from '../Page';
import { Spinner } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default class TimelineMock extends Component {

    state = {
        stakes: [],
        loading: true,
        message: "Loading timeline...",
        epoch:[],
        pool:[],
        allStakes:[],
        rewards: [],
        delegatedAmount: [],
        overlayLoading: false,
        delegatedPool: [],
        status: [],
        allAddressPoolhash:[],
        firstIndex: 0,
        lastIndex: 3,
        counter: 0
    }

        // formatting response object suitable to timeline view
        ObjectFormatting = async (dateTemp, res,totalDelegation,address,amount,registration,allAddress,counter) => {
        let i = 0;
        let count = -1;
        for (i; i<res.data.data.length; i++){
        if(res.data.data[i].transaction.block.forgedAt.substring(0,10) === dateTemp){
        totalDelegation += res.data.data[i].transaction.deposit
        count = count + 1
        counter.push(count)
        address.push(res.data.data[i].address)
        allAddress.push(res.data.data[i].address)
        amount.push(res.data.data[i].transaction.deposit)
        registration.push(await registrations(res.data.data[i].address))
        }else{
        this.setState({
        stakes: [
        ...this.state.stakes,
        {
            address: address,
            totalDelegation: totalDelegation,
            registration: registration,
            amount: amount,
            hash: res.data.data[i].transaction.hash ,
            date: dateTemp,
            counter: counter
        }]
        }, async ()=>{
            totalDelegation = 0;
            address = [];
            registration= [];
            amount = [];
            counter=[];
            totalDelegation += res.data.data[i].transaction.deposit;
            count = count + 1
            counter.push(count)
            address.push(res.data.data[i].address)
            allAddress.push(res.data.data[i].address)
            amount.push(res.data.data[i].transaction.deposit)
            registration.push(await registrations(res.data.data[i].address))
        })
        }
        if(i === res.data.data.length-1){
        this.setState({
        stakes: [
        ...this.state.stakes,
        {
            address: address,
            totalDelegation: totalDelegation,
            registration: registration,
            amount: amount,
            hash: res.data.data[i].transaction.hash ,
            date: dateTemp,
            counter: counter
        }]
        })
        }
        dateTemp = res.data.data[i].transaction.block.forgedAt.substring(0,10)
        }
    }

     // obtaining current pool and delegated amount
     getCurrentInfo =async (holders,delegatorHashes) => {
        let delegationAmount = [];
        let flag = 0
        for(let i = 0; i<holders.length; i++){
        flag = 0
        for(let j = 0; j<holders[i].length;j++){
        if(holders[i][j].transaction.deposit !== 0){
        flag = 1;
        delegationAmount.push(holders[i][j].transaction.deposit/1000)
        break;
        }
        }
        if (flag === 0){
        delegationAmount.push(0)
         }   
        }
       this.setState({
           delegatedAmount: delegationAmount,
       },()=>{
       this.getCurrentDelegatedAmount(delegatorHashes)    
       })
        }

        // get current delegation amount
        getCurrentDelegatedAmount = async (delegatorHashes) => {
        let namePool = await Promise.all(delegatorHashes.map(async hash => {
        return await  poolFind(hash)
        }))
        this.setState({
            delegatedPool: namePool
        })
        }

        // checking whether the delegator has left the pool
        checkingAddress = (delegatorHashes) => {
        let status = []
    
        delegatorHashes.map(hash => {
        if(hash === this.props.location.state.pool.pool_hash){
        status.push("active")
        }else{
        status.push("inactive")
        }
        })
    
        this.setState({
        status: status
        })
        }

        // Get names of the pool from hash
        poolName = async (res,name) => {
        let poolName = await poolFind(res.stakePool.hash)
        name.push(poolName)
        this.setState({
            poolHash:name
        })
        }

         // Getting rewards of the address
        bonus = (address) => {
        this.setState({
            counter: this.state.counter + 1
        })
        console.log(address)
        }

         // overlay design
        overlayUI = (address, registered,amount,poolName) => {
        return <Popover id="popover-basic">
        <Popover.Title>
        <h6 style={{color:"black", fontWeight:"bold"}}>Stake Address</h6>
        <p style={{fontSize:12}}>{address}</p>
        </Popover.Title>
        {this.state.overlayLoading ?
        <div style={{display: "flex",justifyContent: "center",alignItems:"center", height:"80px"}}>
        <Spinner
        animation="border"
        variant="primary" 
        role="status" />
        </div>:
        <Popover.Content>
        <div style={{display:"flex", flexDirection:"column"}}>
        <div className="overlayStyle">
        <h7 style={{fontWeight:"bold"}}>Registered:</h7>
        <p>{registered}</p>
        </div>
        <div className="overlayStyle">
        <h7 style={{fontWeight:"bold"}}>Delegated to:</h7>
        <p>{poolName}</p>
        </div>
        <div className="overlayStyle">
        <h7 style={{fontWeight:"bold"}}>Amount:</h7>
        <p>{amount}K</p>
        </div>
        <hr className="horizontalLine"/>
        <div className="overlayStyle">
        <h7 style={{flex:0.2,fontWeight:"bold"}}>Epoch</h7>
        <h7 style={{flex:0.2, fontWeight:"bold"}}>Pool</h7>
        <h7 style={{flex:0.1, fontWeight:"bold"}}>Reward</h7>
        </div>
        <hr className="horizontalLine"/>
        <div className="tableStyle">
        {this.state.rewards.slice(this.state.firstIndex,this.state.lastIndex).map((r,index) => {
        return <div
        key={r} 
        className="overlayStyle">
        <p className="topicStyle" style={{flex: 0.3, justifyContent:"flex-start"}}>{this.state.epoch.slice(this.state.firstIndex,this.state.lastIndex)[index]}</p>
        <p style={{flex: 0.3, justifyContent:"center", fontSize:"9"}}>{this.state.poolHash.slice(this.state.firstIndex,this.state.lastIndex)[index]}</p>
        <h7 className="overlayStyle" style={{flex: 0.3, justifyContent:"flex-end"}}>{r}K</h7>
        </div>
        })}
        <Page postsPerPage={this.state.postsPerPage} nextPage={this.nextPage} prevPage={this.previousPage}/>
        </div>
        </div>
        </Popover.Content>}        
        </Popover>
        }

        //pagination next page callback
        nextPage = () => {
        if(this.state.lastIndex + 3 <= this.state.rewards.length-1){
        this.setState({
        firstIndex: this.state.firstIndex + 3,
        lastIndex: this.state.lastIndex + 3
        })
        }  
        }
    
        // pagination previous page callback
        previousPage = () => {
        if(this.state.firstIndex - 3 >= 0){
        this.setState({
        firstIndex: this.state.firstIndex - 3,
        lastIndex: this.state.lastIndex - 3
        })
        }
        }
    
        // timeline design with overlay trigger
        timelineUI = () => {
            return(
            <div>
            <Timeline lineColor={"#ddd"}>
            {this.state.stakes.map((stake,i) => {
            return <TimelineItem
            key={stake.hash}
            dateText={stake.date}
            bodyContainerStyle={{
            background: "#ddd",
            padding:"16px",
            borderRadius:"8px",
            boxShadow:"0.5rem 0.5rem 2rem 0 rgba(0,0,0,0.2)"}}
            style={{color: "#e86971"}}>
            <h6 className="titleStyle"> Total delegation: {stake.totalDelegation/1000}k ada</h6>
            <hr className="horizontalLine"/>
            <div className="overlayStyle">
            <h6 style={{fontWeight:"bold",flex:0.3}}>Registered</h6>
            <h6 style={{fontWeight:"bold",flex:0.2}}>Address</h6>
            <h6 style={{fontWeight:"bold", flex:0.15}}>Amount</h6>
            </div>
            <hr className="horizontalLine"/>
            {stake.address.map((address,index)=>{
                return(
                <div key={stake.counter[index]}>
                <div className="overlayStyle">
                <h6 style={{fontSize:14, flex:0.4}}>{stake.registration[index]}</h6>
    
                <OverlayTrigger
                trigger="click"
                rootClose={true}
                placement="right"
                onEnter={
                ()=>{
                this.setState({
                firstIndex:0,
                lastIndex:3,
                epoch: [],
                pool: [],
                rewards: [],
                overlayLoading: true
                },() =>{
                this.bonus(address)
                })
                }}
                onHide={
                ()=>{
                this.setState({
                epoch:[],
                pool:[],
                rewards:[],
                overlayLoading: false
                })
                }
                }
                onExit={
                ()=>{
                this.setState({
                clicked: false,
                epoch: [],
                pool: [],
                rewards: []
                })
                }}
                overlay={this.overlayUI(address,stake.registration[index],this.state.delegatedAmount[stake.counter[index]], this.state.delegatedPool[stake.counter[index]])}>
                <h6 className={this.state.status[stake.counter[index]]}>
                {address.substring(0,9)}....{address.substring(50,)}
                </h6>
                </OverlayTrigger>
                <h6 style={{fontSize:14, flex:0.15}}>{stake.amount[index]/1000}K ada</h6>
                </div>
                <hr className="horizontalLineSubHeadings"/>
                </div>
                )
                })} 
                </TimelineItem>
            })}
            </Timeline>
            </div>
            )}
    
        render() {
        let TimelineList = this.state.loading ?
        <div className="spinnerStyle" id="testId">
        <div className="centerAlignment">
        <Spinner
        animation="border"
        variant="primary"
        role="status"/>
        <h2 style={{paddingLeft:16}}>{this.state.message}</h2>
        </div>
        </div>:
        <div>
        {this.timelineUI()}
        </div>
        return (
            <div>
            <div className="titleStyle" id="addressTest">
            <h1>{this.props.location.state.pool.name}</h1>
            <button onClick={() => this.bonus()} >Increment</button>
            </div>
            {TimelineList}
            </div>
        )
    }
}
