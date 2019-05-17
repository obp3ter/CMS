package cms.core.services;

import cms.core.model.Proposal;
import cms.core.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProposalServiceImpl implements ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    @Override
    public List<Proposal> getAll()
    {
        return proposalRepository.findAll();
    }

    @Override
    public Proposal saveProposal(Proposal proposal) {

        Proposal savedProposal = (Proposal) this.proposalRepository.save(proposal);


        return savedProposal;
    }
}
