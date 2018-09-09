import React, { Component } from "react";
import "./App.css";
import postsData from "./posts.json";
import authorsData from "./authors.json";
import moment from "moment";
import "bulma/css/bulma.css";

class App extends Component {
  state = {
    posts: postsData,
    authors: authorsData
  };

  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>MAQE Forums</h1>
          <h3>Subtitle</h3>
          <h5>Posts</h5>
        </div>
        <ul className="post-content">
          {this.state.posts.map(post => {
            return (
              <div key={post.id} className="post">
                <div className="post-image">
                  <img src={post.image_url} alt={post.title} />
                </div>
                <div className="post-details">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                  <p className="post-date">
                    <i class="far fa-clock" />
                    <span className="post-date-time">
                      {moment(post.created_at).fromNow()}
                    </span>
                  </p>
                </div>
                <div className="author-info">
                  <img src={authorsData[post.author_id - 1].avatar_url} />
                  <p className="author-name">
                    {authorsData[post.author_id - 1].name}
                  </p>
                  <p>{authorsData[post.author_id - 1].role}</p>
                  <p className="author-place">
                    <i class="fas fa-map-marker-alt" />
                    <span className="author-location">
                      {authorsData[post.author_id - 1].place}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </ul>
        <nav>
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link is-current"
                aria-label="Page 1"
                aria-current="page"
              >
                1
              </a>
            </li>
            <li>
              <a class="pagination-link" aria-label="Goto page 2">
                2
              </a>
            </li>
            <li>
              <a class="pagination-link" aria-label="Goto page 3">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
