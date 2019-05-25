## HTTPRequests:
|Command        |RelLink                      |Method |Params                 |Body           |Description  |
|:---           |:---                         |:---:  |:---:                  |:---:          |:---:        |
|getAllAuthors  |/authors                     |GET    ||                      |               |             |
|getOneAuthor   |/authors                    |GET    |id or email|                    |               |             |
|addAuthor      |/authors                     |POST   |email,password,company |               |             |
| | | | | | |
| | | | | | Similarly with reviewers & proposals except filenames|
| | | | | | |
|uploadProposalFiles|/proposals/uploadfile    |POST   |proposalID,whichfile("abstract" or "paper"),file | | |
|uploadFile     |/uploadFile                  |POST   |file                   |               |             |
|uploadMultiple |/uploadMultipleFiles         |POST   |files                  |               |             |
|getFile        |/downloadFile/{fileName}     |GET    |                       |               |             |
|bidOnProposal  |/proposals/bid |POST |proposalID,reviewerID | | |
|refuseProposal  |/proposals/refuse |POST |proposalID,reviewerID | | |
|assignProposal  |/proposals/assign |POST |proposalID,reviewerID | | |
|getDeadline  |/proposals/deadlines |GET   |deadlineName | | |
|setDeadline  |/proposals/deadlines |POST |deadlineName,date | | |