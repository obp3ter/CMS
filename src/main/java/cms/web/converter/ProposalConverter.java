package cms.web.converter;

import cms.core.model.Proposal;
import cms.web.dto.ProposalDto;

public class ProposalConverter {

    public Proposal convertDtoToModel(ProposalDto dto){
        Proposal proposal = new Proposal(dto.getId(),dto.getAuthorID(),dto.getAbstractFileName(),dto.getPaperFileName(),dto.getProposalName(),dto.getKeyWords(),dto.getTopics(),dto.getListOfAuthors());
        return proposal;
    }

    public ProposalDto convertModelToDto(Proposal proposal){
        ProposalDto dto= new ProposalDto(proposal.getId(),proposal.getAuthorID(),proposal.getAbstractFileName(),proposal.getPaperFileName(),proposal.getProposalName(),proposal.getKeyWords(),proposal.getTopics(),proposal.getListOfAuthors());
        return dto;
    }
}
