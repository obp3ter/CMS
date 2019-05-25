package cms.core.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="sessions")
@ToString
@Builder
public class Session {
    Chair chair;
    Author speaker;
    List<Listener> listeners;
    Date date;
    String time;
}
