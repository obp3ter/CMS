package cms.core.services;

import cms.core.model.Session;
import cms.core.model.Reviewer;

import java.util.List;

public interface SessionService {
    List<Session> getAllSessions();

    Session saveSession(Session session);

    Session updateSession(Integer id, Session session);

    void joinSession(Integer sessionID, Integer listenerID);

}
