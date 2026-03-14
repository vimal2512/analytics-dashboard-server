(function () {

  const analytics = {};

  let trackingId = null;

  const API_URL = "https://analytics-dashboard-server.onrender.com/api/collect";

  function generateVisitorId() {
    return "v_" + Math.random().toString(36).substring(2, 12);
  }

  function getVisitorId() {

    let visitorId = localStorage.getItem("analytics_visitor");

    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem("analytics_visitor", visitorId);
    }

    return visitorId;
  }

  function sendEvent(eventName, data = {}) {

    const payload = {
      trackingId,
      visitorId: getVisitorId(),
      event: eventName,
      url: window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now(),
      ...data
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  analytics.init = function (id) {

    trackingId = id;

    sendEvent("page_view");

  };

  analytics.track = function (eventName, data = {}) {
  sendEvent(eventName, data);
  };

  window.analytics = analytics;

})();