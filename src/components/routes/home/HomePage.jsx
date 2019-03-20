import React from 'react';
import Header from 'components/ui/Header/Header';
// import '../home/carousel.min.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import style from './style.scss';

import slide from '../../../assets/images/architecture/01.png';
import arch1 from '../../../assets/images/architecture/02.png';
import { isNull } from 'util';

const jsonFile1 = require('../../../assets/JSON/microservices-devops.json');

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubtitleSelect = this.onSubtitleSelect.bind(this);
    this.state = {
      myMap: [],
      key: null,
      sectionKey: null
    };
  }

  componentDidMount() {
    // FETCHING THE DATA FROM THE JSON FILE
    var jsonData = [];
    var myMap = {};
    var key = -1;
    fetch(jsonFile1)
      .then(data => data.json())
      .then(
        data => {
          jsonData = data.workshop_content.slice(0);
          jsonData.map(function(item, i) {
            if (item.Section in myMap) {
              myMap[item.Section].subTitles.push(item.SubTitle);
              myMap[item.Section].texts.push(item.Text);
              myMap[item.Section].images.push(item.Image);
              key++;
              myMap[item.Section].keys.push(key);
            } else {
              key++
              var internMap = {};
              internMap['subTitles'] = [item.SubTitle];
              internMap['texts'] = [item.Text];
              internMap['images'] = [item.Image];
              internMap['keys'] = [key];
              myMap[item.Section] = internMap;
            }
          });
          console.log('MY MAP');
          console.log(myMap);
          this.setState({
            myMap: myMap,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  onSubtitleSelect(sectionKey, index) {
    this.setState({
      key: index,
      sectionKey: sectionKey,
    });
  }

  render() {
    console.log('KEY');
    console.log(this.state.key);
    return (
      <div className={style.bodyHeight}>
        <div className={style.header}>
          <Header section={this.state.myMap} onSubtitleSelect={this.onSubtitleSelect} />
        </div>
        <div className={style.carousel}>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            swipeable={true}
            dynamicHeight={false}
            showStatus={false}
            useKeyboardArrows={true}
            selectedItem={this.state.key}
          >
            {Object.keys(this.state.myMap).map(val => {
              {
                return this.state.myMap[val].keys.map((value, i) => {
                  return (
                    <div className={style.body}>
                      <img src={this.state.myMap[val].images[i]} className={style.imgCenter} />
                      <p className="legend" key={i}>
                        {this.state.myMap[val].texts[i]}
                      </p>
                    </div>
                  );
                });
              }
            })}
            })} } })}
          </Carousel>
        </div>
      </div>
    );
  }
}
