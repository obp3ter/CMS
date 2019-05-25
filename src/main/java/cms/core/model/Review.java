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
@Table(name="reviews")
@ToString
@Builder
public class Review {
    @Id
    @GeneratedValue
    private Integer id;
    protected Integer reviewerID,grade;
}
