import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Event from "./components/Event";


function App() {

  const [events, setEvents] = useState([]);

  const calendarID = "wakeup.mau@gmail.com";
  const apiKey = "AIzaSyAWOSQ00eTh9fplH6yhsXDtd7vzDtOHv4A";
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

  const getEvents = (calendarID, apiKey) => {
    function initiate() {
      gapi.client.init({
        apiKey: apiKey
      })

        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          })
        })

        .then((response) => {
          let events = response.results.items;
          return events;
        },
          function (err) {
            return [false, err];
          }
        );
    }

    gapi.load("client", initiate);

  };

  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
  }, []);

  return (
    <div className="App py-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <ul>
        {
          events?.map((event) => (
            <li key={event.id} className="flex justify-center">
              <Event description={event.summary} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
