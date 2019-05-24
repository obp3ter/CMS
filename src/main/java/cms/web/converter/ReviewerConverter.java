package cms.web.converter;

import cms.core.model.Reviewer;
import org.springframework.stereotype.Component;
import cms.web.dto.ReviewerDto;

@Component
public class ReviewerConverter
        extends UserConverter<Reviewer, ReviewerDto> {
    @Override
    public Reviewer convertDtoToModel(ReviewerDto dto) {
        Reviewer reviewer = new Reviewer(dto.getEmail(),dto.getPassword(),dto.getPapersToReview(),dto.getRefusedPapers(),dto.getAssignedPapers());
        reviewer.setId(dto.getId());
        return reviewer;
    }

    @Override
    public ReviewerDto convertModelToDto(Reviewer reviewer) {
        ReviewerDto dto = new ReviewerDto(reviewer.getEmail(),reviewer.getPassword(),reviewer.getPapersToReview(),reviewer.getRefusedPapers(),reviewer.getAssignedPapers());
        dto.setId(reviewer.getId());
        return dto;
    }
}
