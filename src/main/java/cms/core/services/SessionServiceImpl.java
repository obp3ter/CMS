package cms.core.services;

import cms.core.model.Listener;
import cms.core.model.Session;
import cms.core.model.Review;
import cms.core.model.Reviewer;
import cms.core.repository.ListenerRepository;
import cms.core.repository.SessionRepository;
import cms.core.repository.ReviewerRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SessionServiceImpl implements SessionService {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ListenerRepository listenerRepository;

    @Autowired
    ReviewerRepository reviewerRepository;

    @Override
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    @Override
    public Session saveSession(Session session) {

        Session savedSession = (Session) this.sessionRepository.save(session);


        return savedSession;
    }
    
    @Override
    @Transactional
    public Session updateSession(Integer id, Session session) {

        Optional<Session> optionalSession = sessionRepository.findById(id);
        Session result = optionalSession.orElse(session);
        result.setId(session.getId());
        result.setChair(session.getChair());
        result.setDate(session.getDate());
        result.setListeners(session.getListeners());
        result.setPaperFileName(session.getPaperFileName());
        result.setSpeaker(session.getSpeaker());
        result.setTime(session.getTime());

        return result;
    }

    @Override
    @Transactional
    public void joinSession(Integer sessionID, Integer listenerID) {
        Listener listener= listenerRepository.getOne(listenerID);

        Session session = getAllSessions().stream().filter(s -> s.getId() == sessionID).collect(Collectors.toList()).get(0);

        List<Listener> listeners = session.getListeners();
        listeners.add(listener);

        session.setListeners(listeners);

        updateSession(sessionID,session);
    }

}
