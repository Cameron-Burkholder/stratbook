/* client/components/api/PushNotificationsAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";
import { PUSH_SUBSCRIBE } from "../../messages/messages.js";
import { ERROR_PUSH } from "../../messages/errors.js";
import config from "dotenv";
config.config();
const convertedVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;

class PushNotificationsAPI extends React.Component {
  constructor(props) {
    super(props);

    this.urlBase64ToUint8Array = this.urlBase64ToUint8Array.bind(this);
    this.sendSubscription = this.sendSubscription.bind(this);
    this.subscribeUser = this.subscribeUser.bind(this);

    this.state = {
      loading: false
    }
  }
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  sendSubscription(subscription) {
    const component = this;
    this.setState({
      loading: true
    });

    axios.defaults.headers.common["Authorization"] = component.props.getAuthToken();
    axios.post("/api/push/subscribe", {
      subscription: JSON.stringify(subscription)
    }).then((response) => {
      switch (response.data.status) {
        case PUSH_SUBSCRIBE.status:
          component.setState({
            loading: false
          });
          component.props.alert(PUSH_SUBSCRIBE.message, "SUCCESS");
          break;
        default:
          component.setState({
            loading: false
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert(ERROR_PUSH.message, ERROR_PUSH.status);
    });
  }
  subscribeUser() {
    const component = this;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
          return component.props.alert("Push manager unavailable.");
        }

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            registration.pushManager.getSubscription().then(function(existedSubscription) {
              if (existedSubscription === null) {
                registration.pushManager.subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                }).then(function(newSubscription) {
                  component.sendSubscription(newSubscription)
                }).catch(function(e) {
                  if (Notification.permission !== 'granted') {
                    component.props.alert("Notification permissions are required to receive push notifications.", "ERROR");
                  } else {
                    console.log(e);
                    component.props.alert("An error occurred while attempting to subscribe to push notifications.", "ERROR");
                  }
                })
              } else {
                component.sendSubscription(existedSubscription);
              }
            })
          }
        })

      })
        .catch(function(e) {
          console.error('An error ocurred during Service Worker registration.', e);
          component.props.alert("An error occurred while attempting to register for push notifications.", "ERROR");
        })
    }
  }
  render() {
    return (
      <div id="PushNotificationsAPI">
        { this.state.loading ? <Loading/> : (
          <div>
            <button onClick={this.subscribeUser}>Get Push Notifications</button>
          </div>
        )}
      </div>
    )
  }
}

export default PushNotificationsAPI;
