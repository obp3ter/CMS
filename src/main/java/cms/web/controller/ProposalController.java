package cms.web.controller;

import cms.core.model.Proposal;
import cms.core.model.Reviewer;
import cms.core.services.FileStorageService;
import cms.core.services.ProposalService;
import cms.web.converter.ProposalConverter;
import cms.web.converter.ReviewerConverter;
import cms.web.dto.ProposalDto;
import cms.web.dto.ReviewerDto;
import cms.web.payload.UploadFileResponse;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

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

        if(which=="abstract")
            proposal.setAbstractFileName(file.getOriginalFilename());
        else if(which=="paper")
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
    ProposalDto saveProposal(@RequestParam("proposalID") Integer aID,
                             @RequestParam("proposalID") Integer pID,
                             @RequestParam("proposalName") String proposalName,
                             @RequestParam("keyWords") String keyWords,
                             @RequestParam("topics") String topics,
                             @RequestParam("listOfReviewers") String listOfReviewers,
                             @RequestParam("listOfReviewers") List<Integer> reviewers,
                             @RequestParam("listOfRefusers") List<Integer> refusers,
                             @RequestParam("assignedReviewers") List<Integer> assignedReviewers
                             )
    {

        ProposalDto dto = new ProposalDto(pID,aID,"","",proposalName,keyWords,topics,listOfReviewers,reviewers,refusers,assignedReviewers);

        Proposal saved = this.proposalService.saveProposal(
                proposalConverter.convertDtoToModel(dto)
        );
        ProposalDto result = proposalConverter.convertModelToDto(saved);


        return result;
    }

    @RequestMapping(value = "/proposals", method = RequestMethod.GET)
    List<ProposalDto> getProposal(@RequestParam(required = false, defaultValue = "-1") Integer id)
    {

        List<Proposal> proposals = proposalService.getAllProposals();

        if (id == -1)
            return new ArrayList<>(proposalConverter.convertModelsToDtos(proposals));

        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == id) {
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
                proposal.getAssignedReviewers()
        );

        result.setId(proposal.getId());

        var results = new ArrayList<ProposalDto>();
        results.add(result);
        return results;
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
    List<ReviewerDto> getReviewer(@RequestParam(required = false, defaultValue = "-1") Integer id) {

        List<Reviewer> reviewers = proposalService.getAllReviewers();

        if (id == -1)
            return new ArrayList<>(reviewerConverter.convertModelsToDtos(reviewers));

        Reviewer reviewer = new Reviewer();
        reviewers.stream().forEach(s -> {
            if (s.getId() == id) {
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






}
