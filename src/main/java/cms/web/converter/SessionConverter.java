package cms.web.converter;

import cms.core.model.Session;
import cms.web.dto.SessionDto;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class SessionConverter {

    public Session convertDtoToModel(SessionDto dto){
        Session session = new Session(dto.getId(),dto.getChair(),dto.getSpeaker(),dto.getListeners(),dto.getPaperFileName(),dto.getDate(),dto.getTime());
        return session;
    }

    public SessionDto convertModelToDto(Session session){
        SessionDto dto= new SessionDto(session.getId(),session.getChair(),session.getSpeaker(),session.getListeners(),session.getPaperFileName(),session.getDate(),session.getTime());
        return dto;
    }
    public Set<SessionDto> convertModelsToDtos(Collection<Session> models) {
        return models.stream()
                .map(model -> convertModelToDto(model))
                .collect(Collectors.toSet());
    }
}
