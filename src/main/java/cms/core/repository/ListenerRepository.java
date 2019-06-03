package cms.core.repository;

import cms.core.model.Listener;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ListenerRepository extends BaseUserRepository<Listener, Integer> {
}
