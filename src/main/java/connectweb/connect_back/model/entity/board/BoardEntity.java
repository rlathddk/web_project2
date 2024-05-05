package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name="board")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bno; // 게시물 번호

    @Column(columnDefinition = "longtext" )
    private String bcontent; //내용

    //================ FK 필드
    @JoinColumn(name="mno") //fk 필드명
    @ManyToOne // 해당 필드 참조
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MemberEntity memberEntity;

    //양방향 갤러리
    @OneToMany(mappedBy = "boardEntity", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private List<GalleryEntity> galleryEntityList = new ArrayList<>();


   //- 엔티티를 dto로 변환하는 메소드
    public BoardDto toDto(){
        return BoardDto.builder()
                .bno(this.bno)
                .bcontent(this.bcontent)
                .mno_fk(memberEntity.getMno())
                .mnickname(memberEntity.getMnickname())
                .gnameList(
                        this.galleryEntityList.stream().map(
                                (r)->{return r.getGname();}
                        ).collect(Collectors.toList())
                )
        .build();
    }
}
