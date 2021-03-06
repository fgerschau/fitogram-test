import React, { Fragment, Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import moment from 'moment';
import { API_URL, domain } from 'config';
import styles from './Dashboard.css';


const getProviders = async () => {
  const fromDate = '2017-01-10';
  const options = {
    method: 'GET',
    url: `${API_URL}/providers/${domain}/events/public?from=${fromDate}`,
  };

  let request;
  try {
    request = await axios(options);
  } catch (e) {
    toastr.error(`Something went wrong... \n ${e.message}`);
  }

  return request;
};

const sanitizeData = (data = []) =>
  data.map((event) => {
    const sanitizedEvent = { ...event };
    sanitizedEvent.sanitizedStartDateTime = moment(sanitizedEvent.startDateTime).format('dddd, Do MMMM YYYY');
    sanitizedEvent.sanitizedStartTime = moment(event.startDateTime).format('hh:mm');
    sanitizedEvent.sanitizedEndTime = moment(event.endDateTime).format('hh:mm');
    const trainer = event.trainers.length ? event.trainers[0] : null;
    sanitizedEvent.trainer = trainer ? trainer.name : 'Unknown trainer';
    sanitizedEvent.description = event.descriptions && event.descriptions.length ? event.descriptions[0].text : '';
    sanitizedEvent.shortDescription = `${sanitizedEvent.description.slice(0, 100)} ...`;
    sanitizedEvent.alertnativeName = `${sanitizedEvent.description.slice(0, 30)} ...`;

    return sanitizedEvent;
  });

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    getProviders().then((request = {}) => {
      let { data } = request;
      if (data && data.length) {
        data = data.slice(0, 10);
        const sanitizedData = sanitizeData(data);

        this.setState({ events: sanitizedData });
      }
    });
  }

  render() {
    return (
      <Fragment>
        <h1 className="text-center m-4"> Fitogram App </h1>
        <div className="container">
          {
            this.state.events.map(event => (
              <div className={`row ${styles.row}`} key={event.id}>
                <div className="col-md-6">
                  <div className={styles.eventNameBackground} style={{ background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${event.eventGroup.imageUrl}) no-repeat center top` }}>
                    <h3 className={styles.eventName}> {event.name} </h3>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-clock-o" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.sanitizedStartDateTime}
                      <br />
                      {`${event.sanitizedStartTime} - ${event.sanitizedEndTime}`}
                    </div>
                  </div>
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.location.name}
                      <br />
                      {event.location.city}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-info" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.alertnativeName}
                    </div>
                  </div>
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-user" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.trainer}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 offset-md-6">
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-12">
                      {event.shortDescription}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
