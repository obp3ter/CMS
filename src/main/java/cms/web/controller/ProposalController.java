package cms.web.controller;

import cms.core.model.Proposal;
import cms.core.model.Reviewer;
import cms.core.services.FileStorageService;
import cms.core.services.ProposalService;
import cms.web.converter.ProposalConverter;
import cms.web.converter.ReviewerConverter;
import cms.web.dto.ProposalDto;
import cms.web.dto.ReviewerDto;
import cms.web.dto.StringDto;
import cms.web.payload.UploadFileResponse;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProposalController {
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private ProposalService proposalService;
    @Autowired
    private ProposalConverter proposalConverter;
    @Autowired
    private ReviewerConverter  reviewerConverter;

    @Value("${spring.datasource.url}")
    private String dsURL;
    @Value("${spring.datasource.username}")
    private String dsUser;
    @Value("${spring.datasource.password}")
    private String dsPass;

    @PostMapping("/proposals/uploadfile")
    public List<UploadFileResponse> uploadAbstract( @RequestParam("proposalID") Integer aID,
                                                    @RequestParam("whichFile") String which,
                                                    @RequestParam("file") MultipartFile file
    ) throws Exception
    {



        List<Proposal> proposals = proposalService.getAllProposals();

        Proposal proposal=new Proposal();
        proposals.stream().forEach(s->{
            if(s.getId()==aID)
            {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
                proposal.setReviewers(s.getReviewers());
                proposal.setRefusers(s.getRefusers());
            }
        });

        var result = new ArrayList<UploadFileResponse>();

        if(which.equals("abstract"))
            proposal.setAbstractFileName(file.getOriginalFilename());
        else if(which.equals("paper"))
            proposal.setPaperFileName(file.getOriginalFilename());
        else
            throw new Exception("error");

        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();
        result.add(new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize()));

        proposalService.updateProposal(aID,proposal);


        return  result;
    }

    @RequestMapping(value = "/proposals", method = RequestMethod.POST)
    ProposalDto saveProposal(@RequestParam(value = "proposalID",required = false, defaultValue = "0") Integer pID,
                             @RequestParam("authorID") Integer aID,
                             @RequestParam("proposalName") String proposalName,
                             @RequestParam("keyWords") String keyWords,
                             @RequestParam("topics") String topics,
                             @RequestParam(value = "listOfReviewers",required = false,defaultValue = "") String listOfReviewers,
                             @RequestParam(value = "listOfReviewers",required = false, defaultValue = "") List<Integer> reviewers,
                             @RequestParam(value = "listOfRefusers",required = false, defaultValue = "") List<Integer> refusers,
                             @RequestParam(value = "assignedReviewers",required = false, defaultValue = "") List<Integer> assignedReviewers
                             )
    {

        ProposalDto dto = new ProposalDto(pID,aID,"","",proposalName,keyWords,topics,listOfReviewers,reviewers,refusers,assignedReviewers,new ArrayList<>());

        Proposal saved = this.proposalService.saveProposal(
                proposalConverter.convertDtoToModel(dto)
        );
        ProposalDto result = proposalConverter.convertModelToDto(saved);


        return result;
    }

    @RequestMapping(value = "/proposals", method = RequestMethod.GET)
    List<ProposalDto> getProposal(@RequestParam(required = false, defaultValue = "-1") Integer id,
                                  @RequestParam(required = false, defaultValue = "-1") Integer authorId,
                                  @RequestParam(required = false,defaultValue = "-1") Integer reviewerId
                                    )
    {

        List<Proposal> proposals = proposalService.getAllProposals();

        if(reviewerId == -1)
        {
            if (id == -1 && authorId == -1)
                return new ArrayList<>(proposalConverter.convertModelsToDtos(proposals));

            Proposal proposal = new Proposal();
            proposals.stream().forEach(s -> {
                if (s.getId() == id || s.getAuthorID() == authorId) {
                    proposal.setId(s.getId());
                    proposal.setAuthorID(s.getAuthorID());
                    proposal.setAbstractFileName(s.getAbstractFileName());
                    proposal.setPaperFileName(s.getPaperFileName());
                    proposal.setProposalName(s.getProposalName());
                    proposal.setKeyWords(s.getKeyWords());
                    proposal.setTopics(s.getTopics());
                    proposal.setListOfAuthors(s.getListOfAuthors());
                    proposal.setReviewers(s.getReviewers());
                    proposal.setRefusers(s.getRefusers());
                    proposal.setAssignedReviewers(s.getAssignedReviewers());
                    proposal.setReviews(s.getReviews());
                }
            });
            ProposalDto result = new ProposalDto(proposal.getId(),
                    proposal.getAuthorID(),
                    proposal.getAbstractFileName(),
                    proposal.getPaperFileName(),
                    proposal.getProposalName(),
                    proposal.getKeyWords(),
                    proposal.getTopics(),
                    proposal.getListOfAuthors(),
                    proposal.getReviewers(),
                    proposal.getRefusers(),
                    proposal.getAssignedReviewers(),
                    proposal.getReviews()
            );

            result.setId(proposal.getId());

            var results = new ArrayList<ProposalDto>();
            results.add(result);
            return results;
        }
        else
        {
            return new ArrayList<>(proposalConverter.convertModelsToDtos(proposals.stream().filter(proposal ->
                !(proposal.getRefusers().contains(reviewerId) || proposal.getReviewers().contains(reviewerId))
            ).collect(Collectors.toList())));
        }
    }

    @RequestMapping(value = "/reviewers", method = RequestMethod.POST)
    ReviewerDto saveReviewer(@RequestParam("email") String email,
                             @RequestParam("password") String password,
                             @RequestParam("refusedPapers") List<Integer> refusedPapers,
                             @RequestParam("papersToReview") List<Integer> papersToReview,
                             @RequestParam("assignedPapers") List<Integer> assignedPapers
    )
    {

        ReviewerDto dto = new ReviewerDto(email,password,papersToReview,refusedPapers,assignedPapers);

        Reviewer saved = this.proposalService.saveReviewer(
                reviewerConverter.convertDtoToModel(dto)
        );
        ReviewerDto result = reviewerConverter.convertModelToDto(saved);


        return result;
    }


    @RequestMapping(value = "/reviewers", method = RequestMethod.GET)
    List<ReviewerDto> getReviewer(@RequestParam(value ="id",required = false, defaultValue = "-1") Integer id,
                                  @RequestParam(value = "email",required = false, defaultValue = "-1") String email
    ) {

        List<Reviewer> reviewers = proposalService.getAllReviewers();

        if (id == -1 && email.equals("-1"))
            return new ArrayList<>(reviewerConverter.convertModelsToDtos(reviewers));

        Reviewer reviewer = new Reviewer();
        reviewers.stream().forEach(s -> {
            if (s.getId() == id || s.getEmail().equals(email)) {
                reviewer.setId(s.getId());
                reviewer.setEmail(s.getEmail());
                reviewer.setPassword(s.getPassword());
                reviewer.setPapersToReview(s.getPapersToReview());
                reviewer.setRefusedPapers(s.getRefusedPapers());
                reviewer.setAssignedPapers(s.getAssignedPapers());
            }
        });
        ReviewerDto result = new ReviewerDto(reviewer.getEmail(), reviewer.getPassword(), reviewer.getPapersToReview(), reviewer.getRefusedPapers(),reviewer.getAssignedPapers());

        result.setId(reviewer.getId());

        var results = new ArrayList<ReviewerDto>();
        results.add(result);
        return results;
    }

    @PostMapping("/proposals/bid")
    void bidOnProposal(
            @RequestParam("proposalID") Integer proposalID,
            @RequestParam("reviewerID") Integer reviewerID
    )
    {
        List<Proposal> proposals = proposalService.getAllProposals();
        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == proposalID) {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
                proposal.setReviewers(s.getReviewers());
                proposal.setRefusers(s.getRefusers());
                proposal.setAssignedReviewers(s.getAssignedReviewers());
                proposal.setReviews(s.getReviews());
            }
        });

        List<Reviewer> reviewers = proposalService.getAllReviewers();

        Reviewer reviewer = new Reviewer();
        reviewers.stream().forEach(s -> {
            if (s.getId() == reviewerID) {
                reviewer.setId(s.getId());
                reviewer.setEmail(s.getEmail());
                reviewer.setPassword(s.getPassword());
                reviewer.setPapersToReview(s.getPapersToReview());
                reviewer.setRefusedPapers(s.getRefusedPapers());
                reviewer.setAssignedPapers(s.getAssignedPapers());
            }
        });

        proposalService.bidOnPaper(proposalID,reviewerID,proposal,reviewer);
    }

    @PostMapping("/proposals/refuse")
    void refuseProposal(
            @RequestParam("proposalID") Integer proposalID,
            @RequestParam("reviewerID") Integer reviewerID
    )
    {
        List<Proposal> proposals = proposalService.getAllProposals();
        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == proposalID) {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
                proposal.setReviewers(s.getReviewers());
                proposal.setRefusers(s.getRefusers());
                proposal.setAssignedReviewers(s.getAssignedReviewers());
                proposal.setReviews(s.getReviews());
            }
        });

        List<Reviewer> reviewers = proposalService.getAllReviewers();

        Reviewer reviewer = new Reviewer();
        reviewers.stream().forEach(s -> {
            if (s.getId() == reviewerID) {
                reviewer.setId(s.getId());
                reviewer.setEmail(s.getEmail());
                reviewer.setPassword(s.getPassword());
                reviewer.setPapersToReview(s.getPapersToReview());
                reviewer.setRefusedPapers(s.getRefusedPapers());
                reviewer.setAssignedPapers(s.getAssignedPapers());
            }
        });

        proposalService.refusePaper(proposalID,reviewerID,proposal,reviewer);
    }

    @PostMapping("/proposals/assign")
    void assignProposal(
            @RequestParam("proposalID") Integer proposalID,
            @RequestParam("reviewerID") Integer reviewerID
    )
    {
        List<Proposal> proposals = proposalService.getAllProposals();
        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == proposalID) {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
                proposal.setReviewers(s.getReviewers());
                proposal.setRefusers(s.getRefusers());
                proposal.setAssignedReviewers(s.getAssignedReviewers());
                proposal.setReviews(s.getReviews());
            }
        });

        List<Reviewer> reviewers = proposalService.getAllReviewers();

        Reviewer reviewer = new Reviewer();
        reviewers.stream().forEach(s -> {
            if (s.getId() == reviewerID) {
                reviewer.setId(s.getId());
                reviewer.setEmail(s.getEmail());
                reviewer.setPassword(s.getPassword());
                reviewer.setPapersToReview(s.getPapersToReview());
                reviewer.setRefusedPapers(s.getRefusedPapers());
                reviewer.setAssignedPapers(s.getAssignedPapers());
            }
        });

        proposalService.assignPaper(proposalID,reviewerID,proposal,reviewer);
    }

    @GetMapping("proposals/deadlines")
    StringDto getDeadlines(@RequestParam("deadlineName") String deadline) throws Exception{
            Connection connection = DriverManager.getConnection(dsURL, dsUser, dsPass);
            Statement statement = connection.createStatement();
            ResultSet rs;
            rs= statement.executeQuery("SELECT date from deadline where name = '"+deadline+"'");
            rs.next();
            String res=rs.getString("date");
            System.out.println(rs.getString("date"));
            return new StringDto(res);
    }
    @PostMapping("proposals/deadlines")
    void updateDeadlines(@RequestParam("deadlineName") String deadline,
                         @RequestParam("date") String date) throws Exception{
        Connection connection = DriverManager.getConnection(dsURL, dsUser, dsPass);
        Statement statement = connection.createStatement();
        statement.execute("Update deadline set date = '"+date+"' where name = '"+deadline+"'");
    }

    @PostMapping("/proposals/review")
    void reviewProposal(
            @RequestParam("proposalID") Integer proposalID,
            @RequestParam("reviewerID") Integer reviewerID,
            @RequestParam("grade") Integer grade
    )
    {
        List<Proposal> proposals = proposalService.getAllProposals();
        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == proposalID) {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
                proposal.setReviewers(s.getReviewers());
                proposal.setRefusers(s.getRefusers());
                proposal.setAssignedReviewers(s.getAssignedReviewers());
                proposal.setReviews(s.getReviews());
            }
        });

        proposalService.reviewPaper(proposalID,proposal,reviewerID,grade);
    }


}
