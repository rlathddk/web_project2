package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class BoardDto extends BaseTimeDto {

    private int bno; // 게시물 번호
    private String bcontent; //내용
    private int mno_fk; //회원번호

    private String mnickname; // 작성자 닉네임
    private String profilename; // 작성자 사진

    // 등록용
    private List<MultipartFile> gfile;
    // 출력용
    private List<String> gnameList;

    // 출력용
    private List<GalleryDto> galleryDtoList;

    public BoardEntity toEntity(){
        return BoardEntity.builder()
                .bno(this.bno)
                .bcontent(this.bcontent)
                .build();
    }
}
