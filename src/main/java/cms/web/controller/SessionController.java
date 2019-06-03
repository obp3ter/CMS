package cms.web.controller;

import cms.core.model.Listener;
import cms.core.model.Session;
import cms.core.model.Reviewer;
import cms.core.services.*;
import cms.web.converter.SessionConverter;
import cms.web.converter.ReviewerConverter;
import cms.web.dto.SessionDto;
import cms.web.dto.ReviewerDto;
import cms.web.dto.StringDto;
import cms.web.payload.UploadFileResponse;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SessionController {
    @Autowired
    private ProposalService proposalService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private ChairService chairService;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private SessionConverter sessionConverter;
    @PostMapping("/sessions/uploadfile")

    @RequestMapping(value = "/sessions", method = RequestMethod.POST)
    SessionDto saveSession(@RequestParam("speaker") Integer speaker,
                           @RequestParam("chair") Integer chair,
                           @RequestParam("time")String time,
                           @RequestParam("date")String date) throws Exception
    {



        SessionDto dto = new SessionDto(0,
                chairService.getAll().stream().filter(a -> a.getId().equals(chair)).collect(Collectors.toList()).get(0),
                authorService.getAll().stream().filter(a -> a.getId().equals(speaker)).collect(Collectors.toList()).get(0),
                new ArrayList<Listener>(),
                proposalService.getAllProposals().stream().filter(p->p.getAuthorID().equals(speaker)).collect(Collectors.toList()).get(0).getPaperFileName(),
                new SimpleDateFormat("dd/MM/yyyy").parse(date),
                time
                );

        Session saved = this.sessionService.saveSession(
                sessionConverter.convertDtoToModel(dto)
        );
        SessionDto result = sessionConverter.convertModelToDto(saved);


        return result;
    }

    @RequestMapping(value = "/sessions", method = RequestMethod.GET)
    List<SessionDto> getSession(@RequestParam(required = false, defaultValue = "-1") Integer id,
                                @RequestParam(required = false,defaultValue = "-1") Integer authorID) {

        List<Session> sessions = sessionService.getAllSessions();

        if (id == -1)
            return new ArrayList<>(sessionConverter.convertModelsToDtos(sessions));

        Session session = new Session();
        sessions.stream().forEach(s -> {
            if (s.getId() == id) {
                session.setId(s.getId());
                session.setPaperFileName(s.getPaperFileName());
                session.setTime(s.getTime());
                session.setSpeaker(s.getSpeaker());
                session.setDate(s.getDate());
                session.setListeners(s.getListeners());
                session.setChair(s.getChair());
            }
        });
        SessionDto result = new SessionDto(session.getId(),
                session.getChair(),
                session.getSpeaker(),
                session.getListeners(),
                session.getPaperFileName(),
                session.getDate(),
                session.getTime()

        );

        result.setId(session.getId());

        var results = new ArrayList<SessionDto>();
        results.add(result);
        return results;
    }

    @PostMapping("listeners/join")
    void joinSession(@RequestParam("sessionID") Integer sessionID,
                     @RequestParam("listenerID") Integer listenerID

                     )
    {
        sessionService.joinSession(sessionID,listenerID);
    }

}
