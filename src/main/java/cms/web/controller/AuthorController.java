package cms.web.controller;

import cms.core.model.Author;
import cms.core.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import cms.web.converter.AuthorConverter;
import cms.web.dto.AuthorDto;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AuthorController {
    @Autowired
    AuthorService authorService;

    @Autowired
    AuthorConverter authorConverter;

    @RequestMapping(value = "/authors", method = RequestMethod.GET)
    public List<AuthorDto> getAuthors() {


        List<Author> students = authorService.getAll();


        return new ArrayList<>(authorConverter.convertModelsToDtos(students));
    }

    @RequestMapping(value = "/authors", method = RequestMethod.POST)
    AuthorDto saveAuthor(@RequestBody AuthorDto dto) {

        Author saved = this.authorService.saveAuthor(
                authorConverter.convertDtoToModel(dto)
        );
        AuthorDto result = authorConverter.convertModelToDto(saved);


        return result;
    }

    @RequestMapping(value = "/authors/{id}", method = RequestMethod.GET)
    AuthorDto getOneAuthor(@PathVariable Integer id) {

        List<Author> authors = authorService.getAll();
        Author author= new Author();
        authors.stream().forEach(s->{
            if(s.getId()==id)
            {
                author.setId(s.getId());
                author.setCompany(s.getCompany());
                author.setEmail(s.getEmail());
                author.setPassword(s.getPassword());
            }
        });
        AuthorDto result = new AuthorDto(author.getCompany(),author.getEmail(),author.getPassword());

        result.setId(author.getId());


        return result;
    }

}
