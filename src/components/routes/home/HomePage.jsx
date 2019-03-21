import React from "react";
import Header from "components/ui/Header/Header";
import Details from "components/ui/Details/Details";
// import '../home/carousel.min.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import style from "./style.scss";

import slide from "../../../assets/images/architecture/01.png";
import { Collapse, Button, CardBody, Card } from "reactstrap";
const jsonFile = require("../../../assets/JSON/microservices-devops.json");

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubtitleClick = this.onSubtitleClick.bind(this);
    this.detailClicked = this.detailClicked.bind(this);
    this.state = {
      parsedJson: [],
      subSectionKey: null,
      sectionKey: null,
      detailClick: false
    };
  }

  componentDidMount() {
    // FETCHING THE DATA FROM THE JSON FILE
    var jsonData = [];
    var parsedJson = {};
    var key = -1;
    fetch(jsonFile)
      .then(data => data.json())
      .then(
        data => {
          jsonData = data.workshop_content.slice(0);
          jsonData.map(function(item, i) {
            if (item.Section in parsedJson) {
              parsedJson[item.Section].subTitles.push(item.SubTitle);
              parsedJson[item.Section].titles.push(item.Title);
              parsedJson[item.Section].texts.push(item.Text);
              parsedJson[item.Section].images.push(item.Image);
              key++;
              parsedJson[item.Section].keys.push(key);
            } else {
              key++;
              var internMap = {};
              internMap["subTitles"] = [item.SubTitle];
              internMap["titles"] = [item.Title];
              internMap["texts"] = [item.Text];
              internMap["images"] = [item.Image];
              internMap["keys"] = [key];
              parsedJson[item.Section] = internMap;
            }
          });
          console.log("PARSED JSON");
          console.log(parsedJson);
          this.setState({
            parsedJson: parsedJson
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  onSubtitleClick(sectionKey, index) {
    this.setState({
      sectionKey: sectionKey,
      subSectionKey: index
    });
  }

  detailClicked() {
    this.setState(state => ({
      detailClick: !state.detailClick
    }));
    // console.log("CALLED");
    // return <div className={style.displayDetail} />;
  }

  render() {
    const images = require.context(
      "../../../assets/images/architecture/",
      true
    );
    return (
      <div className={style.bodyHeight}>
        <Header
          section={this.state.parsedJson}
          onSubtitleClick={this.onSubtitleClick}
        />

        <div className={style.carousel}>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            swipeable={true}
            dynamicHeight={false}
            showStatus={false}
            useKeyboardArrows={true}
            selectedItem={this.state.subSectionKey}
          >
            {Object.keys(this.state.parsedJson).map(val => {
              {
                return this.state.parsedJson[val].keys.map((value, i) => {
                  let image = images(
                    `./${this.state.parsedJson[val].images[i]}`
                  );
                  return (
                    <div className={style.body}>
                      <div className={style.details}>
                        <div className={style.box} />
                        <div className={style.texts}>
                          <h3>{this.state.parsedJson[val].titles[i]}</h3>
                          <h4>{this.state.parsedJson[val].subTitles[i]}</h4>
                        </div>
                      </div>
                      <img src={image} className={style.imgCenter} />
                      <p className="legend" key={i}>
                        {this.state.parsedJson[val].texts[i]}
                      </p>
                      {/* <div
                        className={style.detailButton}
                        onClick={this.detailClicked}
                      >
                        {
                        this.state.detailClick ? (
                          <Details text={this.state.parsedJson[val].texts[i]} />
                        ) : null}
                        <p>Details</p>
                      </div> */}
                    </div>
                  );
                });
              }
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}
