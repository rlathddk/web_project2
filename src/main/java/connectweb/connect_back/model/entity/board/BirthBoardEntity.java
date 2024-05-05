package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "birthboard")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BirthBoardEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bbno; // 익명게시판 번호

    @Column(columnDefinition = "longtext")
    private String bbcontent; // 게시판 내용

    //Fk 필드
    @JoinColumn(name = "mno") // fk 필드명
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MemberEntity memberEntity;

    private String bbimg;

    public BirthBoardDto birthDto(){
        return BirthBoardDto.builder()
                .bbno(this.bbno)
                .bbcontent(this.bbcontent)
                .mno(memberEntity.getMno())
                .bbimg(this.bbimg)
                .build();
    }
}
