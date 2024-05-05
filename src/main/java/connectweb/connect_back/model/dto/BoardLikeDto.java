package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.BoardLikeEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class BoardLikeDto {

    public int mno;
    public int bno;

    public BoardLikeEntity toEntity(){
        return BoardLikeEntity.builder()
                .memberEntity(MemberEntity.builder().mno(this.mno).build())
                .boardEntity(BoardEntity.builder().bno(this.bno).build())
                .build();
    }
}
