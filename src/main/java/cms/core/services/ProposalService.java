package cms.core.services;

import cms.core.model.Proposal;

import java.util.List;

public interface ProposalService {
    List<Proposal> getAll();

    Proposal save(Proposal proposal);

    Proposal updateProposal(Integer id, Proposal proposal);
}
