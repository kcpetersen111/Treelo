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
        -The field to update (any fields that are left null or not passed in will be disregarded)  
    - Success code
        - 200
    - Error code
        - 401 == User unauthenticated
        - 403 == User unauthorized
        - 404 == Page not found
        - 500 == Any other issue
    - Return value
        - Will return the updated board after the update
## delete 