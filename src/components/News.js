import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',

    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        publishedAt: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalresults:0
        }
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, totalresults: parsedata.totalResults, loading: false })


    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=1&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // this.setState({ articles: parsedata.articles, totalresults: parsedata.totalResults, loading: false })
        this.updateNews();

    }
    Handlepreviousclick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedata.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    Handlenextclick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedata = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedata.articles,
        //         loading: false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({page:this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10ea6848744d44459391340ec59cacdd&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles:this.state.articles.concat(parsedata.articles), totalresults: parsedata.totalResults })
      };
    render() {

        return (
     <>
            
                <h2 className="text-center">FreshFocus News ---Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll

                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalresults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 80) : " "} ImageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                </>
              
            
        )
    }
}


export default News
