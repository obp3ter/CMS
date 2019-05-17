## HTTPRequests:
|Command        |RelLink                      |Method |Params                 |Body           |Description  |
|:---           |:---                         |:---:  |:---:                  |:---:          |:---:        |
|getAllAuthors  |/authors                     |GET    ||                      |               |             |
|getOneAuthor   |/authors                    |GET    |id|                    |               |             |
|addAuthor      |/authors                     |POST   |email,password,company |               |             |
| | | | | | |
| | | | | | Similarly with proposals except filenames|
| | | | | | |
|uploadProposalFiles|/proposals/uploadfile    |POST   |proposalID,whichfile("abstract" or "paper"),file | | |
|uploadFile     |/uploadFile                  |POST   |file                   |               |             |
|uploadMultiple |/uploadMultipleFiles         |POST   |files                  |               |             |
|getFile        |/downloadFile/{fileName}     |GET    |                       |               |             |
