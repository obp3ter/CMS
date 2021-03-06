package cms.core.model;

import lombok.*;

import javax.persistence.*;
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
    @Id
    @GeneratedValue
    private Integer id;
    @OneToOne(cascade = CascadeType.ALL)
    Chair chair;
    @OneToOne(cascade = CascadeType.ALL)
    Author speaker;
    @OneToMany(cascade = CascadeType.ALL)
    List<Listener> listeners;
    String paperFileName;
    Date date;
    String time;
}
