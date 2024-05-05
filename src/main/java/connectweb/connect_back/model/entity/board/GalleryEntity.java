package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name = "gallery")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @ToString @Builder
public class GalleryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gno; //사진식별번호

    @Column(columnDefinition = "longtext")
    private String gname; //주소

    @JoinColumn(name = "bno")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BoardEntity boardEntity; //게시물번호 (fk)

        //엔티티를 dto로 변환
        public GalleryDto toGalleryDto(){
        return GalleryDto.builder()
                .bno(boardEntity.getBno())
                .gname(this.gname)
                .build();
    }


}
