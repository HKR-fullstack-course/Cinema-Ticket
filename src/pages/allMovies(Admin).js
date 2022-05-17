import "../style/table.css";

import React from "react";
import { Navigate } from "react-router-dom";

import api from "../api/api";
import Auth from "../_helper/Auth";
import Footer from "../components/Footer";

class Users extends React.Component {
  state = {
    offset: 0,
    data: [],
    perPage: 20, // change this for table-pagination
    currentPage: 0,
    response: [],
  };

  deleteMovie = async (_id, name) => {
    if (window.confirm(`Do you want to delete the user ${name} ?`)) {
      await api.delete("/delete_movie", {
        data: { _id },
      });

      // this.forceUpdate()  // <= this method doesn't work for a reason!
      window.location.reload();
    }
  };

  componentDidMount() {
    // this.sendRequest();
  }

  componentWillUnmount() {
    this.sendRequest();
  }

  sendRequest = async () => {
    const response = await api.get("all_movies_table", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    this.setState({
      data: response.data.body.slice(
        this.state.offset,
        this.state.offset + this.state.perPage,
        (this.state.currentPage = 1)
      ),
      response: response.data.body,
    });
  };

  rightClick = () => {
    if (this.state.offset + this.state.perPage >= this.state.response.length)
      return;
    this.setState({
      data: this.state.response.slice(
        (this.state.offset += this.state.perPage),
        this.state.offset + this.state.perPage,
        this.state.currentPage++
      ),
    });
  };

  leftClick = () => {
    if (this.state.offset === 0) return;
    this.setState({
      data: this.state.response.slice(
        (this.state.offset -= this.state.perPage),
        this.state.offset + this.state.perPage
      ),
    });
  };

  render() {
    return (
      <>
        <div className="table-container">
          {!Auth.isAuthenticated || !Auth.isAdmin ? (
            <Navigate replace to="/404"></Navigate>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th className="table-url hide "></th>
                  <th className="table-name">Name</th>
                  <th className="table-time re-hide">Show Time</th>
                  <th className="table-price">Ticket Price</th>
                  <th className="table-nTicket hide">Available Tickets</th>
                  <th className="table-btn"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="table-url hide">
                        <img
                          className="img"
                          src={item.url}
                          alt={item.name + " url"}
                        />
                      </td>
                      <td className="table-name">{item.name}</td>
                      <td className="table-phone re-hide">
                        {item.show_time.split("T")[0]}{" "}
                        {item.show_time.split("T")[1]}
                      </td>
                      <td className="table-email table-price">
                        {item.ticket_price}
                      </td>
                      <td className="table-nTicket hide">
                        {item.number_of_seats}
                      </td>
                      <th className="table-btn">
                        <button
                          className="delete-btn"
                          onClick={() => {
                            this.deleteMovie(item._id, item.name);
                          }}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {this.state.response.length > this.state.perPage ? (
          <div className="arrow-container">
            <button className="delete-btn arraow" onClick={this.leftClick}>
              {"<<"}
            </button>
            <button className="delete-btn arraow" onClick={this.rightClick}>
              {">>"}
            </button>
          </div>
        ) : (
          <></>
        )}
        <Footer />
      </>
    );
  }
}

export default Users;
