import React from 'react';
import http from 'axios';

import Header from "./Header.jsx";
import Search from "./Search.jsx";
import EventsList from "./EventsList.jsx";
import Pagination from './Pagination.jsx';
import { paginate } from "../utils/paginate";

const server = `http://localhost:3000`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      pageCounter: 3,
      perPage: 10,
      currentPage: 1,
      searchTerm: '',
      totalCount: 0
    }
    this.getEvents = this.getEvents.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getEvents(this.state.searchTerm);
  }

  getEvents(searchTerm) {
    const { currentPage, perPage } = this.state;
    http.get(`${server}/events?q=${searchTerm}&_page=${currentPage}&_limit=${perPage}`)
      .then(response => {
        const events = response.data;
        const totalCount = response.headers['x-total-count'];
        const pageCount = totalCount / perPage;
        return { events, pageCount, totalCount }
      })
      .then(({ events, pageCount, totalCount }) => {
        console.log('Successfully able to get a response from the json-server', events);
        this.setState({
          events,
          pageCounter: pageCount,
          totalCount
        }, () => {
          console.log('Current page: ', currentPage);
        });
      })
      .catch(err => {
        console.error('Error getting response from the json-server');
      })
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handlePageChange(page) {
    this.setState({
      currentPage: page.selected + 1
    }, () => {
      console.log(this.state.currentPage, this.state.searchTerm, 'Handle page change')
      this.getEvents(this.state.searchTerm);
    });
  }

  render() {
    const { searchTerm, pageCounter, currentPage, events: allEvents, totalCount } = this.state;
    const { length: count } = this.state.events;
    /* const events = paginate(allEvents, currentPage, pageSize); */

    return (
      <React.Fragment>
        <Header />
        <Search
          searchTerm={searchTerm}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.getEvents}
          />
        <Pagination
          pageCounter={pageCounter}
          currentPage={currentPage}
          handlePageChange={this.handlePageChange}
          />
        <EventsList
          eventsCount={count}
          events={allEvents}
          totalCount={totalCount}
          />
      </React.Fragment>
    )
  }

};

export default App;

/*
<Pagination
  eventsCount={count}
  pageCounter={pageCounter}
  currentPage={currentPage}
  onPageChange={this.handlePageChange}
  />
*/