package cms.core.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="proposals")
@ToString(callSuper = true)
@Builder
public class Proposal {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer authorID;
    protected String abstractFileName;
    protected String paperFileName;
    protected String proposalName;
    protected String keyWords;
    protected String topics;
    protected String listOfAuthors;
}
