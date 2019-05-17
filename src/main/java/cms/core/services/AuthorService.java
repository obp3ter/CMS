package cms.core.services;

import cms.core.model.Author;

import java.util.List;

public interface AuthorService {
    List<Author> getAll();
    Author saveAuthor(Author author);
}
