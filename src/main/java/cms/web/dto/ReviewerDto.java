package cms.web.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewerDto extends UserDto {
    protected String email;
    protected String password;
    protected List<Integer> papersToReview;
    protected List<Integer> refusedPapers;
    protected List<Integer> assignedPapers;

    @Override
    public String toString() {
        return "ReviewerDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", papersToReview=" + papersToReview +
                ", refusedPapers=" + refusedPapers +
                ", assignedPapers=" + assignedPapers +
                '}'+super.toString();
    }
}
