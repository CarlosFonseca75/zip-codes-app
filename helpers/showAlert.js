// Dependencies.
import { Store } from "react-notifications-component";

/**
 * @function
 * @name showAlert
 * @description Function to show a new notification.
 * @param {string} title - Title of the alert.
 * @param {string} message - Message of the alert.
 * @param {string} type - Alert type e.g. 'success'.
 */
module.exports = function showAlert({ title, message, type = "success" }) {
  Store.addNotification({
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 8000,
      onScreen: true,
    },
    title,
    message,
    type,
  });
};
