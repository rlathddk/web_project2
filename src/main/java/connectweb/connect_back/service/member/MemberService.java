package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.LoginDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.member.FollowEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    FollowEntityRepository followEntityRepository;
    @Autowired
    FileService fileService;
    //로그인
    @Autowired private HttpServletRequest request;

// ========================= [ 현재 로그인 정보 호출 ] ========================= //
    public MemberDto loginInfo(){
        Object object = request.getSession().getAttribute("loginInfo");
        if (object != null){
            return (MemberDto)object;
        }
        return null;
    }
// ========================= [ 로그인 된 회원 Entity 호출] ========================= //
    public MemberEntity loginEntity(){
        MemberDto loginDto = loginInfo();
        if(loginDto==null) return null;
        Optional<MemberEntity> optionalMemberEntity = memberEntityRepository.findById(loginDto.getMno());
        if(!optionalMemberEntity.isPresent()) return null;
        MemberEntity memberEntity = optionalMemberEntity.get();
        return memberEntity;
    }
// ========================= [회원가입] ========================= //
    public boolean signUpPost (MemberDto memberDto){
        memberDto.setMimg("default.png");
        MemberEntity memberEntity = memberEntityRepository.save(memberDto.toEntity());
        if(memberEntity.getMno()>0)return true;
        return false;
    }
// ========================= [로그인] ========================= //
    public boolean loginPost (LoginDto loginDto){
        MemberEntity loginConfirm = memberEntityRepository.findByLoginSQL(loginDto.getMid(), loginDto.getMpw());
        if(loginConfirm == null)return false;
        request.getSession().setAttribute("loginInfo", loginConfirm.toDto());
        return true;
    }
// ========================= [로그아웃] ========================= //
    public boolean doLogOutGet(){
        request.getSession().setAttribute("loginInfo",null);
        return true;
    }
// ======================== [검색 회원리스트] ======================== //
    public List<MemberDto> memberList (String search){
        List<MemberEntity> memberEntities=memberEntityRepository.findBySearch(search);
        List<MemberDto>memberDtos=new ArrayList<>();
        memberEntities.forEach((list)->{
            MemberDto memberDto=list.toDto();
            memberDtos.add(memberDto);
        });
        return memberDtos;
    }
// ======================== [개인페이지 출력할 회원정보] ======================== //
    public MemberDto memberView (String mnickname){
        MemberDto memberDto = memberEntityRepository.findByMnickname(mnickname).toDto();
        memberDto.setTofollow(followEntityRepository.doFollowingGet(memberDto.getMno()));
        memberDto.setFromfollow(followEntityRepository.doFollowerGet(memberDto.getMno()));
        return memberDto;
    }
// ======================== [회원 탈퇴] ======================== //
    public boolean memberDelete (){
        memberEntityRepository.deleteById(loginEntity().getMno());
        return true;
    }
// ======================== [회원 수정] ======================== //
    @Transactional
    public MemberDto editMember (MemberDto memberDto){
        Optional<MemberEntity> memberEntity = memberEntityRepository.findById(loginEntity().getMno());
        if(memberEntity.isPresent()){
            memberEntity.get().setMimg(fileService.FileUpload(memberDto.getMfile()));
            memberEntity.get().setMname(memberDto.getMname());
            memberEntity.get().setMemail(memberDto.getMemail());
            memberEntity.get().setMnickname(memberDto.getMnickname());
            memberEntity.get().setMphone(memberDto.getMphone());
            System.out.println("memberEntity.get() = " + memberEntity.get());
            return memberEntity.get().toDto();
        }
        return null;
    }
// ========================= [아이디, 닉네임, 이메일, 전화번호 중복검사] ========================= //
    public boolean checkId(String mid){
        boolean result = memberEntityRepository.existsByMid(mid);
        return result;
    }
    public boolean checkNickName(String nickName){
        boolean result = memberEntityRepository.existsByMnickname(nickName);
        return result;
    }
    public boolean checkEmail(String email){
        boolean result = memberEntityRepository.existsByMemail(email);
        return result;
    }
    public boolean checkPhoneNumber(String phoneNumber){
        boolean result = memberEntityRepository.existsByMphone(phoneNumber);
        return result;
    }
// ========================= [비밀번호 일치 확인] ========================= //
    public boolean checkPassword(String mpw){
        int exits = memberEntityRepository.existsByMpwAndMno(mpw, loginEntity().getMno());
        if(exits == 1){
            return true;
        }
        return false;
    }

}
