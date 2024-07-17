import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,ImageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
       <div className="card" style={{width: "18rem"}}>
  <img src={!ImageUrl?"https://batenupki.com/img/default_news.jpg":ImageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left:'80%',zIndex:'1'}}>
  {source}</span>
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-danger"><b>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</b></small></p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems
