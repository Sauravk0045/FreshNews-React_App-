import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
export class News extends Component {
static defaultProps={
    country:'in',
    pageSize:6,
    category:'general'
}
static propTypes={
    country:PropTypes.string,
    category: PropTypes.string,
    publishedAt:PropTypes.string
}
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
        loading:false,        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, totalresults: parsedata.totalResults,loading:false })


    }
    Handlepreviousclick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedata.articles,
            loading:false
        })
    }
    Handlenextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedata = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedata.articles,
                loading:false
            })
        }
    }
    render() {

        return (

            <div className="container my-4">
                <h2 className="text-center">FreshFocus News ---Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 80) : " "} ImageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt}source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.Handlepreviousclick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.Handlenextclick}> Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
