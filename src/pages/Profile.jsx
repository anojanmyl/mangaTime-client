import React from "react";
import apiHandler from "../api/apiHandler";
import "../styles/profile.css";
import UserContext from "../components/Auth/UserContext";

class Profile extends React.Component {
  static contextType = UserContext;
  state = {
    mangas: [],
    name: "",
  };

  componentDidMount() {
    apiHandler.getUser().then((data) => {
      console.log("DATA", data);
      this.setState({ mangas: data });
    });
  }
  handleClick = (id) => {
    apiHandler
      .deleteManga(id)
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event, id) => {
    //   // trouver un moyen de prendre la value de l'input et update le mangas dans l'array
    //   // en fonctionant de son id.

    const foundManga = this.state.mangas.find((manga) => manga.id === id);

    const copy = { ...foundManga };
    copy.chapter = event.target.value;

    this.setState({
      mangas: this.state.mangas.map((manga) => {
        return manga.id === copy.id ? copy : manga;
      }),
    });

    // this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    //   // faire un call vers le backend pour le mettre à jour
    event.preventDefault();
    // submit to backend les mangas
    apiHandler.updateUserMangas(this.state.mangas).then((data) => {
      this.setState({
        mangas: data.totalmanga,
      });
    });
  };

  render() {
    console.log(">>>>>>", this.state.mangas);

    return (
      <div className="profile-title">
        <h1>My Profile</h1>
        {this.state.mangas.map((manga) => {
          return (
            <div className="smaller">
              <img
                className="profile-img"
                src={manga.attributes.posterImage.tiny}
                alt="manga"
              />

              <h3>{manga.attributes.canonicalTitle}</h3>
              <p>Rank: {manga.attributes.popularityRank}</p>
              <p>Rating: {manga.attributes.averageRating}</p>

              <button
                className="btn-profile"
                onClick={() => this.handleClick(manga.id)}
              >
                Delete
              </button>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="profile-input"
                  type="number"
                  value={manga.chapter}
                  onChange={(event) => this.handleChange(event, manga.id)}
                />
                <button className="btn-profile">Add</button>
              </form>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Profile;
