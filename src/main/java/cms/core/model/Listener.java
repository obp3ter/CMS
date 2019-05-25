package cms.core.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name="listeners")
@ToString(callSuper = true)
@Builder
class Listener extends User {
    String email;
    String password;
    boolean payment;
}
