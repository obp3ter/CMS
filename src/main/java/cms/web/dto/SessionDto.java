package cms.web.dto;

import cms.core.model.Author;
import cms.core.model.Chair;
import cms.core.model.Listener;
import lombok.*;


import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SessionDto {
    private Integer id;
    Chair chair;
    Author speaker;
    List<Listener> listeners;
    Date date;
    String time;
}
