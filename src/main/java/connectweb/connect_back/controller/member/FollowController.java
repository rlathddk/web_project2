package connectweb.connect_back.controller.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.service.member.FollowService;
import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conn/m")
@CrossOrigin("http://localhost:3000")
public class FollowController {

    @Autowired
    FollowService followService;

    // ======================== [팔로우] ======================== //
    @PostMapping("/follow/post.do")
    public boolean doFollowPost(@RequestBody FollowDto followDto){
        return followService.doFollowPost(followDto);
    }
    // ======================== [언팔로우] ======================== //
    @DeleteMapping("/follow/delete.do")
    public boolean doFollowDelete(int fno){
        return followService.doFollowDelete(fno);
    }
    // ======================== [ 팔로워 수 ] ======================== //
    @GetMapping("/follower/get.do")
    public int doFollowerGet(@RequestParam int mno) {
        return followService.doFollowerGet(mno);
    }
    // ======================== [ 팔로워 이름 요청 ] ======================== //
    @GetMapping("/follower/name/get.do")
    public List<FollowDto> doFollowerNameGet(@RequestParam int mno){
        return followService.doFollowerNameGet(mno);
    }
    // ======================== [ 팔로잉 수 ] ======================== //
    @GetMapping("/following/get.do")
    public int doFollowingGet(@RequestParam int mno){
        return followService.doFollowingGet(mno);
    }
    // ======================== [ 팔로잉 이름 요청 ] ======================== //
    @GetMapping("/following/name/get.do")
    public List<FollowDto> doFollowingNameGet(@RequestParam int mno){
        return followService.doFollowingNameGet(mno);
    }
    // ======================== [ 팔로우 확인 ] ======================== //
    @GetMapping("/follow/get.do")
    public FollowDto doFollowFind(@RequestParam int tofollow){
        return followService.doFollowFind(tofollow);
    }
}
