package cms.web.converter;

import cms.core.model.Listener;
import org.springframework.stereotype.Component;
import cms.web.dto.ListenerDto;

@Component
public class ListenerConverter
        extends UserConverter<Listener, ListenerDto> {
    @Override
    public Listener convertDtoToModel(ListenerDto dto) {
        Listener listener = new Listener(dto.getEmail(),dto.getPassword(),dto.isPayment());
        listener.setId(dto.getId());
        return listener;
    }

    @Override
    public ListenerDto convertModelToDto(Listener listener) {
        ListenerDto dto = new ListenerDto(listener.getEmail(),listener.getPassword(),listener.isPayment());
        dto.setId(listener.getId());
        return dto;
    }
}
