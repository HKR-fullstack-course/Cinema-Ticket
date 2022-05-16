import "../style/table.css";

import React from "react";
import { Navigate } from "react-router-dom";

import Auth from "../_helper/Auth";
import api from "../api/api";
import Footer from "../components/Footer";

class TicketTable extends React.Component {
  state = {
    offset: 0,
    data: [],
    perPage: 15, // change this for table-pagination
    currentPage: 0,
    response: [],
    deleted: false,
  };

  componentDidMount = () => {
    this.sendRequest();
  };

  sendRequest = async () => {
    const response = await api.get("/ticket/user_tickets", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      params: {
        customer_id: Auth.getID(),
      },
    });

    const uniqueSet = [
      ...new Map(response.data.body.map((item) => [item.name.trim(), item])).values(),
    ];


    this.setState({
      data: uniqueSet.slice(
        this.state.offset,
        this.state.offset + this.state.perPage,
        (this.state.currentPage = 1)
      ),
      response: uniqueSet,
    });
  };

  deleteTicket = async (ticket_id, movie_id) => {
    if (window.confirm(`Do you want to delete the ticket ?`)) {
      await api.delete("/ticket/delete_ticket", {
        data: {
          ticket_id,
          movie_id,
          customer_id: Auth.getID(),
        },
        params: {
          api_key: localStorage.getItem("auth-token"),
        },
        headers: {
          // api_key: localStorage.getItem('auth-token')
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      // forceUpdate()   <= this method doesn't work for a reason!
      window.location.reload();
    }
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

  returnedRunder() {
    if (!(Auth.isAuthenticated && Auth.isUser)) {
      return <Navigate replace to="/404"></Navigate>;
    } else if (!this.state.data.length) {
      return <div>NOT</div>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <>
        <div className="table-container">
          {!Auth.isAuthenticated || !Auth.isUser ? (
            <Navigate replace to="/404"></Navigate>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th className="table-url hide url "></th>
                  <th className="table-name label-name">Movie</th>
                  <th className="table-email">Screening Time</th>
                  <th className="table-phone re-hide">Ticket Price</th>
                  <th className="table-btn mit">Delete</th>
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
                      <td className="table-email">
                        {item.screening.split("T")[0]}{" "}
                        {item.screening.split("T")[1]}
                      </td>
                      <td className="table-phone re-hide">
                        <span className="mit">{item.price}</span>
                      </td>
                      <th className="table-btn">
                        <button
                          className="delete-btn"
                          onClick={() => {
                            this.deleteTicket(item.ticket_id, item.movie_id);
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

export default TicketTable;
