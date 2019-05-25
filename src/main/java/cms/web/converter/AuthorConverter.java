package cms.web.converter;

import cms.core.model.Author;
import org.springframework.stereotype.Component;
import cms.web.dto.AuthorDto;

@Component
public class AuthorConverter
        extends UserConverter<Author, AuthorDto> {
    @Override
    public Author convertDtoToModel(AuthorDto dto) {
        Author author = new Author(dto.getEmail(),dto.getPassword(),dto.getCompany());
        author.setId(dto.getId());
        return author;
    }

    @Override
    public AuthorDto convertModelToDto(Author author) {
        AuthorDto dto = new AuthorDto(author.getEmail(),author.getPassword(),author.getCompany());
        dto.setId(author.getId());
        return dto;
    }
}
