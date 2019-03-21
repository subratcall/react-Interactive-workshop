import React from "react";
import style from "./detailStyle.scss";
import { defaultCipherList } from "constants";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.showHide}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
