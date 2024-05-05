package connectweb.connect_back.controller.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.dto.ReplyDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conn/b")
@CrossOrigin("http://localhost:3000")
public class BoardController {

    @Autowired
    BoardService boardService;

    //게시글등록
    @PostMapping("/post.do")
    public int doPostBoard( BoardDto boardDto){
        return boardService.doPostBoard(boardDto);
    }

    //게시글 보기
    @GetMapping("/get.do")
    public List<BoardDto> doGetBoard(@RequestParam(defaultValue = "1") int page,
                                     @RequestParam(defaultValue = "5") int limit){
        // page와 limit를 사용하여 적절한 처리를 수행하고, 해당하는 게시글 데이터를 조회하여 반환
        return boardService.doGetBoard(page, limit);
    }


    //개별피드출력
    @GetMapping("/myboard/get.do")
    public List<BoardDto> getMyBoardList(String mnickname){
        return boardService.getMyBoardList(mnickname);
    }

    //게시글수정
    @PutMapping("/put.do")
    public int doPutBoard(BoardDto boardDto){
        return boardService.doPutBoard(boardDto);
    }

    //이미지삭제 (게시글 수정용)
    @DeleteMapping("/imgdelete.do")
    public boolean doDeleteImg(@RequestParam String gname){
        return boardService.doDeleteImg(gname);
    }

    //게시물삭제
    @DeleteMapping("/delete.do")
    public boolean doDeleteBoard(int bno){
        return boardService.doDeleteBoard(bno);
    }

    //=========================== 댓글 등록 ==========================//
    @PostMapping("/r/post.do")
    public boolean doPostReply(ReplyDto replyDto){
        return boardService.doPostReply(replyDto);
    }

    //=========================== 댓글 출력 ==========================//
    @GetMapping("/r/get.do")
    public List<ReplyDto> doGetReply(int bno){
        return boardService.doGetReply(bno);
    }

    //=========================== 댓글 수정 ==========================//
    @PutMapping("/r/put.do")
    public boolean doPutReply(){
        return boardService.doPutReply();
    }

    //=========================== 댓글 삭제 ==========================//
    @DeleteMapping("/r/delete.do")
    public boolean doDeleteReply(int rno){
        return boardService.doDeleteReply(rno);
    }
}
