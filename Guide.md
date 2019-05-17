## HTTPRequests:
|Command        |RelLink                      |Method |Params                 |Body           |Description  |
|:---           |:---                         |:---:  |:---:                  |:---:          |:---:        |
|getAllAuthors  |/authors                     |GET    ||                      |               |             |
|getOneAuthor   |/authors/                    |GET    |id|                    |               |             |
|addAuthor      |/authors                     |POST   |email,password,company |               |             |
|uploadFile     |/uploadFile                  |POST   |file                   |               |             |
|uploadMultiple |/uploadMultipleFiles         |POST   |files                  |               |             |
|getFile        |/downloadFile/{fileName}     |GET    |                       |               |             |
