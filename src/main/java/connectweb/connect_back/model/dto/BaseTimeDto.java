package connectweb.connect_back.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class BaseTimeDto {
    public String cdate;
    public LocalDateTime udate;
}
