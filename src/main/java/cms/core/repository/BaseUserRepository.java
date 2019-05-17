package cms.core.repository;

import cms.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

//@NoRepositoryBean
public interface BaseUserRepository<T extends User, ID extends
        Serializable>
        extends JpaRepository<T, ID> {

}