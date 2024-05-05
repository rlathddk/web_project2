package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;


@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @ToString @SuperBuilder
public class GalleryDto {

    private String gname;               //피드사진경로
    private int bno;    //fk

    private MultipartFile gfile; //피드사진

    //dto를 엔티티로 변환
    public GalleryEntity toGalleryEntity(){
        return GalleryEntity.builder()
                .gname(this.gname)
                .build();
    }

}
