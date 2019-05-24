package cms.core.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="chair")
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
public class Chair extends User {

    protected String email;
    protected String password;


}
