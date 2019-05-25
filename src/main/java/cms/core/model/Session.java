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
    protected Integer id;
    @OneToOne(cascade = CascadeType.ALL)
    Chair chair;
    @OneToOne(cascade = CascadeType.ALL)
    Author speaker;
    @OneToMany(cascade = CascadeType.ALL)
    List<Listener> listeners;
    Date date;
    String time;
}
