import React from "react";
import Header from "components/ui/Header/Header";
// import '../home/carousel.min.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import style from "./style.scss";

import slide from "../../../assets/images/architecture/01.png";

const jsonFile = require("../../../assets/JSON/microservices-devops.json");

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubtitleClick = this.onSubtitleClick.bind(this);
    this.state = {
      parsedJson: [],
      subSectionKey: null,
      sectionKey: null
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
              parsedJson[item.Section].texts.push(item.Text);
              parsedJson[item.Section].images.push(item.Image);
              key++;
              parsedJson[item.Section].keys.push(key);
            } else {
              key++;
              var internMap = {};
              internMap["subTitles"] = [item.SubTitle];
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
                      <img src={image} className={style.imgCenter} />
                      <p className="legend" key={i}>
                        {this.state.parsedJson[val].texts[i]}
                      </p>
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
