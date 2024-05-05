package connectweb.connect_back.model.repository.board;


import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface GalleryEntityRepository extends JpaRepository<GalleryEntity, Integer> {
    @Query(value = "select* from Gallery where bno= :bno" ,  nativeQuery = true)
    List<Map<Object,Object>> fineGallery(int bno);

    //이미지삭제(게시물 수정용)
    @Query(value = "select gno from gallery where gname = :gname", nativeQuery = true)
    int findGno(String gname);

}
