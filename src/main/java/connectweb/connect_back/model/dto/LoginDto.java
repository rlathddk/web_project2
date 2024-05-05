package connectweb.connect_back.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class LoginDto {
    private String mid;
    private String mpw;
}
