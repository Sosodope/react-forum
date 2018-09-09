import React, { Component } from "react";
import "./App.css";
import postsData from "./posts.json";
import authorsData from "./authors.json";
import moment from "moment";
import Pagination from "react-paginating";

const limit = 8;
const pageCount = 8;
const total = postsData.length * limit;

class App extends Component {
  state = {
    posts: postsData,
    authors: authorsData,
    currentPage: 1
  };
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  render() {
    const { currentPage, posts } = this.state;
    return (
      <div className="container">
        <div className="title">
          <h1>MAQE Forums</h1>
          <h3>Subtitle</h3>
          <h5>Posts</h5>
        </div>
        <ul className="post-content">
          {posts[currentPage - 1].map(post => {
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
        <Pagination
          total={total}
          limit={limit}
          pageCount={pageCount}
          currentPage={currentPage}
        >
          {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                Previous
              </button>

              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {"<"}
                </button>
              )}

              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: "#fdce09" };
                }
                return (
                  <button
                    key={page}
                    style={activePage}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}

              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {">"}
                </button>
              )}

              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                Next
              </button>
            </div>
          )}
        </Pagination>
      </div>
    );
  }
}

export default App;
