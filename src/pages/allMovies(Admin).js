import "../style/table.css";

import React from "react";
import { Navigate } from "react-router-dom";

import api from "../api/api";
import Auth from "../_helper/Auth";

class Users extends React.Component {
  state = {
    offset: 0,
    data: [],
    perPage: 20, // change this for table-pagination
    currentPage: 0,
    response: [],
  };

  deleteUser = (user_id, name) => {
    if (window.confirm(`Do you want to delete the movie ${name} ?`)) {
        console.log(user_id);
    }
  };

  componentDidMount() {
    // this.sendRequest();
  }

  componentWillUnmount() {
    this.sendRequest();
  }

  sendRequest = async () => {
    const response = await api.get("all_movies_table");

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
                        <img className="img" src={item.url} />
                      </td>
                      <td className="table-name">{item.name}</td>
                      <td className="table-phone re-hide">
                        {item.show_time}
                      </td>
                      <td className="table-email table-price">{item.ticket_price}</td>
                      <td className="table-nTicket hide">{item.age_range}</td>
                      <th className="table-btn">
                        <button
                          className="delete-btn"
                          onClick={() => {
                            this.deleteUser(item._id, item.name);
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
      </>
    );
  }
}

export default Users;
