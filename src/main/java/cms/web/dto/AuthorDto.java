package cms.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthorDto extends UserDto {
    protected String email;
    protected String password;
    protected String company;

    @Override
    public String toString() {
        return "AuthorDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", company='" + company + '\'' +
                '}'+super.toString();
    }
}
