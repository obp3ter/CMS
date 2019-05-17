package cms.web.converter;

import cms.core.model.Author;
import org.springframework.stereotype.Component;
import cms.web.dto.AuthorDto;

@Component
public class AuthorConverter
        extends UserConverter<Author, AuthorDto> {
    @Override
    public Author convertDtoToModel(AuthorDto dto) {
        Author customer = new Author(dto.getEmail(),dto.getPassword(),dto.getCompany());
        customer.setId(dto.getId());
        return customer;
    }

    @Override
    public AuthorDto convertModelToDto(Author customer) {
        AuthorDto dto = new AuthorDto(customer.getEmail(),customer.getPassword(),customer.getCompany());
        dto.setId(customer.getId());
        return dto;
    }
}
