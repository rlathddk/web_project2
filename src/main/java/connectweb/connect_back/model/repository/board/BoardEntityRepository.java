package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardEntityRepository extends JpaRepository<BoardEntity, Integer> {

    //내글출력
    @Query(value = "select * from member m inner join board b on m.mno=b.mno where m.mno = :mno order by bno desc;", nativeQuery = true)
    public List<Map<Object,Object>> findMyBoardList(int mno);

    @Query(value = "select * from board b inner join gallery g on b.bno=g.bno where b.bno = :bno", nativeQuery = true)
    public List<Map<Object,Object>> findBno(Object bno);

    // 전체글 출력
    @Query(value = " select m.mno, m.mnickname, m.mname, m.mimg, b.bno, b.bcontent, b.cdate from member m inner join board b on m.mno = b.mno order by b.cdate desc;" , nativeQuery = true )
    List<Map<Object,Object>> findAllBoardSQL();

    @Query(value = "SELECT  m.mno, m.mnickname, m.mname, m.mimg, b.bno, b.bcontent, b.cdate " +
            "FROM board b " +
            "INNER JOIN member m ON b.mno = m.mno " +
            "ORDER BY b.bno DESC " +
            "LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Map<Object, Object>> findBoardByPageSQL(@Param("offset") int offset, @Param("limit") int limit);



}

