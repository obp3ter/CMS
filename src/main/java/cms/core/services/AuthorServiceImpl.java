package cms.core.services;

import cms.core.model.Author;
import cms.core.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public List<Author> getAll()
    {
        return authorRepository.findAll();
    }

    @Override
    public Author saveAuthor(Author author) {

        Author savedAuthor = this.authorRepository.save(author);


        return savedAuthor;
    }
}
