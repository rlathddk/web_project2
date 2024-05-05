package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class MemberDto {

    private int mno; // 회원번호
    private String mid; // 아이디
    private String mpw; //비밀번호
    private String mname; // 이름
    private String mnickname; // 닉네임
    private String memail; //이메일
    private String mphone;// 전화번호
    private String mbirth;	//생년월일
    private String mimg; // 회원사진 경로

    private int fromfollow;
    private int tofollow;

    private MultipartFile mfile; //회원사진

    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .mno(this.mno)
                .mid(this.mid)
                .mpw(this.mpw)
                .mname(this.mname)
                .mnickname(this.mnickname)
                .memail(this.memail)
                .mphone(this.mphone)
                .mbirth(this.mbirth)
                .mimg(this.mimg)
                .build();
    }
}
