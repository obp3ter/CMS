package cms.web.converter;

import cms.core.model.Chair;
import org.springframework.stereotype.Component;
import cms.web.dto.ChairDto;

@Component
public class ChairConverter
        extends UserConverter<Chair, ChairDto> {
    @Override
    public Chair convertDtoToModel(ChairDto dto) {
        Chair chair = new Chair(dto.getEmail(),dto.getPassword());
        chair.setId(dto.getId());
        return chair;
    }

    @Override
    public ChairDto convertModelToDto(Chair chair) {
        ChairDto dto = new ChairDto(chair.getEmail(),chair.getPassword());
        dto.setId(chair.getId());
        return dto;
    }
}
