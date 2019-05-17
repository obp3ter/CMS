package cms.core.repository;

import cms.core.model.Author;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface AuthorRepository extends BaseUserRepository<Author, Long> {
}