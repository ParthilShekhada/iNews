
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
    static defaultProps = {
        country: 'in',
        page: '5',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        page: PropTypes.string,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: true,
            totalResults:0
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`
    }

    async componentDidMount() {
        this.updateNews()
    }
    async updateNews() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseData = await data.json()
        this.props.setProgress(70)
        this.setState({ articles: parseData.articles, page: this.state.page, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100)

    }
    handlePreClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()


    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()

    }

    fetchMoreData=async()=>{
        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({ articles: this.state.articles.concat(parseData.articles), 
            page: this.state.page, totalResults: parseData.totalResults, 
            loading: false })
        
    }
    render() {
        return (<>
           
            <div>
                <div className="container my-3">
                    <h2 className='text-center' style={{ margin: '35px 0px' }}> {this.props.text}</h2>
                    {/* {this.state.loading&&<Spinner />} */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://image.cnbcfm.com/api/v1/image/107219753-1680564743082-gettyimages-1247860369-1265439-na-pol-0307-capitol-hill-kkn-38569.jpeg?v=1681085220&w=1920&h=1080"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                        </div> 
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePreClick}>&larr; Privious</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
                </div>
            </div>
            </>
        )
    }
}

export default News