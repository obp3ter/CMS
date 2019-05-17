package cms.core.services;

import cms.core.model.Proposal;
import cms.core.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
    public Proposal save(Proposal proposal) {

        Proposal savedProposal = (Proposal) this.proposalRepository.save(proposal);


        return savedProposal;
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


        return result;
    }
}
