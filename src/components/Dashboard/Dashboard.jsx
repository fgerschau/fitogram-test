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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    getProviders().then((request = {}) => {
      let sanitizedData = request.data;
      if (sanitizedData && sanitizedData.length) {
        sanitizedData = sanitizedData.slice(0, 10);
        sanitizedData = sanitizedData.map((event) => {
          const sanitizedEvent = { ...event };
          sanitizedEvent.sanitizedStartDateTime = moment(sanitizedEvent.startDateTime).format('LL');
          sanitizedEvent.sanitizedStartTime = moment(event.startDateTime).format('LT');
          sanitizedEvent.sanitizedEndTime = moment(event.endDateTime).format('LT');
          const trainer = event.trainers.length ? event.trainers[0] : null;
          sanitizedEvent.trainer = trainer ? trainer.name : 'Unknown trainer';
          sanitizedEvent.description = event.descriptions && event.descriptions.length ? `${event.descriptions[0].text.slice(0, 40)} ...` : '';

          return sanitizedEvent;
        });

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
                      <i className="fa fa-clock-o fa-3x" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.sanitizedStartDateTime}
                      <br />
                      {`${event.sanitizedStartTime} - ${event.sanitizedEndTime}`}
                    </div>
                  </div>
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-map-marker fa-3x" />
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
                      <i className="fa fa-info fa-3x" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.description}
                    </div>
                  </div>
                  <div className={`row ${styles.featureRow}`}>
                    <div className="col-md-3 col-sm-3">
                      <i className="fa fa-user fa-3x" />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      {event.trainer}
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
