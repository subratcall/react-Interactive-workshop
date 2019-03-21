import React from "react";
import style from "./style.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import logo from "../../../assets/images/Oracle_logo.svg";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      value: "Home"
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className={style.navbar}>
          <NavbarBrand href="/">
            <img
              src={logo}
              className={style.navImage}
              height="20"
              alt="image"
            />
          </NavbarBrand>
          <div className={style.navItem}>
            {Object.keys(this.props.section).map((sectionName, sectionKey) => {
              {
                return (
                  <UncontrolledButtonDropdown>
                    <DropdownToggle nav caret key={sectionKey}>
                      {sectionName}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.section[sectionName].subTitles.map(
                        (subTitle, i) => {
                          return (
                            <DropdownItem
                              key={i}
                              onClick={() =>
                                this.props.onSubtitleClick(
                                  sectionKey,
                                  this.props.section[
                                    Object.keys(this.props.section)[sectionKey]
                                  ].keys[i]
                                )
                              }
                            >
                              {subTitle}
                            </DropdownItem>
                          );
                        }
                      )}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                );
              }
            })}
          </div>
        </Navbar>
      </div>
    );
  }
}
