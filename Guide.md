## HTTPRequests:
|Command        |RelLink                      |Method |Params                 |Body           |Description  |
|:---           |:---                         |:---:  |:---:                  |:---:          |:---:        |
|getAllAuthors  |/authors                     |GET    ||                      |               |             |
|getOneAuthor   |/authors/                    |GET    |id|                    |               |             |
|addAuthor      |/authors                     |POST   |email,password,company |               |             |
|uploadFile     |/uploadFile                  |POST   |                       |form-data file |             |
|uploadMultiple |/uploadMultipleFiles         |POST   |                       |form-data files|             |
|getFile        |/downloadFile/{fileName}     |GET    |                       |               |             |
