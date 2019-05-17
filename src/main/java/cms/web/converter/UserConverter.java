package cms.web.converter;

import cms.core.model.User;
import cms.web.dto.UserDto;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public abstract class UserConverter<Model extends User, Dto extends UserDto> implements Converter<Model, Dto> {

    public Set<Integer> convertModelsToIDs(Set<Model> models) {
        return models.stream()
                .map(model -> model.getId())
                .collect(Collectors.toSet());
    }

    public Set<Integer> convertDTOsToIDs(Set<Dto> dtos) {
        return dtos.stream()
                .map(dto -> dto.getId())
                .collect(Collectors.toSet());
    }

    public Set<Dto> convertModelsToDtos(Collection<Model> models) {
        return models.stream()
                .map(model -> convertModelToDto(model))
                .collect(Collectors.toSet());
    }
}
