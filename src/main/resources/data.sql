
    insert into member(mname, mphone, mid, mnickname, mpw, memail, mbirth, mimg) values
    ('김민지','010-7897-1122','adminji06','adminji_','1111','adminji06@ezen.com','980417', 'default.png'),
    ('김송아','010-6589-3446','abc777z','song','1111','abc777z@ezen.com','990420', 'default.png'),
    ('박효성','010-3256-4568','sere4580','hyosajang','1111','sere4580@ezen.com','960303', 'default.png'),
    ('장혜란','010-1536-2458','jang333','jangchen','1111','jang333@ezen.com','970504', '프로필1.png');


    insert into board(bcontent, mno) values
    ('롯데월드에 놀러갔어요. 가서 자이로드롭 탔습니다~ 아주 재밌어요',1),('Coffee',2),('일본여행~☆',3),('Ocean view',4),('Seoul City',1),
    ('여수 밤바다',1),('오사카 3일차...더보기',2),('★',1),('안녕 푸바오',2),('날씨 너무 좋아~',2),
    ('연극이 끝나고 난 뒤~',3),('오랜만에 바다 여행',4),('감성 난 그런거 잘 몰루',1),('낙엽이 뒹굴뒹굴',2),('눈 내린다~',2);


    insert into gallery(gname, bno) values
    ('롯데월드1.jpg',1),('롯데월드2.jpg',1),('롯데월드3.jpg',1),('coffee1.jpg',2),('coffee2.jpg',2),('일본1.jpg',3),('일본2.jpg',3),
    ('오션뷰1.jpg',4),('서울1.jpg',5),('여수1.jpg',6),('여수2.jpg',6),('오사카1.jpg',7),('오사카2.jpg',7),('오사카3.jpg',7),
    ('별1.jpg',8),('별2.jpg',8),('푸바오1.png',9),('푸바오2.jpg',9),('서울대공원1.jpg',10),('서울대공원2.jpg',10),('연극1.jpg',11),('연극2.jpg',11),
    ('연극3.jpg',11),('바다1.jpg',12),('바다2.jpg',12),('인스타1.jpg',13),('인스타2.jpg',13),('가을1.jpg',14),('가을2.jpg',14),('가을3.jpg',14),('겨울1.jpg',15);


    insert into reply(rcontent, bno, mno) values
    ('재밌겠당',1,2),('다음에 나도 같이 가',2,3),('오늘 재밌었어~',6,4),('잘가 푸바오 ㅠㅠㅠ',9,1),('어디야어디야 알려줘',2,2),('완전이뻐',2,4);

    insert into follow(tofollow, fromfollow) values
    (1, 2),(1, 3),(1, 4),(2, 1),(3, 1),(4, 1);

    insert into birthboard(bbcontent, mno, cdate, bbimg) values
    ("생일축하해~", 1, '2024-04-09','생일축하1.jpg'),("탄생 축하", 2, '2024-04-09','생일축하2.png'),("Happy Birth Day", 3, '2024-04-09','생일축하3.jpg');


