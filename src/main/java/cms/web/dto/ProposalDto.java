package cms.web.dto;


import cms.core.model.Review;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProposalDto {
    private Integer id;
    private Integer authorID;
    protected String abstractFileName;
    protected String paperFileName;
    protected String proposalName;
    protected String keyWords;
    protected String topics;
    protected String listOfAuthors;
    protected List<Integer> reviewers;
    protected List<Integer> refusers;
    protected List<Integer> assignedReviewers;
    protected  List<Review> reviews;


}
