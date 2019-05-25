package cms.core.repository;

import cms.core.model.Reviewer;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ReviewerRepository extends BaseUserRepository<Reviewer, Integer> {
}