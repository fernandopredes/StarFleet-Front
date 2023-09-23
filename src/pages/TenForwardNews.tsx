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

const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 20px;
  background-color: rgba(176, 176, 176, 0.1);
  border: 2px solid #B0B0B0;
  border-radius: 5px;
  width: 100%;
  width: 1000px;
`

const PostImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`

const PostDetails = styled.div`
  flex: 1;
`

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: rgba(234, 234, 234, 0.1);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(236, 236, 236, 1);
    color: #171717;
  }

  & + & {
    margin-top: 1rem;
    margin-left: 1rem;
  }
`;

const FormWrapper = styled.div`
  background-color: rgba(176, 176, 176, 0.1);
  border: 2px solid #B0B0B0;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 90%;
`

const StyledTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  width: 500px;
  resize: none;
`
const PostList = styled.div`

`

const CreatePostForm = styled.form`
`


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
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
        setLoggedUser(user)
      }
    }
    fetchUserData()
  }, [token])


  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts()
      setPosts(data)
    }
    loadPosts();
    setReloadPosts(false)
  }, [reloadPosts])

  useEffect(() => {
    if (editingPostId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    };
  }, [editingPostId])

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
      <FormWrapper>
        <StyledInput value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <StyledInput value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Subject" />
        <StyledTextarea value={postContent} onChange={e => setPostContent(e.target.value)}placeholder="Your text here"></StyledTextarea>
        <StyledButton type="submit">Create</StyledButton>
      </FormWrapper>
      </CreatePostForm>
      <PostList>
        {posts.map(post => {
          if (!post) return null
          const postUser = users.find(user => user.id === post.user_id)
          return (
            post && (
              <PostWrapper key={post.id}>
                {postUser && <PostImage src={postUser.profile_pic} alt={`${postUser.name}'s profile`} />}
                <PostDetails>
                  {postUser && (
                    <>
                      <div>{postUser.name}</div>
                      <div>{postUser.email}</div>
                    </>
                  )}
                  <div>{post.title}</div>
                  <div>{post.abstract}</div>
                  <div>{post.text}</div>
                  {postOwner && parseInt(postOwner, 10) === post.user_id ? (
                    <>
                      <StyledButton onClick={() => setEditingPostId(post.id)}>Edit</StyledButton>
                      <StyledButton onClick={() => handleDeletePost(post.id)}>Delete</StyledButton>
                    </>
                  ) : null}
                </PostDetails>
              </PostWrapper>
            )
          );
        })}
      </PostList>
        {editingPostId && (
          <ModalOverlay onClick={() => setEditingPostId(null)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <StyledInput
                value={editingTitle}
                onChange={e => setEditingTitle(e.target.value)}
                placeholder="Title"
              />
              <StyledInput
                value={editingAbstract}
                onChange={e => setEditingAbstract(e.target.value)}
                placeholder="Subject"
              />
              <StyledTextarea
                value={editingContent}
                onChange={e => setEditingContent(e.target.value)}
              ></StyledTextarea>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton onClick={() => handleEditPost(editingPostId, editingTitle, editingAbstract, editingContent)}>Save</StyledButton>
                <StyledButton onClick={() => setEditingPostId(null)}>Cancel</StyledButton>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
    </Wrapper>
  );
}

export default TenForwardNews;
