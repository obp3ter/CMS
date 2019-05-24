package cms.core.repository;

import cms.core.model.Chair;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ChairRepository extends BaseUserRepository<Chair, Long> {
}