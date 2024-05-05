package connectweb.connect_back.model.repository.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.entity.member.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface FollowEntityRepository extends JpaRepository<FollowEntity, Integer> {

    // ======================== [팔로워 수] ======================== //
    @Query(value = "select count(*) from follow f join member m on m.mno = f.fromfollow where f.tofollow = :mno", nativeQuery = true)
    int doFollowerGet(int mno);
    // ======================== [팔로워 이름 확인] ======================== //
    @Query(value = "select f.fno, m.mno, m.mname, m.mnickname from follow f join member m on m.mno = f.fromfollow where f.tofollow = :mno", nativeQuery = true)
    List<Map<Object,Object>> doFollowerNameGet(int mno);
    // ======================== [팔로잉 수] ======================== //
    @Query(value = "select count(*) from follow f join member m on m.mno = f.tofollow where f.fromfollow = :mno", nativeQuery = true)
    int doFollowingGet(int mno);
    // ======================== [팔로잉 확인] ======================== //
    @Query(value = "select f.fno, m.mno, m.mname, m.mnickname from follow f join member m on m.mno = f.tofollow where f.fromfollow = :mno", nativeQuery = true)
    List<Map<Object,Object>> doFollowingNameGet(int mno);

    // ======================== [팔로잉 확인] ======================== //
    @Query(value = "select * from follow where fromfollow = :fromfollow and tofollow = :tofollow", nativeQuery = true)
    FollowEntity findByFromfollowAndTofollow(int fromfollow, int tofollow);

}
