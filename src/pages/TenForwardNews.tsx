import styled from "styled-components";
import guinan from '../assets/guinan.jpg'
import { useEffect, useState } from "react";
import { createPost, deletePost, editPost, fetchPosts, userData } from "../api";
import { Post } from "../types/posts";
import { User } from "../types/users";

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  background: url(${guinan}) no-repeat center;
  background-size: cover;
  background-position: bottom;
  padding-top: 500px;
  width: 100%;
  position: relative;

  & > span {
    font-size: 48px;
    font-weight: 400;
    position: absolute;
    bottom: 10vh;
    left: 5vw;
    text-align: start;
  }
  @media (max-width: 768px) {
    & > span {
      bottom: 8vh;
      left: 3vw;
    }
  }
`;
const PostList = styled.div`
  // estilos para a lista de posts...
`;



const CreatePostForm = styled.form`
  // estilos para o formulário de criação de post...
`;

const EditModal = styled.div`
  // estilos para o modal de edição (opcional)...
`;


const TenForwardNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [abstract, setAbstract] = useState<string>('');
  const [reloadPosts, setReloadPosts] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingAbstract, setEditingAbstract] = useState<string>('');
  const [, setLoggedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const postOwner = localStorage.getItem('user_id')
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    async function fetchAllUsers() {
      if (token) {
        const allUsers = await userData(token)
        setUsers(allUsers)
      }
    }
    fetchAllUsers()
  }, [token])

  useEffect(() => {
    async function fetchUserData() {
      if (token) {
        const user = await userData(token)
        setLoggedUser(user);
      }
    }
    fetchUserData();
  }, [token]);


  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts()
      setPosts(data)
    }
    loadPosts();
    setReloadPosts(false);
  }, [reloadPosts]);

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      const userId = parseInt(localStorage.getItem('user_id') || '0')
      const { post: newPost } = await createPost(title, abstract, postContent, userId)
      setPosts([newPost, ...posts])
      setTitle('')
      setAbstract('')
      setPostContent('')
      setReloadPosts(true);
  }

  const handleEditPost = async (postId: number, updatedTitle: string, updatedAbstract: string, updatedContent: string) => {

      const updatedData = {
        title: updatedTitle,
        abstract: updatedAbstract,
        text: updatedContent
      };
      const updatedPost = await editPost(postId, updatedData)
      setPosts(posts.map(post => post.id === postId ? updatedPost : post))
      setEditingPostId(null)
      setEditingTitle('')
      setEditingAbstract('')
      setEditingContent('')
  }

  const handleDeletePost = async (postId:number) => {
    try {
      await deletePost(postId)
      setPosts(posts.filter(p => p.id !== postId))
    } catch (error) {
      console.error("Erro ao deletar post:", error)
    }
  };

  return (
    <Wrapper>
      <Header>
        <span>Guinan's Ten Foward</span>
      </Header>
      <CreatePostForm onSubmit={handleSubmitPost}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do Post" />
        <input value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Resumo do Post" />
        <textarea value={postContent} onChange={e => setPostContent(e.target.value)}></textarea>
        <button type="submit">Criar Post</button>
      </CreatePostForm>
      <PostList>
        {posts.map(post => {
          if (!post) return null
          const postUser = users.find(user => user.id === post.user_id)
          return (
            post && (
              <div key={post.id}>
                <div>{post.title}</div>
                <div>{post.abstract}</div>
                <div>{post.text}</div>

                {postUser && (
                  <>
                    <img src={postUser.profile_pic} alt={`${postUser.name}'s profile`} />
                    <div>{postUser.name}</div>
                    <div>{postUser.email}</div>
                  </>
                )}

                {postOwner && parseInt(postOwner, 10) === post.user_id ? (
                  <>
                    <button onClick={() => setEditingPostId(post.id)}>Editar</button>
                    <button onClick={() => handleDeletePost(post.id)}>Deletar</button>
                  </>
                ) : null}
              </div>
            )
          );
        })}
      </PostList>
      {editingPostId && (
          <EditModal>
            <input
              value={editingTitle}
              onChange={e => setEditingTitle(e.target.value)}
              placeholder="Título do Post"
            />
            <input
              value={editingAbstract}
              onChange={e => setEditingAbstract(e.target.value)}
              placeholder="Resumo do Post"
            />
            <textarea
              value={editingContent}
              onChange={e => setEditingContent(e.target.value)}
            ></textarea>
            <button onClick={() => handleEditPost(editingPostId, editingTitle, editingAbstract, editingContent)}>Salvar</button>
            <button onClick={() => setEditingPostId(null)}>Cancelar</button>
          </EditModal>
        )}
    </Wrapper>
  );
}

export default TenForwardNews;
