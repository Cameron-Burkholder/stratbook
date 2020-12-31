/* client/components/api/PushNotificationsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

const vapidPublicKey = "BKe8OGW20LmKc386UPPLHqXoFr-hWJQL6GeI83RNt1vPTTdZgau_H_KGc96zzV0h-U1xuN72WzSAEVLEyj07gLY";
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



class PushNotificationsAPI extends React.Component {
  constructor(props) {
    super(props);

    this.subscribePush = this.subscribePush.bind(this);
    this.unsubscribePush = this.unsubscribePush.bind(this);

    this.state = {
      loading: false
    }
  }
  subscribePush() {
    const component = this;
    navigator.serviceWorker.ready.then((registration) => {
      if (!registration.pushManager) {
        window.alert("Push Notifications Unsupported.");
        return;
      }

      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      }).then((subscription) => {
        component.setState({
          loading: true
        });
        axios.defaults.headers.common["Authorization"] = component.props.getAuthToken();
        axios.post("/api/push/register", {
          subscription: subscription
        }).then((response) => {
          switch (response.data.status) {
            case "SUCCESS":
              component.setState({
                loading: false,
              });
              break;
              component.props.updateAuthToken();
              component.props.alert("You have subscribed to push notifications on this device.", "SUCCESS");
            default:
              component.setState({
                loading: false,
              });
              component.props.alert(response.data.message, response.data.status);
              break;
          }
        }).catch((error) => {
          console.log(error);
          component.props.alert("An error has occurred while attempting to get push notifications.", "ERROR");
        });
      })
    })
  }
  unsubscribePush() {
    const component = this;
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((subscription) => {
        if (!subscription) {
          return;
        }

        subscription.unsubscribe().then(() => {
          component.setState({
            loading: true
          });
          axios.defaults.headers.common["Authorization"] = component.props.getAuthToken();
          axios.delete("/api/push/unregister").then((response) => {
            switch (response.data.status) {
              case "SUCCESS":
                component.setState({
                  loading: false,
                });
                break;
                component.props.updateAuthToken();
                component.props.alert("You have unsubscribed from push notifications on this device.", "SUCCESS");
              default:
                component.setState({
                  loading: false,
                });
                component.props.alert(response.data.message, response.data.status);
                break;
            }
          }).catch((error) => {
            console.log(error);
            component.props.alert("An error has occurred while attempting to stop push notifications.", "ERROR");
          });
        })
      })
    })
  }
  render() {
    return (
      <div id="PushNotificationsAPI">
        { this.state.loading ? <Loading/> : (
          <div>
            { this.props.subscription ? (
              <button className="button--danger" onClick={this.unsubscribePush}>Don't Get Notifications</button>
            ) : (
              <button onClick={this.subscribePush}>Get Notifications</button>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default PushNotificationsAPI;
