package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.dto.ReplyDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import connectweb.connect_back.model.repository.board.GalleryEntityRepository;
import connectweb.connect_back.model.repository.board.ReplyEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import connectweb.connect_back.service.member.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {
    @Autowired
    BoardEntityRepository boardEntityRepository;

    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    GalleryEntityRepository galleryEntityRepository;
    @Autowired
    ReplyEntityRepository replyEntityRepository;
    @Autowired
    FileService fileService;
    @Autowired
    MemberService memberService;

    int uploadBno = 0;
    //게시물등록(0은 실패 1은 성공)
    @Transactional
    public int doPostBoard(BoardDto boardDto){

        MemberEntity memberEntity = memberService.loginEntity();
        if(memberEntity == null) return 2;

        if ( boardDto.getGfile().get(0).isEmpty()) return 0;
        //글쓰기
        BoardEntity boardEntity = boardEntityRepository.save(boardDto.toEntity());
        boardEntity.setMemberEntity(memberEntity);

        //피드이미지----------------------------------------
        for( int i = 0; i <boardDto.getGfile().size() ; i++ ){

            MultipartFile uploadFile = boardDto.getGfile().get(i);

                String fileName = fileService.FileUpload2(uploadFile);
                System.out.println("fileName = " + fileName);

                GalleryEntity galleryEntity = GalleryEntity.builder()
                        .gname(fileName)
                        .boardEntity(boardEntity)
                        .build();

                galleryEntityRepository.save(galleryEntity);
                uploadBno = galleryEntity.getBoardEntity().getBno();
            //------------------------------------------------

        }
        return 1;
    }

    // 전체 게시글 출력 //
    @Transactional
    public List<BoardDto> doGetBoard(int page,int limit) {
        int offset = (page - 1) * limit;
        List<Map<Object, Object>> list1 = boardEntityRepository.findBoardByPageSQL(offset, limit);

        List<BoardDto> boardDtoList = new ArrayList<>();
        list1.forEach((data) -> {
            Optional<BoardEntity> boardEntity = boardEntityRepository.findById((Integer) data.get("bno"));
            if( boardEntity.isPresent() ) {
                BoardDto boardDto = boardEntity.get().toDto();
                boardDto.setMnickname((String) data.get("mnickname"));
                boardDto.setCdate((String) data.get("cdate"));
                boardDto.setProfilename((String) data.get("mimg"));

                boardDtoList.add(boardDto);
            }
        });
        return boardDtoList;
    }

    //개별피드출력
    public List<BoardDto> getMyBoardList(String mnickname){
        List<Map<Object,Object>> list = boardEntityRepository.findMyBoardList(memberService.memberView(mnickname).getMno());
        List<GalleryDto> galleryDtoList = new ArrayList<>();
        List<BoardDto> boardDtoList = new ArrayList<>();
        for(int i =0; i< list.size(); i++) {
            Optional<BoardEntity> boardEntity = boardEntityRepository.findById((Integer)list.get(i).get("bno"));
            BoardDto boardDto = boardEntity.get().toDto();
            boardDtoList.add(boardDto);
        }

        return boardDtoList ;

    }

    //게시글 수정
    @Transactional
    public int doPutBoard(BoardDto boardDto){
        BoardEntity boardEntity = boardEntityRepository.findById(boardDto.getBno()).get();
        boardEntity.setBcontent(boardDto.getBcontent());

        boardDto.getGfile().forEach((uploadFile)->{
            if(!uploadFile.isEmpty()){
                String fileName = fileService.FileUpload2(uploadFile);
                GalleryEntity galleryEntity = GalleryEntity.builder()
                        .gname(fileName)
                        .boardEntity(boardEntity)
                        .build();
                galleryEntityRepository.save(galleryEntity);
            }
            
        });

        if(galleryEntityRepository.fineGallery(boardDto.getBno()).isEmpty()){
            return 1;
        }

        return 0;
    }

    //이미지삭제 (게시글 수정용)
    public boolean doDeleteImg(String gname){
        int gno = galleryEntityRepository.findGno(gname);
        if(gno != 0){
            galleryEntityRepository.deleteById(gno);
            return true;
        }
        return false;
    }


    //게시글 삭제
    @Transactional
    public boolean doDeleteBoard(int bno){
        MemberDto loginDto = memberService.loginInfo();

        Optional<BoardEntity> optionalBoardEntity = boardEntityRepository.findById(bno);
        if(optionalBoardEntity.get().getMemberEntity().getMno() == loginDto.getMno()){
            boardEntityRepository.deleteById(bno);
            return true;
        }
        return false;
    }

    //=========================== 댓글 등록 ==========================//
    @Transactional
    public boolean doPostReply(ReplyDto replyDto){
        ReplyEntity replyEntity=replyDto.toEntity();
        MemberEntity memberEntity = memberService.loginEntity();

        BoardEntity boardEntity= BoardEntity.builder()
                .bno(replyDto.getBno())
                .build();
        replyEntity.setMemberEntity(memberEntity);
        replyEntity.setBoardEntity(boardEntity);

        replyEntityRepository.save(replyEntity);
        return true;
    }
    //=========================== 댓글 출력 ==========================//
    @Transactional
    public List<ReplyDto> doGetReply(int bno){
        List<Map<Object,Object>> REList=replyEntityRepository.findByBno(bno);
        List<ReplyDto> list=new ArrayList<>();
        REList.forEach((reply)->{
            ReplyDto replyDto= ReplyDto.builder()
                    .mnickname((String) reply.get("mnickname"))
                    .rno((Integer)reply.get("rno"))
                    .rcontent((String) reply.get("rcontent"))
                    .mno((Integer)reply.get("mno"))
                    .build();
            list.add(replyDto);
        });
        return list;
    }
    //=========================== 댓글 수정 ==========================//
    @Transactional
    public boolean doPutReply(){
        return false;
    }
    //=========================== 댓글 삭제 ==========================//
    @Transactional
    public boolean doDeleteReply(int rno){
        replyEntityRepository.deleteById(rno);
        return true;
    }
}
