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
      params: {
        customer_id: Auth.getID(),
      },
      Headers: {
        api_key: localStorage.getItem('auth-token')
      }
    }).then(er => {
      console.log(er);
    }).catch(err => {
      console.log(err);
    })
    console.log(response);
    // this.setState({
    //   data: response.data.body.slice(
    //     this.state.offset,
    //     this.state.offset + this.state.perPage,
    //     (this.state.currentPage = 1)
    //   ),
    //   response: response.data.body,
    // });
  };

  deleteUser = async (user_id, name) => {
    if (window.confirm(`Do you want to delete the user ${name} ?`)) {
      await api.delete("/delete_user_account", {
        data: { _id: user_id },
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
                  <th className="table-url hide "></th>
                  <th className="table-name">Movie</th>
                  <th className="table-email">Time</th>
                  <th className="table-phone re-hide">Phone number</th>
                  <th className="table-nTicket hide">Number of Tickets</th>
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
                      <td className="table-email">{item.email}</td>
                      {/* <td className="table-phone re-hide">
                        {item.phonenumber}
                      </td> */}
                      {/* <td className="table-nTicket hide">{item.n_tickets}</td> */}
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
        <Footer />
      </>
    );
  }
}

export default TicketTable;
