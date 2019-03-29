import React from "react";
import style from "./detailStyle.scss";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailClick: false
    };
    this.detailClicked = this.detailClicked.bind(this);
  }

  detailClicked() {
    this.setState(state => ({
      detailClick: !state.detailClick
    }));
  }

  render() {
    return (
      <div className={style.detailButton} onClick={this.detailClicked}>
        <p>Details</p>
        {this.state.detailClick ? (
          <div className={style.show}>
            <p>{this.props.text}</p>
          </div>
        ) : (
          <div className={style.hide} />
        )}
      </div>
    );
  }
}
