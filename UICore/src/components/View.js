import React from 'react'
import axios from 'axios'
import {Row,Col,Pagination} from 'react-bootstrap'

import Card from './Card'

class View extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      books : [],
      activePage : 1,
      n:6,
      totalCount : null
    }
  }

  componentWillMount(){
    this.fetchDataCount()
    this.fetchBooksData(1)
  }

  fetchDataCount =() => {
      var self=this
      axios.get('/books/count')
      .then(function(res){
        if(res.data.status="success"){
          console.log(res.data.payload)
          self.setState({totalCount:res.data.payload})
        }
        else{
          console.log(res.data.msg)
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }

  fetchBooksData =(activePage) => {
    console.log("active",this.state.activePage)
      var self=this
      var n = this.state.n
      var i = (activePage-1)*n

      console.log("i",i)
      axios.get("/books/?i="+i+"&n="+n)
      .then(function(res){
        var data = res.data
        console.log(data)
        if(data.status="success"){
          self.setState({books:data.payload})
        }
        else{
          console.log(data.msg)
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }

  deleteBook =(ISBN) =>{
    var self=this
    axios.request({
      url: "/books",
      method : "delete",
      data : {ISBN:ISBN}
    })
    .then(function(res){
      self.fetchDataCount()
      self.fetchBooksData(self.state.activePage)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  generateCards = () =>{
    return this.state.books.map((book,idx)=>{
      return(
      <Col key={"book"+idx} md={6}>
        <Card
          name={book.name}
          author={book.author}
          ISBN={book.ISBN}
          imgSrc={book.imgSrc}
          deleteBook={this.deleteBook}
          view={this}
        />
      </Col>
      )
    })
  }

  selectPage = (eventKey) =>{
    console.log(eventKey)
    this.fetchBooksData(eventKey)
    this.setState({activePage:eventKey})
  }

  render(){
    return(
      <div style={{textAlign:"center"}}>
        <Row >
          <Col md={1}></Col>
          <Col md={10}>
          {this.generateCards()}
          </Col>
        </Row>
        <Row style={{textAlign:"center"}}>
        <Col md={12}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={Math.ceil(this.state.totalCount/this.state.n)}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.selectPage} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default View
