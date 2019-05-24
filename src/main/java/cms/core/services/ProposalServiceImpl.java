package cms.core.services;

import cms.core.model.Proposal;
import cms.core.model.Reviewer;
import cms.core.repository.ProposalRepository;
import cms.core.repository.ReviewerRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProposalServiceImpl implements ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    ReviewerRepository reviewerRepository;

    @Override
    public List<Proposal> getAllProposals()
    {
        return proposalRepository.findAll();
    }

    @Override
    public Proposal saveProposal(Proposal proposal) {

        Proposal savedProposal = (Proposal) this.proposalRepository.save(proposal);


        return savedProposal;
    }

    @Override
    public List<Reviewer> getAllReviewers()
    {
        return reviewerRepository.findAll();
    }

    @Override
    public Reviewer saveReviewer(Reviewer reviewer) {

        Reviewer savedReviewer = (Reviewer) this.reviewerRepository.save(reviewer);


        return savedReviewer;
    }

    @Override
    @Transactional
    public Reviewer updateReviewer(Integer id, Reviewer reviewer)
    {
        Optional<Reviewer> optionalReviewer = reviewerRepository.findById(id);
        Reviewer result = optionalReviewer.orElse(reviewer);
        result.setId(reviewer.getId());
        result.setEmail(reviewer.getEmail());
        result.setPassword(reviewer.getPassword());
        result.setPapersToReview(reviewer.getPapersToReview());
        result.setRefusedPapers(reviewer.getRefusedPapers());


        return result;
    }


    @Override
    @Transactional
    public Proposal updateProposal(Integer id, Proposal proposal) {

        Optional<Proposal> optionalProposal = proposalRepository.findById(id);
        Proposal result = optionalProposal.orElse(proposal);
        result.setId(proposal.getId());
        result.setAuthorID(proposal.getAuthorID());
        result.setAbstractFileName(proposal.getAbstractFileName());
        result.setPaperFileName(proposal.getPaperFileName());
        result.setProposalName(proposal.getProposalName());
        result.setKeyWords(proposal.getKeyWords());
        result.setListOfAuthors(proposal.getListOfAuthors());
        result.setReviewers(proposal.getReviewers());
        result.setRefusers(proposal.getRefusers());


        return result;
    }

    @Override
    @Transactional
    public void bidOnPaper(Integer ProposalID, Integer ReviewerID, Proposal proposal, Reviewer reviewer) {
        List<Integer> papers = reviewer.getPapersToReview();
        papers.add(ProposalID);
        reviewer.setPapersToReview(papers);

        List<Integer> reviewers = proposal.getReviewers();
        reviewers.add(ReviewerID);
        proposal.setReviewers(reviewers);

        updateProposal(ProposalID,proposal);
        updateReviewer(ReviewerID,reviewer);

    }

    @Override
    @Transactional
    public void refusePaper(Integer ProposalID, Integer ReviewerID, Proposal proposal, Reviewer reviewer) {
        List<Integer> papers = reviewer.getRefusedPapers();
        papers.add(ProposalID);
        reviewer.setRefusedPapers(papers);

        List<Integer> reviewers = proposal.getRefusers();
        reviewers.add(ReviewerID);
        proposal.setRefusers(reviewers);

        updateProposal(ProposalID,proposal);
        updateReviewer(ReviewerID,reviewer);

    }

    @Override
    @Transactional
    public void assignPaper(Integer ProposalID, Integer ReviewerID, Proposal proposal, Reviewer reviewer) {
        List<Integer> papers = reviewer.getAssignedPapers();
        papers.add(ProposalID);
        reviewer.setAssignedPapers(papers);

        List<Integer> reviewers = proposal.getAssignedReviewers();
        reviewers.add(ReviewerID);
        proposal.setAssignedReviewers(reviewers);

        updateProposal(ProposalID,proposal);
        updateReviewer(ReviewerID,reviewer);
    }
}
