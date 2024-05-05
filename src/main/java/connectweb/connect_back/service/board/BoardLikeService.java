package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BoardLikeDto;
import connectweb.connect_back.model.entity.board.BoardLikeEntity;
import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import connectweb.connect_back.model.repository.board.BoardLikeEntityRepository;
import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class BoardLikeService {
    @Autowired
    BoardLikeEntityRepository boardLikeEntityRepository;
    @Autowired
    MemberService memberService;

// =============================== 게시물 좋아요 =============================== //
    public boolean doLikePost(BoardLikeDto boardLikeDto){
        if(memberService.loginInfo() != null){
            boardLikeEntityRepository.save(boardLikeDto.toEntity());
            return true;
        }
        return false;
    }
// =============================== 게시물 좋아요 수 출력 =============================== //
    public int doLikeGet(int bno){
        return boardLikeEntityRepository.doLikeGet(bno);
    }
// =============================== 게시물 좋아요 취소 =============================== //
    public boolean doLikeDelete(int mno, int bno){
        BoardLikeEntity boardLikeEntity = boardLikeEntityRepository.doSelectLno(mno, bno);
        if(boardLikeEntity != null) {
            boardLikeEntityRepository.deleteById(boardLikeEntity.getLno());
            return true;
        }
        return false;
    }
// =============================== 게시물 좋아요 여부 확인 =============================== //
    public boolean doLike(int mno, int bno){
        if(memberService.loginInfo() != null){
            if(boardLikeEntityRepository.doLike(mno, bno)==1){
                return true;
            }
        }
        return false;
    }


}
