package cms.web.converter;



import cms.core.model.User;
import cms.web.dto.UserDto;

/**
 * @author diananoveanu
 */

public interface Converter<Model extends User, Dto extends UserDto> {

    Model convertDtoToModel(Dto dto);

    Dto convertModelToDto(Model model);

}

