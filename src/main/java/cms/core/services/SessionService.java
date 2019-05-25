package cms.core.services;

import cms.core.model.Session;

import java.util.List;

public interface SessionService {
    void addSession(Session s);
    void updateSession(Session s);
    List<Session> getAll();
    Session getSession(int id);

}
