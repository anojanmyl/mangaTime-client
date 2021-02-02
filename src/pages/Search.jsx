import React, { Component } from "react";
import "../styles/search.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import axios from "axios";
import "../styles/home.css";
import SearchModal from "./SearchModal";

class Search extends Component {
  state = {
    value: "",
    results: [],
    infos: [],
    showModal: false,
    info: "",
    isLoading: false,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value, isLoading: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://kitsu.io/api/edge/manga?filter[text]=${this.state.value}`)
      .then((response) => {
        this.setState({
          infos: response.data.data,
          isLoading: false,
        });
      });
  };

  getModal = (info) => {
    this.setState({ showModal: true, info });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    console.log("HERE", this.state.infos);

    if (this.state.isLoading === true) {
      return (
        <section>
          <header className="header-search">
            <div className="wrap">
              <form className="search" onSubmit={this.handleSubmit}>
                <input
                  type="search"
                  className="searchTerm"
                  name="search"
                  onChange={this.handleChange}
                  placeholder="Search your manga..."
                />
                <button type="submit" className="searchButton">
                  <SearchRoundedIcon />
                </button>
              </form>
            </div>
          </header>
          <div className="loading">
            <img src="/images/loading.gif" alt="loading" />
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <header className="header-search">
            <div className="wrap">
              <form className="search" onSubmit={this.handleSubmit}>
                <input
                  type="search"
                  className="searchTerm"
                  name="search"
                  onChange={this.handleChange}
                  placeholder="Search your manga..."
                />
                <button type="submit" className="searchButton">
                  <SearchRoundedIcon />
                </button>
              </form>
            </div>
          </header>
          <div>
            {this.state.infos.map((info) => {
              return (
                <div key={info.id} className="small">
                  <img
                    onClick={() => this.getModal(info)}
                    className="home-image"
                    src={info.attributes.posterImage.tiny}
                    alt={info.attributes.canonicalTitle}
                  />
                  <p>Rank: {info.attributes.popularityRank}</p>
                  <p>Rating: {info.attributes.averageRating}</p>

                  <h3>{info.attributes.canonicalTitle}</h3>
                </div>
              );
            })}
            <SearchModal
              show={this.state.showModal}
              onHide={this.hideModal}
              info={this.state.info}
            />
          </div>
        </section>
      );
    }
  }
}

export default Search;
