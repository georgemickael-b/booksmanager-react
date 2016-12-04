import React from 'react'
import {Grid,Row,Col,Modal,Button,Navbar} from 'react-bootstrap'

import Menu from './Menu'
import View from './View'
import Add from './Add'
import Delete from './Delete'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      currMenuOption : 1,
      modalMessage : null,
      modalShow:false
    }
  }
  onMenuOptionSelect = (eventKey) => {
      this.setState({currMenuOption:eventKey})
  }

  showModal = (msg) =>{
    this.setState({modalMessage:msg,modalShow:true})
  }

  render(){
    var currMenuOption = this.state.currMenuOption
    return(
      <div>
        <Navbar inverse collapseOnSelect className="navbar-fixed-top" >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Books Manager</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Menu
            currMenuOption={currMenuOption}
            onMenuOptionSelect={this.onMenuOptionSelect} />
       </Navbar>
        <Grid style={{paddingTop:65}}>
          <Row>
            <Col xs={12} md={12}>
                {currMenuOption==1 && <View />}
                {currMenuOption==2 && <Add showModal={this.showModal}/>}
                {currMenuOption==3 && <Delete showModal={this.showModal} />}
            </Col>
          </Row>

          <Modal show={this.state.modalShow}>
           <Modal.Header>
             <Modal.Title>{this.state.modalMessage}</Modal.Title>
           </Modal.Header>
           <Modal.Footer>
             <Button
              onClick={()=>{this.setState({modalShow:false})}}
             >Ok</Button>
           </Modal.Footer>
         </Modal>
        </Grid>
      </div>
    )
  }
}

export default App
