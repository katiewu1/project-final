# Final Project - OpenMe

Sprint six (sadly the last sprint), it's time for our final projects. We're going to build one bigger application during these next four weeks (approx 20 hours/week).

The Technical Requirements are:

- Frontend in React (Redux optional)
- Backend in Node.js
- MongoDB database
- Navigation using React Router
- Should work in Chrome, Firefox & Safari
- Be responsive and work well on mobile, tablet and phone

I've decided to do this project on my own.

The application is called OpenMe and it generate customize eMessage/eCard to a recipient.

## The problem

Tech stack I've used are:

- BE: node.js, Express, Nodemailer, Mongoose, MongoDB, Heroku \
- FE: React, React Router, React Redux, Redux Toolkit, Chakra UI, Netlify

I decided to take on a few new challenges and played a bit with Nodemailer and used Chakra UI.
It was also a challenge to save the time in the same format (12:00 UTC) when picking a date with a datepicker (and also when you are editing).
The route where we can see the OpenMe messages are protected. Only the owner of the collection can view the message, or if the current date and time matched the picked date. The dates after the picked date are also visible and open until the owner delete the collection.

Example for improvement:

- Add a feature to pick the current time zone so we can open the message as soon it hit midnight. Right now the messages can only be opened after 12:00 UTC.
- Remove the PATCH request to update the collection, property hasSentEmail. Can skip the PATCH request and do it in the BE instead.
- Add a toolbar where the user can pick font style, font size, color, change background color, pick between a few "envelope" pictures and so on.

## View it live

FE (Netlify): https://openme-team.netlify.app/ \
BE/API (Heroku): https://openme-team.herokuapp.com/
