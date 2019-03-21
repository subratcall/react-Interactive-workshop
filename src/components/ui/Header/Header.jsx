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
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      value: "Home"
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className={style.navbar}>
          <NavbarToggler onClick={this.toggle} className={style.Toggler} />
          <NavbarBrand href="/" className={style.NavbarBrand}>
            <img
              src={logo}
              className={style.navImage}
              height="20"
              alt="image"
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <div className={style.navItem}> */}
              {Object.keys(this.props.section).map(
                (sectionName, sectionKey) => {
                  {
                    return (
                      <UncontrolledButtonDropdown nav inNavbar>
                        <DropdownToggle nav caret key={sectionKey}>
                          {sectionName}
                        </DropdownToggle>
                        <DropdownMenu right>
                          {this.props.section[sectionName].subTitles.map(
                            (subTitle, i) => {
                              return (
                                <DropdownItem
                                  key={i}
                                  onClick={() =>
                                    this.props.onSubtitleClick(
                                      sectionKey,
                                      this.props.section[
                                        Object.keys(this.props.section)[
                                          sectionKey
                                        ]
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
                }
              )}
              {/* </div> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
