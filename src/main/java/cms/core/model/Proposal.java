package cms.core.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;


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
    @ElementCollection
    protected List<Integer> reviewers;
    @ElementCollection
    protected List<Integer> refusers;
    @ElementCollection
    protected List<Integer> assignedReviewers;
}
