package cms.core.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="authors")
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
public class Author extends User {

    protected String email;
    protected String password;
    protected String company;


}
