self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("New Notification", data);
  const options = {
    body: data.body
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
