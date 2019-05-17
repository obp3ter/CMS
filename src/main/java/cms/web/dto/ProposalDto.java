package cms.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposalDto {
    private Integer id;
    private Integer authorID;
    protected String abstractFileName;
    protected String paperFileName;
    protected String proposalName;
    protected String keyWords;
    protected String topics;
    protected String listOfAuthors;

    @Override
    public String toString() {
        return "ProposalDto{" +
                "id=" + id +
                ", authorID=" + authorID +
                ", abstractFileName='" + abstractFileName + '\'' +
                ", paperFileName='" + paperFileName + '\'' +
                ", proposalName='" + proposalName + '\'' +
                ", keyWords='" + keyWords + '\'' +
                ", topics='" + topics + '\'' +
                ", listOfAuthors='" + listOfAuthors + '\'' +
                '}';
    }
}
