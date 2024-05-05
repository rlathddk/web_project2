package connectweb.connect_back.controller.board;

import connectweb.connect_back.model.dto.BoardLikeDto;
import connectweb.connect_back.service.board.BoardLikeService;
import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/conn/b")
public class BoardLikeController {

    @Autowired
    BoardLikeService boardLikeService;

// =============================== 게시물 좋아요 =============================== //
    @PostMapping("/like/post.do")
    public boolean doLikePost(BoardLikeDto boardLikeDto){
        return boardLikeService.doLikePost(boardLikeDto);
    }
// =============================== 게시물 좋아요 수 출력 =============================== //
    @GetMapping("/like/get.do")
    public int doLikeGet(int bno){
        return boardLikeService.doLikeGet(bno);
    }
// =============================== 게시물 좋아요 취소 =============================== //
    @DeleteMapping("/like/delete.do")
    public boolean doLikeDelete(int mno, int bno){
        return boardLikeService.doLikeDelete(mno,bno);
    }
// =============================== 게시물 좋아요 여부 확인 =============================== //
    @GetMapping("/like")
    public boolean doLike(int mno, int bno){
        return boardLikeService.doLike(mno, bno);
    }
}
