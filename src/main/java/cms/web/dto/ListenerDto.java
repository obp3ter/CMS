package cms.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ListenerDto extends UserDto {
    protected String email;
    protected String password;
    boolean payment;

    @Override
    public String toString() {
        return "ListenerDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", payment=" + payment +
                '}'+super.toString();
    }
}
