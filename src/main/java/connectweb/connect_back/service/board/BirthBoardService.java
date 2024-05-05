package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.model.dto.LoginDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BirthBoardEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import connectweb.connect_back.service.member.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BirthBoardService {
    @Autowired
    private MemberService memberService;
    @Autowired
    private BirthBoardEntityRepository birthBoardEntityRepository;
    @Autowired
    private MemberEntityRepository memberEntityRepository;
    @Autowired
    private FileService fileService;

    // 1. 글쓰기
    @Transactional
    public boolean postBirthBoard(BirthBoardDto birthBoardDto){
        MemberDto loginDto = memberService.loginInfo();
        if(loginDto == null)
            return false;

        // 1. 첨부 파일 처리
        // 첨부파일이 존재하면
        for(int i=0; i<birthBoardDto.getUploadList().size(); i++){
            String file = fileService.FileUpload3(birthBoardDto.getUploadList().get(i));
            birthBoardDto.setBbimg(file);
        }

        // 글쓰기
        BirthBoardEntity saverBoard = birthBoardEntityRepository.save(birthBoardDto.birthEntity());

        if(saverBoard.getBbno()>0)return true;
        return false;
    }
    // 전체출력
    @Transactional
    public List<BirthBoardDto> doGetBirthBoard(){
        List<Map<Object,Object>> listA=birthBoardEntityRepository.findAllBirthBoardSQL();
        List<BirthBoardDto> birthBoardDtoList = new ArrayList<>();

        listA.forEach((data)->{
            BirthBoardDto birthBoardDto = BirthBoardDto.builder()
                    .bbno((Integer)data.get("bbno"))
                    .bbcontent((String) data.get("bbcontent"))
                    .cdate((String) data.get("cdate"))  ////======================
                    .bbimg((String) data.get("bbimg"))
                    .build();

            birthBoardDtoList.add(birthBoardDto);
        });
        return birthBoardDtoList;
    }

    // 게시글 삭제
    public boolean doDeleteBirthBoard(int bbno){
        birthBoardEntityRepository.deleteById(bbno);
        return true;
    }
}
