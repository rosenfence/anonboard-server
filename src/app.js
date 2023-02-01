const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.listen(3001, () => {
  console.log('http://localhost:3001');
});

//게시글 들어갈곳
const posts = {
  data: [],
  id: 1,
};

//! 글 읽어오기
app.get('/', (req, res) => {
  res.send(posts.data);
  console.log('get 요청 발생');
});

//! 글 작성하기
app.post('/', (req, res) => {
  const { password, content } = req.body;
  //password랑 글내용이 들어와야함
  if (!password || !content) {
    res.status(400).send({ message: 'password, content는 필수 입력 내용입니다.' });
    return;
  }

  //다 만족하면 글 작성
  posts.data.push({ ...req.body, id: posts.id });
  posts.id++;
  res.send({ message: '게시글이 등록되었습니다.' });
  console.log('post 요청 발생');
});

//! 글 수정하기
app.patch('/', (req, res) => {
  const { password, content, id } = req.body;
  //password랑 content(수정할 content)랑 id를 받아야함
  if (!id || !password || !content) {
    res.status(400).send({ message: '게시글 id, password, content는 필수 입력 내용입니다.' });
    return;
  }
  //보내준 id랑 같은 post가 목록에 있는지 찾아줘
  const post = posts.data.find((post) => post.id === parseInt(id));
  if (!post) {
    res.status(400).send({ message: '게시글이 존재하지 않습니다.' });
    return;
  }
  //password 일치하는지 확인
  if (password !== post.password) {
    res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
    return;
  }

  //다 만족하면 글 수정
  post.content = content;
  res.send({ message: '게시글이 수정되었습니다.' });
  console.log('patch 요청 발생');
});

//! 글 삭제하기
app.delete('/', (req, res) => {
  const { password, id } = req.body;
  //password랑 id를 받아야함
  if (!id || !password) {
    res.status(400).send({ message: '게시글 id, password는 필수 입력 내용입니다.' });
    return;
  }
  //보내준 id랑 같은 post가 목록에 있는지 찾아줘
  const post = posts.data.find((post) => post.id === parseInt(id));
  if (!post) {
    res.status(400).send({ message: '게시글이 존재하지 않습니다.' });
    return;
  }
  //password 일치하는지 확인
  if (password !== post.password) {
    res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
    return;
  }

  //다 만족하면 글 삭제
  posts.data = posts.data.filter((_post) => _post.id !== post.id);
  res.send({ message: '게시글을 삭제했습니다.' });
  console.log('delete 요청 발생');
});
