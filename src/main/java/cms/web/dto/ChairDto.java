package cms.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChairDto extends UserDto {
    protected String email;
    protected String password;

    @Override
    public String toString() {
        return "ChairDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}'+super.toString();
    }
}
