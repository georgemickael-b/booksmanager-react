import React from 'react'
import axios from 'axios'

import { FormGroup,ControlLabel,FormControl,
  HelpBlock,Button,Row,Col,Panel} from 'react-bootstrap'
class Add extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name : null,
      author : null,
      ISBN : null,
      imgSrc : null,
      imageFile : null,
      imageValid :null
    }
  }

  getValidationState =(val,field)=>{
    if(val==null)
      return null
    const length = val.length;
    if(field=="ISBN"){ //ISBN should be atleast 10 digit
      if(Number(val))
        if (length >10) return 'success';
        else return 'error';
      else return 'error';
    }
    else{
      if (length >0) return 'success';
      else return 'error';
    }
  }

  checkIfImageValid= (e) =>{
    var _URL = window.URL || window.webkitURL;
    console.log(e.target)
    var file = e.target.files[0]

    console.log(file)
    if(file.size>2048000){
      this.setState({imageValid:"error"})
    }
    else{
      var image;
      var self=this
      if (file) {
          image = new Image();
          image.onload = function() {
              if(this.height/this.width < 1.3)
               self.setState({imageValid:"error"})
               else{
                 self.setState({imageFile:file})
                 self.setState({imageValid:"success"})
               }
          };
          image.src = _URL.createObjectURL(file);
      }
    }
  }

  imageUpload = () =>{
    var self=this
    var formData = new FormData()
    var file = this.state.imageFile
    formData.append('image',file)

    axios.post("/uploadImage",formData)
    .then(function(res){
      if(res.data.status=="success"){
        self.setState({imgSrc:"images/"+res.data.fileName})
      }
    })
    .catch(function(error){
      console.log(error)
    })
  }

  addBook =() =>{
    var self=this
    var {name,ISBN,author,imgSrc} = this.state
    var data = {name:name,ISBN:ISBN,author:author}

    for(let key in data){
      if (this.getValidationState(data[key],key)!=="success"){
        this.props.showModal("Invalid value supplied for "+key+". Please Correct it and try again.")
        return
      }
    }

    if(imgSrc)
      data["imgSrc"]=imgSrc
      axios.post("/books",data)
      .then(function(res){
        self.props.showModal(res.data.msg)
      })
      .catch(function(error){
        console.log(error)
      })
  }

  render(){
    return(
    <Row>
      <Col md={1}></Col>
      <Col md={5}>
        <Panel>
          <div style={{textAlign:"center"}}>
          <img src={this.state.imgSrc || "images/default.jpg"}
            style={{width:"300px",height:"400px"}} />
          </div>
          <FormGroup validationState={this.state.imageValid}>
            <ControlLabel>Upload Book Image (optional)</ControlLabel>
            <FormControl type="file" accept="image/png, image/jpeg"
              onChange={this.checkIfImageValid} />
            <HelpBlock>Size &lt; 2 MB and Resolution around 1:1.3</HelpBlock>
          </FormGroup>
          <Button bsStyle="default" onClick={this.imageUpload}
            disabled={this.state.imageValid!="success"}
          >Upload</Button>
        </Panel>
      </Col>
      <Col md={5}>
        <form>
          <FormGroup validationState={this.getValidationState(this.state.name)}>
            <ControlLabel>Name*</ControlLabel>
            <FormControl  placeholder="Enter the Name of the Book."
                          onChange={(e) => this.setState({name:e.target.value})}/>
          </FormGroup>
          <FormGroup validationState={this.getValidationState(this.state.ISBN,"ISBN")}>
            <ControlLabel>ISBN*</ControlLabel>
            <FormControl  placeholder="Enter the ISBN of the Book."
                          onChange={(e) => this.setState({ISBN:e.target.value})}/>
            <HelpBlock>Should be 10 or more digit Number.</HelpBlock>
          </FormGroup>
          <FormGroup validationState={this.getValidationState(this.state.author)}>
            <ControlLabel>Author*</ControlLabel>
            <FormControl  placeholder="Enter the Name of the Author"
                          onChange={(e) => this.setState({author:e.target.value})}/>
          </FormGroup>
          <Button bsStyle="primary"
                  onClick={this.addBook}
          >Add Book</Button>
        </form>
      </Col>
    </Row>


    )
  }
}

export default Add
