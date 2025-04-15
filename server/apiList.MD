## Auth Router - authRouter

- POST /signup
- POST /login
- POST /logout

## User Profile - profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## User - ConnectionRequestRouter

- POST /connection/send/:status/:userId
- POST /connection/review/:status/:userId

## user Connection - userConnectionRouter

- GET /user/connections
- GET /requests/received
- GET /feed
