import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import logic from '../logic'
class _Card extends Component {

  state = {
    newsData: ""
  }

  componentDidMount(){
    logic.newsForGame(this.props.data.appid,1,150)
    .then(res => {
      this.setState({
        newsData: res,
      })
    })
  }

  // showDetailedNews = () => {
  //   return {}
  // }


  render() {
      return <Card>
            <CardBody>
              <CardTitle>{this.props.data.name}</CardTitle>
              <CardSubtitle>{this.props.data.developer}</CardSubtitle>
              {this.state.newsData && <p className="card-text" dangerouslySetInnerHTML={{__html:this.state.newsData.contents}}></p> }
              <Button >See more</Button>
            </CardBody>
          </Card>;
        };
      }
{
  /* <Card>
<CardBody>
  <CardTitle>1</CardTitle>
  <CardSubtitle>Card subtitle</CardSubtitle>
  <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
  <Button>Button</Button>
</CardBody>
</Card>  */
}
export default _Card;
