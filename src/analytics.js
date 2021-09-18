import ReactGA from "react-ga"
 
const TRACKING_ID = "UA-199837576-3"
// const TRACKING_ID = "UA-000000000-0"
// reference article: https://raptis.wtf/blog/custom-hook-to-connect-google-analytics-in-react/
 
function init() {
  // Enable debug mode on the local development environment
  // const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  const isDev = false
  ReactGA.initialize(TRACKING_ID, { debug: isDev })
}
 
function sendEvent(payload) {
  ReactGA.event(payload)
}
 
function sendPageview(path) {
  ReactGA.set({ page: path })
  ReactGA.pageview(path)
}
 
export default {
  init,
  sendEvent,
  sendPageview,
}