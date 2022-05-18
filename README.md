Discovery-Cinema Website
=========

&nbsp;

Requitements
------------
-   node
-   npm
-   .env, with the following variables:
       -   REACT_APP_CLOUD_NAME
       -   REACT_APP_PRESET_NAME
       -   DB_CONNECTION
       -   MY_PASSWORD
       -   API_TOKEN
       -   CLIENT_TOKEN

&nbsp;

Install dependencies
```sh
npm i
```

&nbsp;
&nbsp;

Back-end
------
&nbsp;
Back-end is deployed and works seperatedly, you can view API-Doc [FROM HERE](https://api-cinema-ticket.herokuapp.com/)

To run back-end locally
```sh
npm run server
```
For live server:
```sh
npm run dev
```
&nbsp;
&nbsp;


Front-end
------

You can view the deployed version  [FROM HERE](https://discovery-cinema.herokuapp.com/tickets)


&nbsp;
&nbsp;


Locally
------
To run both Front-end & Back-end locally, after installing dependencies you should open two bashes.
and run the following commands:

front-end: [Port 3000](http://localhost:3000/)
&nbsp;
```sh
npm start
```
&nbsp;
&nbsp;
back-end: [Port 5000](http://localhost:5000/)
```sh
npm run dev
```
