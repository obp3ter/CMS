package cms.core.repository;

import cms.core.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

public interface SessionRepository <ID extends
        Serializable>
        extends JpaRepository<Session, ID>

{
}
