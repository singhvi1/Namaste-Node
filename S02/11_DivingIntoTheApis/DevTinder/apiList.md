# DevTinder APIs

### authRouter

    -post /signup         -D
    -post /login             -D
    -post /logout              -D

### Profile Router

    -GET /profile/view       -D 
    -PATCH /profile/edit        -D
    -PATCH /profile/password        -D

### connectionRequestRouter

    -POST /request/send/interested/:userId  
    -POST /request/send/ignored/:userrId
    
    -POST /request/review/accepted/:requestId
    -POST /request/review/rejected/:requestId

    or maybe Dyanmic as /request/send/:status/:toUserId

    
### userRoute

    -GET /user/connections
    -GET /user/requests
    -GET /user/feed  
