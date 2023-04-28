const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

/**
 * @async
 * @name makeRequest
 * @description Function to make an API request using fetch.
 * @param {string} method - HTTP method used for the request (GET, POST, PUT, DELETE)
 * @param {string} url - URL of the API.
 * @param {Object|null} data - Data to be sent in a POST or PUT request.
 * @param {Object} headers - Custom headers for each request.
 * @returns {Promise<{ error: boolean, message?: string, data?: any }>} - JSON API's response in JSON format.
 */
module.exports = async function makeRequest({
  method = "GET",
  url,
  data = null,
  headers = {},
}) {
  try {
    // Options.
    const options = {
      method,
      headers: { ...headers, ...defaultHeaders },
      credentials: "include",
    };

    // Set URL.
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    if (data) options.body = JSON.stringify(data);

    // Request.
    const request = await fetch(requestUrl, options);

    // Response.
    const response = await request.json();

    return response;
  } catch (error) {
    console.error(`Error:  ${error.message}`);
    return {
      error: true,
      message: error.message,
    };
  }
};
