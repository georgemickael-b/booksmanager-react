import React from 'react'
import {Panel,Row,Col,Button} from 'react-bootstrap'

const style={
  center:{
    textAlign:"center"
  },
  imgCol:{
    textAlign:"center",padding:0
  },
  img:{

  },
  close:{
    textAlign:"right",position: "absolute",
      right: 20,
      top: 0,zIndex:5
  },
  delA:{
    color:'red'
  },
  img:{
    height:167,width:128,textAlign:"center"
  }

}

const Card = (props) => {
  var {name,author,ISBN,imgSrc} = props
  return(
    <Panel className="viewPanel">
    <div style={style.close}>
     <a style={style.delA} onClick={props.deleteBook.bind(props.view,ISBN)}>
       <i className="fa fa-times"></i>
     </a>
    </div>
      <Col md={5} style={style.imgCol}>
        <img style={style.img} src={imgSrc} ></img>
      </Col>
      <Col md={7}>
       <h3 style={style.center}>
         {name}
       </h3><hr/>
       <div style={style.center}>
         {"By, "+author}
       </div>
       <div style={style.center}>
         {"ISBN : "+ISBN}
       </div>
      </Col>
    </Panel>  )
}

export default Card
