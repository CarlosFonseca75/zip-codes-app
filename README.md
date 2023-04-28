## Introduction.
This is a Next.js application designed for customers to search for plans based on their zip code. In addition, authenticated 
users with a valid Google account can log in to the application to manage plans, zip codes, and prices.

## Features.
* Create, Read, Update and Delete plans.
* Create, Read, Update and Delete zip codes.
* Create, Read, Update and Delete prices.
* User authentication using Google accounts. Authenticated users can create, read, update, and delete plans, zip codes, and prices.

## Technologies Used.
* **Next.js:** A React framework for building server-side rendered and statically generated web applications.
* **React:** A JavaScript library for building user interfaces.
* **JavaScript:** A programming language commonly used for web development.
* **HTML:** The standard markup language used to create web pages and applications.
* **SCSS:** A CSS preprocessor that extends the functionality of CSS with variables, mixins, functions, and more.

## How to use.
Once you have logged into the application, you will be able to manage plans, zip codes, and prices. These prices will allow our customers 
to check for available prices near their location (zip code). If you want to add a new price in a different location, follow these steps:
* **1:** Log into the application using your Google account. Note that in a real-life scenario, only admin accounts or Google accounts 
within a specific domain would be granted access. However, for testing purposes, any Google account can be used to log in.
* **2:** Create a new zip code with a city and state associated with it.
* **3:** Go to the prices page and add the new price by selecting the zip code you just created and the plan that you want to use.
* **4:** You can choose between the different available plans or add a new one if you wish.
* **5:** Once you have created the price, you need to log out and look for the prices using the new zip code on the main page.

The default configuration includes some example prices for the zip code **37207**.

## Getting Started.
To run the application in your browser, run the following commands.

```bash
npm install

npm run build

npm run start
```

Alternatively, you can run the application in development mode running the following command:

```bash
npm run dev
```

Additionally, be sure that you have added the **.env** file necessary to run this application.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production application.
You can see the production version of the application by going to the next link: [https://zip-codes-app.vercel.app](https://zip-codes-app.vercel.app)