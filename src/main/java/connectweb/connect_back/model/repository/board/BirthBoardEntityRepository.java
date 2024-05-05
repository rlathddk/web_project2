package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BirthBoardEntityRepository extends JpaRepository<BirthBoardEntity, Integer> {


    // list 출력
    @Query(value = "select * from birthboard", nativeQuery = true)
    List<Map<Object,Object>> findAllBirthBoardSQL();

    // view 출력
    @Query(value = "selelct * from member m inner birthboard bb on m.mno=bb.mno where m.mno = :mno", nativeQuery = true)
    List<Map<Object,Object>> findViewBirthBoardSQL(int mno);
}
