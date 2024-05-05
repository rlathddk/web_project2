package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.member.FollowEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.member.FollowEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FollowService {
    @Autowired
    MemberService memberService;
    @Autowired
    FollowEntityRepository followEntityRepository;

    // ======================== [팔로우] ======================== //
    public boolean doFollowPost(FollowDto followDto){
        if(memberService.loginInfo()!=null){
            followDto.setFromfollow(memberService.loginEntity().getMno());
            FollowEntity followEntity = followEntityRepository.save(followDto.toEntity());
            if(followEntity.getFno()>0)return true;
        };
        return false;
    }
    // ======================== [언팔로우] ======================== //
    public boolean doFollowDelete(int fno){
        if(memberService.loginInfo()!=null){
            followEntityRepository.delete(FollowEntity.builder().fno(fno).build());
        }
        return true;
    }
    // ======================== [팔로워 수 ] ======================== //
    public int doFollowerGet(int mno){
        return followEntityRepository.doFollowerGet(mno);
    }
    // ======================== [팔로워 이름 ] ======================== //
    public List<FollowDto> doFollowerNameGet(int mno){
        List<Map<Object,Object>> mapList = followEntityRepository.doFollowerNameGet(mno);
        List<FollowDto> followList = new ArrayList<>();
        for (int i=0; i<mapList.size(); i++){
            Map<Object, Object> map = mapList.get(i);
            FollowDto followDto = FollowDto.builder()
                    .fno((Integer) map.get("fno"))
                    .mno((Integer) map.get("mno"))
                    .mname((String) map.get("mname"))
                    .mnickname((String) map.get("mnickname"))
                    .build();
            followList.add(followDto);
        }
        return followList;
    }
    // ======================== [ 팔로잉 수 ] ======================== //
    public int doFollowingGet(int mno){
        return followEntityRepository.doFollowingGet(mno);
    }
    // ======================== [ 팔로잉 확인 ] ======================== //
    public List<FollowDto> doFollowingNameGet(int mno){
        List<Map<Object,Object>> mapList = followEntityRepository.doFollowingNameGet(mno);
        List<FollowDto> followList = new ArrayList<>();
        for (int i=0; i<mapList.size(); i++){
            Map<Object, Object> map = mapList.get(i);
            FollowDto followDto = FollowDto.builder()
                    .fno((Integer) map.get("fno"))
                    .mno((Integer) map.get("mno"))
                    .mname((String) map.get("mname"))
                    .mnickname((String) map.get("mnickname"))
                    .build();
            followList.add(followDto);
        }
        return followList;
    }
    // ======================== [ 팔로우 확인 ] ======================== //
    public FollowDto doFollowFind(int tofollow){
        if(memberService.loginInfo().getMno() == tofollow){
            return null;
        }
        if(memberService.loginInfo()!=null){
            FollowEntity followEntity = followEntityRepository.findByFromfollowAndTofollow(memberService.loginInfo().getMno(), tofollow);
            if(followEntity != null){
                return followEntity.toDto();
            }else{
                return null;
            }
        }
        return null;
    }
}
