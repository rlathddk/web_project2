package connectweb.connect_back.model.repository.board;


import connectweb.connect_back.model.dto.ReplyDto;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ReplyEntityRepository extends JpaRepository<ReplyEntity, Integer> {
    @Query(value ="select * from reply r inner join member m on m.mno = r.mno where bno=:bno ORDER BY r.rno asc", nativeQuery = true)
    List<Map<Object,Object>>findByBno(int bno);

}
