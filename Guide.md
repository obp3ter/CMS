### HTTPRequests:
|Command        |RelLink                      |Method |Body           |Description  |
|:---           |:---                         |:---:  |:---:          |:---:        |
|getAllAuthors  |/authors                     |GET    |               |             |
|getOneAuthor   |/author/{authorId}           |GET    |               |             |
|addAuthor      |/author                      |POST   |{"name"=value,}|             |
|uploadFile     |/uploadFile                  |POST   |form-data file |             |
|uploadMultiple |/uploadMultipleFiles         |POST   |form-data files |             |
|getFile        |/downloadFile/{fileName:.+}  |GET    |               |             |
