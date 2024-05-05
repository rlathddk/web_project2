package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.member.FollowEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.context.properties.source.ConfigurationPropertyName;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class FollowDto {
    public int fno;
    public int fromfollow;
    public int tofollow;

    public int mno;
    public String mname;
    public String mnickname;

    public FollowEntity toEntity(){
        return FollowEntity.builder()
                .fno(this.fno)
                .fromfollow(MemberEntity.builder().mno(this.fromfollow).build())
                .tofollow(MemberEntity.builder().mno(this.tofollow).build())
                .build();
    }
}
