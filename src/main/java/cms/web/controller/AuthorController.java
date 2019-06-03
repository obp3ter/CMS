package cms.web.controller;

import cms.core.model.Author;
import cms.core.model.Chair;
import cms.core.model.Listener;
import cms.core.services.AuthorService;
import cms.core.services.ChairService;
import cms.core.services.ListenerService;
import cms.web.converter.AuthorConverter;
import cms.web.converter.ChairConverter;
import cms.web.converter.ListenerConverter;
import cms.web.dto.AuthorDto;
import cms.web.dto.ChairDto;
import cms.web.dto.ListenerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AuthorController {
    @Autowired
    AuthorService authorService;
    @Autowired
    ListenerService listenerService;
    @Autowired
    AuthorConverter authorConverter;
    @Autowired
    ListenerConverter listenerConverter;
    @Autowired
    ChairService chairService;
    @Autowired
    ChairConverter chairConverter;



    @RequestMapping(value = "/authors", method = RequestMethod.POST)
    AuthorDto saveAuthor(@RequestParam("email") String email,
                         @RequestParam("password") String password,
                         @RequestParam("company") String company
    ) {

        AuthorDto dto = new AuthorDto(email,password,company);

        Author saved = this.authorService.saveAuthor(
                authorConverter.convertDtoToModel(dto)
        );
        AuthorDto result = authorConverter.convertModelToDto(saved);


        return result;
    }


    @RequestMapping(value = "/authors", method = RequestMethod.GET)
    List<AuthorDto> getAuthor(@RequestParam(value ="id",required = false, defaultValue = "-1") Integer id,
                              @RequestParam(value = "email",required = false, defaultValue = "-1") String email
                              ) {

        List<Author> authors = authorService.getAll();

        if (id == -1 && email.equals("-1"))
            return new ArrayList<>(authorConverter.convertModelsToDtos(authors));

        Author author = new Author();
        authors.stream().forEach(s -> {
            if (s.getId() == id || s.getEmail().equals(email)){
                author.setId(s.getId());
                author.setCompany(s.getCompany());
                author.setEmail(s.getEmail());
                author.setPassword(s.getPassword());
            }
        });
        AuthorDto result = new AuthorDto(author.getEmail(), author.getPassword(), author.getCompany());

        result.setId(author.getId());

        List<AuthorDto> results = new ArrayList<AuthorDto>();
        results.add(result);
        return results;
    }

    @RequestMapping(value = "/chairs", method = RequestMethod.POST)
    ChairDto saveChair(@RequestParam("email") String email
            , @RequestParam("password") String password) {

        ChairDto dto = new ChairDto(email,password);

        Chair saved = this.chairService.saveChair(
                chairConverter.convertDtoToModel(dto)
        );
        ChairDto result = chairConverter.convertModelToDto(saved);


        return result;
    }


    @RequestMapping(value = "/chairs", method = RequestMethod.GET)
    List<ChairDto> getChair(@RequestParam(value ="id",required = false, defaultValue = "-1") Integer id,
                            @RequestParam(value = "email",required = false, defaultValue = "-1") String email
    ) {

        List<Chair> chairs = chairService.getAll();

        if (id == -1 && email.equals("-1"))
            return new ArrayList<>(chairConverter.convertModelsToDtos(chairs));

        Chair chair = new Chair();
        chairs.stream().forEach(s -> {
            if (s.getId() == id || s.getEmail().equals(email)) {
                chair.setId(s.getId());
                chair.setEmail(s.getEmail());
                chair.setPassword(s.getPassword());
            }
        });
        ChairDto result = new ChairDto(chair.getEmail(), chair.getPassword());

        result.setId(chair.getId());

        List<ChairDto> results = new ArrayList<ChairDto>();
        results.add(result);
        return results;
    }

    @RequestMapping(value = "/listeners", method = RequestMethod.POST)
    ListenerDto saveListener(@RequestParam("email") String email,
                             @RequestParam("password") String password){

        ListenerDto dto = new ListenerDto(email,password,false);

        Listener saved = this.listenerService.saveListener(
                listenerConverter.convertDtoToModel(dto)
        );
        ListenerDto result = listenerConverter.convertModelToDto(saved);


        return result;
    }


    @RequestMapping(value = "/listeners", method = RequestMethod.GET)
    List<ListenerDto> getListener(@RequestParam(value ="id",required = false, defaultValue = "-1") Integer id,
                            @RequestParam(value = "email",required = false, defaultValue = "-1") String email
    ) {

        List<Listener> listeners = listenerService.getAll();

        if (id == -1 && email.equals("-1"))
            return new ArrayList<>(listenerConverter.convertModelsToDtos(listeners));

        Listener listener = new Listener();
        listeners.stream().forEach(s -> {
            if (s.getId() == id || s.getEmail().equals(email)) {
                listener.setId(s.getId());
                listener.setEmail(s.getEmail());
                listener.setPassword(s.getPassword());
            }
        });
        ListenerDto result = new ListenerDto(listener.getEmail(), listener.getPassword(),listener.isPayment());

        result.setId(listener.getId());

        List<ListenerDto> results = new ArrayList<ListenerDto>();
        results.add(result);
        return results;
    }

    @PostMapping("listeners/pay")
    void pay(@RequestParam("listenerID") Integer listenerId)
    {
        listenerService.pay(listenerId);
    }



//    @RequestMapping(value = "/authors/{id}", method = RequestMethod.GET)
//    AuthorDto getOneAuthor(@PathVariable Integer id) {
//
//        List<Author> authors = authorService.getAllProposals();
//        Author author= new Author();
//        authors.stream().forEach(s->{
//            if(s.getId()==id)
//            {
//                author.setId(s.getId());
//                author.setCompany(s.getCompany());
//                author.setEmail(s.getEmail());
//                author.setPassword(s.getPassword());
//            }
//        });
//        AuthorDto result = new AuthorDto(author.getCompany(),author.getEmail(),author.getPassword());
//
//        result.setId(author.getId());
//
//
//        return result;
//    }
//    @RequestMapping(value = "/authors", method = RequestMethod.POST)
//    AuthorDto saveAuthor(@RequestBody AuthorDto dto) {
//
//        Author saved = this.authorService.saveAuthor(
//                authorConverter.convertDtoToModel(dto)
//        );
//        AuthorDto result = authorConverter.convertModelToDto(saved);
//
//
//        return result;
//    }
//    @RequestMapping(value = "/authors", method = RequestMethod.GET)
//    public List<AuthorDto> getAuthors() {
//
//
//        List<Author> students = authorService.getAllProposals();
//
//
//        return new ArrayList<>(authorConverter.convertModelsToDtos(students));
//    }
}
