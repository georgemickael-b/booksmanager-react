import React from 'react'
import axios from 'axios'
import { FormGroup,ControlLabel,FormControl,
  Button,Row,Col,Panel,Modal} from 'react-bootstrap'

class Delete extends React.Component{
  constructor(props){
    super(props)
    this.state={ISBN:null}
  }

  isISBNValid =()=>{
    var ISBN=this.state.ISBN
    if(!ISBN)
      return null
    if(Number(ISBN))
      if (ISBN.length >10) return 'success';
      else return 'error';
    else return 'error';
  }

  deleteBook =() =>{
    var self=this
      if(this.isISBNValid()=="success"){
        console.log(this.state.ISBN)
        axios.request({
          url: "/books",
          method : "delete",
          data : {ISBN:this.state.ISBN}
        })
        .then(function(res){
          self.props.showModal(res.data.msg)
        })
        .catch(function(error){
          console.log(error)
        })
      }
    else{
      this.props.showModal("Invalid ISBN.Please check and try again.")
    }
  }

  render(){
    return(
      <Row>
      <Col md={3}></Col>
      <Col md={6}>
      <Panel>
        <form>
          <FormGroup validationState={this.isISBNValid()}>
            <ControlLabel>ISBN*</ControlLabel>
            <FormControl  placeholder="Enter the ISBN of the Book to Delete."
                          onChange={(e) => this.setState({ISBN:e.target.value})}/>
          </FormGroup>
          <Button bsStyle="danger"
                  onClick={this.deleteBook}
          > Delete </Button>
        </form>
      </Panel>
      </Col>
      </Row>
    )
  }
}

export default Delete
