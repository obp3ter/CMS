package cms.web.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
    private Integer id;

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                '}';
    }
}
