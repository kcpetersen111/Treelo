# API documentation

# Board Resources

## post "/users"
    will create a new user
    - Body arguments
        - 'username' is the users email and is required
        - 'name' is the name of the user and is not required
        - 'password' is the users password and is required
    - Success code
        - 201
    - Error code
        - 400 'username' or 'password' is undefined
        - 500 any other error

## post "/session"
    will log a user in
    - Body arguments
        - 'username' is the users email address
        - 'password' is the users password
    - Success code
        - 201
    - Error code
        - 401 failed to login
        - 500 any other error
    - Return value
        - a message saying success

## get "/session"
    will see if a user is logged in
    - Body arguments
        - N/A
    - Success code
        - 200
    - Error code
        - 401 not logged in
        - 500 any other error
    - Returned value
        - a message saying authed

## get "/board"
    will return all of the boards that a user created

    - Body arguments
        - N/A
    - Success code
        - 200
    - Error code
        - 401 == User unauthenticated
        - 500 == Any other error
    - Return value
        - Will return an array of boards

## put "board/:boardId"
    will update the board of given id

    - Body arguments
        - 'name' is the name of the board (optional)
        - 'description' is the description of the board (optional)
    - Success code
        - 200
    - Error code
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - Will return the updated board after the update

## delete "board/:id"
    will delete a board and all sub elements on the board

    - Body arguments
        - N/A
    - Success code
        - 200
    - Error code
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - the board that was deleted
## post "board"
    will create a board

    - Body arguments
        - 'name' is the name of the board
        - 'description' is the description of the board
    - Success code
        - 201
    - Error code
        - 401 == User unauthenticated
        - 500 == Any other issue
    - Return value
        - the created board
# Container resources

## get "container/board/:boardId"
    Gets all of the containers from a board

    -Body arguments
        - N/A
    - Success code
        - 201
    - Error code
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value 
        - an array of containers that belong to that board

## get "container/:containerId"
    gets a container by by its id

    - Body arguments
        - N/A
    - Success code
        - 200
    - Error code
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - a container

## post "board/:boardId/container"
    posts a new container on a board

    - Body arguments
        - 'containerName' == the name of the container
        - 'description' == a description of the container being made
    - Success code
        - 201
    - Error codes
        - 401 == User unauthenticated
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - the board the container was added to 


# Card resources

## get "card/:cardId"
    gets a card by id
    
    - Body arguments 
        - N/A
    - Success code
        - 200
    - Error codes
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue

## get "board/:boardId/container/:containerId/card"
    gets all of the cards on a container

    - Body arguments 
        - N/A
    - Success code
        - 200
    - Error codes
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue

## post "board/:boardId/container/:containerId/card"
    will create a card on a board and container

    - Body arguments 
        - 'name' == the name on the card
        - 'date' == the date finished (optional)
        - 'category' == what category is this card
    - Success code
        - 201
    - Error codes
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - the container that was edited

## put "board/:boardId/container/:containerId/card/:cardId"
    will edit a card on a board and container

    - Body arguments 
        - 'name' == the name on the card (optional)
        - 'date' == the date finished (optional)
        - 'category' == what category is this card (optional)
    - Success code
        - 200
    - Error codes
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue

## delete "board/:boardId/container/:containerId/card/:cardId"
    will delete a card 

    - Body arguments 
        - N/A
    - Success code
        - 200
    - Error codes
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue