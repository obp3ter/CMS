package cms.core.repository;

import cms.core.model.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

public interface ProposalRepository <ID extends
        Serializable>
            extends JpaRepository<Proposal, ID>

    {
}
