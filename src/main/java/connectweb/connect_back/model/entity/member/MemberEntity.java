package connectweb.connect_back.model.entity.member;

import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.board.BoardEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@DynamicUpdate
public class MemberEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mno; // 회원번호

    @Column(length = 30,unique = true)
    private String mid; // 아이디

    @Column(length = 30)
    private String mpw; //비밀번호

    @Column(length = 20)
    private String mname; // 이름

    @Column(length = 30, unique = true)
    private String mnickname; // 닉네임

    @Column(length = 50, unique = true)
    private String memail; //이메일

    @Column(length = 20, unique = true)
    private String mphone;// 전화번호

    @Column(columnDefinition = "date")
    private String mbirth;	//생년월일

    private String mimg; // 회원 사진

   //- 엔티티를 dto로 변환하는 메소드
    public MemberDto toDto(){
        return MemberDto.builder()
                .mno(this.mno)
                .mid(this.mid)
                .mname(this.mname)
                .mnickname(this.mnickname)
                .memail(this.memail)
                .mphone(this.mphone)
                .mbirth(this.mbirth)
                .mimg(this.mimg)
                .build();
    }

}
