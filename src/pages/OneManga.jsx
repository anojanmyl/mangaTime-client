import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class OneManga extends Component {
  state = {
    infos: [],
  };

  componentDidMount() {
    axios.get(`https://kitsu.io/api/edge/trending/manga`).then((response) => {
      this.setState({
        infos: response.data.data,
      });
    });
  }

  render() {
    const filteredInfos = this.state.infos.filter((info) => {
      if (this.props.id === info.id || this.props.match.params.id === info.id) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <div>
        {filteredInfos.length !== 0 && (
          <div className="one-manga">
            <img
              className="img-manga"
              src={filteredInfos[0].attributes.posterImage.tiny}
              alt={filteredInfos[0].attributes.canonicalTitle}
            />

            <h1>{filteredInfos[0].attributes.canonicalTitle}</h1>

            <p>Rank: {filteredInfos[0].attributes.popularityRank}</p>
            <p>Rating: {filteredInfos[0].attributes.averageRating}</p>
            <p>Description: {filteredInfos[0].attributes.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(OneManga);
