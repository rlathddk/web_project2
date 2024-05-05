package connectweb.connect_back.model.entity.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="follow")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class FollowEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int fno;

    @JoinColumn(name = "fromfollow")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public MemberEntity fromfollow;

    @JoinColumn(name = "tofollow")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public MemberEntity tofollow;

    public FollowDto toDto(){
        return FollowDto.builder()
                .fno(this.fno)
                .fromfollow(this.fromfollow.getMno())
                .tofollow(this.tofollow.getMno())
                .build();
    }
}
