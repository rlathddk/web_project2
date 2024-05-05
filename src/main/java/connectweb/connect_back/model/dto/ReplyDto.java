package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class ReplyDto {
    private int mno; // 회원 참조
    private int bno; // 게시물 참조
    private int rno;
    private String rcontent;
    private String mnickname;

    public ReplyEntity toEntity(){
        return ReplyEntity.builder()
                .rno(this.rno)
                .rcontent((this.rcontent))
                /*.boardEntity(this.boardEntity)
                .memberEntity(this.memberEntity)*/
                .build();
    }
}

