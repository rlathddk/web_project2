drop database if exists connectweb;
create database connectweb;
use connectweb;


select * from board;
select * from member;
select * from gallery;
select * from reply;
select * from follow;
select * from boardlike;

select lno from boardlike where mno = 1 and bno = 1;

update member set mname = "유재석", mnickname = "aac", memail = "aaa@aab.com", mphone = "010-1111-1112" where mno=1;

# 팔로워
select f.fno, m.mno, m.mname, m.mnickname from follow f join member m on m.mno = f.fromfollow where f.tofollow = 1;
select count(*) from follow f join member m on m.mno = f.fromfollow where f.tofollow = 1;
# 팔로잉
select f.fno, m.mno, m.mname, m.mnickname from follow f join member m on m.mno = f.tofollow where f.fromfollow = 1;
select count(*) from follow f join member m on m.mno = f.tofollow where f.fromfollow = 1;

select * from follow where tofollow = 4 or fromfollow = 4;

select * from member m inner join board b on m.mno = b.mno;
select * from gallery g inner join board b on g.bno = b.bno;

select * from board b inner join member m on b.mno = m.mno inner join gallery g on b.bno = g.bno;

select count(*) from follow where fromfollow = 5 and tofollow = 1;