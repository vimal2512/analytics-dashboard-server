(function () {

  const analytics = {};

  let trackingId = null;

  const API_URL = "https://analytics-dashboard-server.onrender.com/api/collect-batch";

  const SOCKET_URL = "https://analytics-dashboard-server.onrender.com";

  const eventQueue = [];

  /*
  Create socket connection
  */

  const socket = window.io ? io(SOCKET_URL) : null;

  if (socket) {
    console.log("Analytics socket connected");
  }

  function generateVisitorId() {
    return "v_" + Math.random().toString(36).substring(2, 12);
  }

  function generateSessionId() {
    return "s_" + Math.random().toString(36).substring(2, 12);
  }

  function getVisitorId() {

    let visitorId = localStorage.getItem("analytics_visitor");

    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem("analytics_visitor", visitorId);
    }

    return visitorId;

  }

  function getSessionId() {

    let sessionId = sessionStorage.getItem("analytics_session");

    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem("analytics_session", sessionId);
    }

    return sessionId;

  }

  function queueEvent(eventName, data = {}) {

    const payload = {
      trackingId,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      event: eventName,
      url: window.location.pathname,
      timestamp: Date.now(),
      ...data
    };

    eventQueue.push(payload);

  }

  function flushEvents() {

    if (eventQueue.length === 0) return;

    const events = [...eventQueue];

    eventQueue.length = 0;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ events })
    }).catch(() => {});

  }

  analytics.init = function (id) {

    trackingId = id;

    queueEvent("page_view");

    /*
    Notify backend user is online
    */

    if (socket) {

      socket.emit("user-online", {
        trackingId,
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        url: window.location.pathname
      });

    }

  };

  window.analytics = analytics;

  /*
  Send batched events every 5 seconds
  */

  setInterval(flushEvents, 5000);

})();