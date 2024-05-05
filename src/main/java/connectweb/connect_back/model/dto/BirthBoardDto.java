package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class BirthBoardDto extends BaseTimeDto{
    private int bbno;
    private String bbcontent;
    private int mno;

    // 1. 등록용 게시물 이미지 필드
    private List<MultipartFile> uploadList = new ArrayList<>();;
    // 2. 출력용 게시물 이미지 필드
    private String bbimg;

    public BirthBoardEntity birthEntity(){
        return BirthBoardEntity.builder()
                .bbno(this.bbno)
                .bbcontent(this.bbcontent)
                .bbimg(this.bbimg)
                .memberEntity(MemberEntity.builder().mno(this.mno).build())
                .build();
    }
}
