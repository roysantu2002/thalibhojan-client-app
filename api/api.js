import axios from "axios";
//changes made to baseUrl
const baseUrl = process.env.REACT_APP_SERVER_URL;

export default {
  thaliOrder(url = baseUrl + "thaliOrder/") {
    return {
      home: () => axios.get(`${baseUrl}home`),
      createUser: (user) => axios.post(`${baseUrl}api/createUser`, user),

      getThaliOrders: (uid, filter) =>
        axios.post(`${url}getThaliOrders`, filter, {
          headers: {
            authorization: `Basic ${uid}`,
          },
        }),
      getOrders: (uid) =>
        axios.post(`${url}getOrders/${uid}`, uid, {
          headers: {
            authorization: `Basic ${uid}`,
          },
        }),
      // getOrders: uid => axios.post(url + 'getOrders/' + uid),
      createThaliOrder: (uid, createThaliOrder) =>
        axios.post(`${url}createThaliOrder`, createThaliOrder, {
          headers: {
            authorization: `Basic ${uid}`,
          },
        }),
      createFeedback: (createFeedback) =>
        axios.post(`${url}createFeedback`, createFeedback),
      updatePaymentStatus: (uid, orderNumber, updatedRecord) =>
        axios.put(`${url}updatePaymentStatus/${orderNumber}`, updatedRecord, {
          headers: {
            authorization: `Basic ${uid}`,
          },
        }),
      postOrderStatus: (uid, _id, orderStatus) =>
        axios.put(`${url}postOrderStatus/${_id}`, orderStatus, {
          headers: {
            authorization: `Basic ${uid}`,
          },
        }),
      // delete: id => axios.delete(url + id)

      paymentStatus: (uid, orderNumber, paymentStatus) =>
        axios.post(
          `${baseUrl}api/paymentStatus/${orderNumber}`,
          paymentStatus,
          {
            headers: {
              authorization: `Basic ${uid}`,
            },
          }
        ),
    };
  },
};

// const url = "http://localhost:5000/thaliOrder/";
// // const thaliOrderURL = "http://localhost:5000/thaliOrder";
// const feedbackURL = "http://localhost:5000/feedback";

// export const serverStatus = () => {
//   axios.get(url).catch(function (error) {
//     if (error.response) {
//       return error.response;
//     } else if (error.request) {
//       return error.request;
//     } else {
//       return error.message;
//     }
//   });
// };

// console.log(`${url}createThaliOrder`)
// // export const fetchPosts = () => axios.get(url);
// export const getThaliOrders = () => axios.get(url)
// export const getOrders = (uid) => axios.post(`${url}getOrders/${uid}`)
// export const createThaliOrder = (createThaliOrder) => axios.post(`${url}createThaliOrder`, createThaliOrder);
// export const createFeedback = (createFeedback) => axios.post(feedbackURL, createFeedback);
