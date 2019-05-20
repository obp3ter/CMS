package cms.core.services;

import cms.core.model.Proposal;
import cms.core.model.Reviewer;

import java.util.List;

public interface ProposalService {
    List<Proposal> getAllProposals();

    Proposal saveProposal(Proposal proposal);

    Proposal updateProposal(Integer id, Proposal proposal);

    List<Reviewer> getAllReviewers();

    Reviewer saveReviewer(Reviewer reviewer);

    Reviewer updateReviewer(Integer id, Reviewer reviewer);

    void bidOnPaper(Integer ProposalID, Integer ReviewerID, Proposal proposal, Reviewer reviewer);

    void refusePaper(Integer ProposalID, Integer ReviewerID, Proposal proposal, Reviewer reviewer);

}
