package cms.core.model;


import lombok.*;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="reviewers")
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
public class Reviewer extends User{
    protected String email;
    protected String password;
    @ElementCollection
    protected List<Integer> papersToReview;
    @ElementCollection
    protected List<Integer> refusedPapers;
    
    public void bidPaper(Integer paperID){
        papersToReview.add(paperID);
    }

    public void refusePaper(Integer paperID){
        refusedPapers.add(paperID);
    }
}
