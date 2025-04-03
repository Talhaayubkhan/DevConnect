## Auth Router - authRouter

- POST /signup
- POST /login
- POST /logout

## User Profile - profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## User - ConnectionRequestRouter

- POST /connection/send/interested/:userId
- POST /connection/review/accepted/:requestId
- POST /connection/send/ignored/:userId
- POST /connection/review/rejected/:requestId

## user Connection - userConnectionRouter

- GET /user/connections
- GET /requests/received
- GET /feed
