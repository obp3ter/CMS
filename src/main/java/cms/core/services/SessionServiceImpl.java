package cms.core.services;

import cms.core.model.Session;
import cms.core.repository.SessionReposiotry;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

public class SessionServiceImpl implements SessionService {
    @Autowired
    SessionReposiotry sessionReposiotry;

    @Override
    public void addSession(Session s) {
        sessionReposiotry.save(s);
    }

    @Override
    @Transactional
    public void updateSession(Session s) {
        sessionReposiotry.getOne(s.getId());

    }

    @Override
    public List<Session> getAll() {
        return null;
    }

    @Override
    public Session getSession(int id) {
        return null;
    }
}
