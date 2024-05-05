package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="boardlike")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardLikeEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int lno;

    @JoinColumn(name = "mno")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public MemberEntity memberEntity;

    @JoinColumn(name = "bno")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public BoardEntity boardEntity;

}
