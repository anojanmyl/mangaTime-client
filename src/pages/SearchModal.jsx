import React, { Component } from "react";
import "../styles/modal.css";
import SearchManga from "./SearchManga";
import apiHandler from "../api/apiHandler";

class Modal extends Component {
  handleClickBtn = (manga) => {
    apiHandler
      .transferManga(manga)
      .then((data) => {
        console.log(`searchData:`, data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    console.log("search", this.props.info.id);
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="modal scrollbox">
            <SearchManga id={this.props.info.id} />
            <button onClick={this.props.onHide}>Close</button>
            <button
              className="btn-add"
              onClick={() => this.handleClickBtn(this.props.info)}
            >
              Add this manga
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
