package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.BoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardLikeEntityRepository extends JpaRepository<BoardLikeEntity, Integer> {
    @Query(value = "select count(*) from boardlike where bno = :bno", nativeQuery = true)
    int doLikeGet(int bno);

    @Query(value = "select * from boardlike where mno = :mno and bno = :bno", nativeQuery = true)
    BoardLikeEntity doSelectLno(int mno, int bno);

    @Query(value = "select count(*) from boardlike where mno = :mno and bno = :bno", nativeQuery = true)
    int doLike(int mno, int bno);
}
