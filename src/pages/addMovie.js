import addMovie_style from "../style/addMovie.css";

import React from "react";

import api from "../api/api";
import { postImage } from "../api/postImage";
import Footer from "../components/Footer";

class AddMovie extends React.Component {
  state = {
    _id: "",
    title: "",
    director: "",
    releaseDate: "",
    movie_length: "",
    movie_budget: 0,
    leadActor: "",
    support_actor: "",
    movie_genre: "",
    time: "",
    image: "",
    image_url: "",
    rate: 0,
    min_age: 7,
    ticket_price: "",
    number_of_seats: 150,
    synopsis: "",
  };

  onImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  postNewMovie = async (data) => {
    const res = await api.post("/add_movie", data);
    return res;
  };

  //   postImage = async (id) => {
  //     const formData = new FormData();
  //     formData.append("file", this.state.image);
  //     formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
  //     formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  //     formData.append("public_id", id);

  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     return res.json();
  //   };

  updateMoviePoster = async (id, url) => {
    const res = await api.put("/update_movie_image", {
      _id: id,
      url: url,
    });
    return res;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state.image);

    try {
      const body = {
        name: this.state.title,
        release_date: this.state.releaseDate,
        director: this.state.director,
        show_long: this.state.movie_length,
        budget: this.state.movie_budget,
        main_actors: [this.state.leadActor, this.state.support_actor],
        movie_type: this.state.movie_genre,
        show_time: this.state.time,
        rate: this.state.rate,
        age_range: this.state.min_age,
        description: this.state.synopsis,
        number_of_seats: this.state.number_of_seats,
        ticket_price: this.state.ticket_price,
      };

      const res = await this.postNewMovie(body);
      const response = await postImage(res.data.movie_id, this.state.image);

      const resp = await this.updateMoviePoster(
        res.data.movie_id,
        response.secure_url
      );

      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <form
          className="signup-form"
          action="/addMovie"
          method="post"
          onSubmit={this.handleSubmit}
        >
          <div className="form-header">
            <h1>Add a new movie</h1>
            <img
              src={require("../images/addLogo.png")}
              alt="Addicon"
              id="Addicon"
            />
          </div>

          <div className="form-body">
            <div className="horizontal-group">
              <div className="form-group left">
                <label htmlFor="Title" className="label-title">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  placeholder="Enter the Title of the movie"
                  required="required"
                  onChange={(e) => this.setState({ title: e.target.value })}
                  value={this.state.title}
                />
              </div>
              <div className="form-group right">
                <label htmlFor="ReleaseDate" className="label-title">
                  Release Date *
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  className="form-input"
                  placeholder="Enter the year of release of the movie"
                  min="1900"
                  max="2023"
                  onChange={(e) =>
                    this.setState({ releaseDate: e.target.value })
                  }
                  value={this.state.releaseDate}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="director" className="label-title">
                Director*
              </label>
              <input
                type="text"
                id="Director"
                className="form-input"
                placeholder="Enter the name of the director"
                required="required"
                onChange={(e) => this.setState({ director: e.target.value })}
                value={this.state.director}
              />
            </div>

            <div className="horizontal-group">
              <div className="form-group left">
                <label htmlFor="text" className="label-title">
                  Length of the movie *
                </label>
                <input
                  type="text"
                  id="length"
                  className="form-input"
                  placeholder="Enter how long is the movie"
                  required="required"
                  onChange={(e) =>
                    this.setState({ movie_length: e.target.value })
                  }
                  value={this.state.movie_length}
                />
              </div>
              <div className="form-group right">
                <label htmlFor="budget" className="label-title">
                  Budget *
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="budget"
                  placeholder="Enter the budget of the movie"
                  required="required"
                  onChange={(e) =>
                    this.setState({ movie_budget: e.target.value })
                  }
                  value={this.state.movie_budget}
                />
              </div>
            </div>

            <div className="horizontal-group">
              <div className="form-group left">
                <label className="label-title">Actors *:</label>
                <input
                  type="text"
                  className="form-input"
                  id="leadActor"
                  placeholder="Enter the name of the lead actor"
                  required="required"
                  onChange={(e) => this.setState({ leadActor: e.target.value })}
                  value={this.state.leadActor}
                />
                <br />
                <input
                  type="text"
                  className="form-input"
                  id="SupportingActor"
                  placeholder="Enter the name of the supporting actor"
                  required="required"
                  onChange={(e) =>
                    this.setState({ support_actor: e.target.value })
                  }
                  value={this.state.support_actor}
                />
              </div>
              <div className="form-group right">
                <label className="label-title">Genre *</label>
                <select
                  name="genre"
                  className="form-input"
                  required
                  onChange={(e) =>
                    this.setState({ movie_genre: e.target.value })
                  }
                  value={this.state.movie_genre}
                >
                  <option defaultValue>Select Genre</option>
                  <option value="Comedy">Comedy</option>
                  <option value="saab">Action</option>
                  <option value="Musical">Musical</option>
                  <option value="Drama">Drama</option>
                  <option value="Herror">Horror</option>
                  <option value="Scince">Science</option>
                  <option value="Romance">Romance</option>
                  <option value="Crime">Crime</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Sport">Sport</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="War">War</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Animation">Animation</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Epic">Epic</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="horizontal-group">
              <div className="form-group right">
                <label className="label-title">Choose screening time *</label>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  min="2022-05-07T00:00"
                  max="2024-12-31T00:00"
                  onChange={(e) => this.setState({ time: e.target.value })}
                  value={this.state.time}
                ></input>
              </div>
            </div>

            <div className="horizontal-group">
              <div className="form-group left">
                <label htmlFor="choose-file" className="label-title">
                  Upload Movie Poster
                </label>
                <input
                  name="file"
                  type="file"
                  id="choose-file"
                  size="80"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={this.onImageChange}
                  multiple={false}
                />
              </div>
              <div className="form-group right">
                <label htmlFor="experience" className="label-title">
                  Age minimum *
                </label>
                <input
                  type="number"
                  min="3"
                  max="18"
                  placeholder="3"
                  className="form-input"
                  onChange={(e) => this.setState({ min_age: e.target.value })}
                  value={this.state.min_age}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="label-title">Box office Rating</label>
              <select
                className="form-input"
                id="Rating"
                onChange={(e) => this.setState({ rate: e.target.value })}
                value={this.state.rate}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label-title">Ticket Price SEK *</label>
              <input
                type="text"
                placeholder="Enter the Price of the Ticket"
                className="form-input"
                onChange={(e) =>
                  this.setState({ ticket_price: e.target.value })
                }
                value={this.state.ticket_price}
              />
            </div>
            <div className="form-group">
              <label className="label-title">Number Of Seats </label>
              <input
                type="number"
                className="form-input"
                min="0"
                max="200"
                onChange={(e) => this.setState({ number_of_seats: e.target.value })}
                value={this.state.number_of_seats}
              />
            </div>
            <div className="form-group">
              <label className="label-title">Synopsis</label>
              <textarea
                className="form-input"
                rows="4"
                cols="50"
                id="synopsis"
                onChange={(e) => this.setState({ synopsis: e.target.value })}
                value={this.state.synopsis}
              ></textarea>
            </div>
          </div>

          <div className="form-footer">
            <span>* required</span>
            <button type="submit" className="btn">
              Add Movie
            </button>
          </div>
        </form>
        <Footer/>
      </>
    );
  }
  6;
}

export default AddMovie;
