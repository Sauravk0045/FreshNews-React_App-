import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
   
    constructor(){
    super();
    this.state={
   articles:[],
   page:1
    }
    }
   async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=10ea6848744d44459391340ec59cacdd&page=1&pageSize=${this.props.pageSize}`
      let data= await fetch(url);
      let parsedata=await data.json();
      this.setState({articles:parsedata.articles,totalresults:parsedata.totalResults})
      

    }
    Handlepreviousclick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        this.setState({
            page:this.state.page-1,
            articles:parsedata.articles
        })
    }
    Handlenextclick= async()=>{
        if(this.state.page+1> Math.ceil(this.state.totalresults/this.props.pageSize)){

        }
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        this.setState({
            page:this.state.page+1,
            articles:parsedata.articles
        })
    }
    }
    render() {
    
        return (
            
            <div className="container my-4">
                <h2 className="text-center">FreshFocus News ---Top Headlines</h2>
               
                <div className="row">
                  {this.state.articles.map((element)=>{ return <div className="col-md-4"  key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,80):" "} ImageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>})}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.Handlepreviousclick}>&larr; Previous</button>
                <button disabled={this.state.page+1> Math.ceil(this.state.totalresults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.Handlenextclick}> Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
