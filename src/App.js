import React from "react";
import './App.scss';

import axios from "axios";

function App() {

    const [posts, setPosts] = React.useState([])
    const [newPostValue, setNewPostValue] = React.useState('')
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        const response = axios.get('http://localhost:3001/posts').then(({data})=>{
            setPosts(data)
        })

    }, [])


    const onChangeCreateInput = (event) => {
        setNewPostValue(event.target.value)

    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)

    }

    const onCreatePost = () => {
        axios.post('http://localhost:3001/posts', {
            text: newPostValue
        })
        setPosts((prev)=> [...prev, {
            text: newPostValue
        }])
        setNewPostValue('')

    }

    const onDeletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}` )
        setPosts((prev) => prev.filter((item) => item.id !== id))

    }

    const onEdit =(postId, postText) => {
        const newPostText = window.prompt('Текст поста', postText)
        const newList = posts.map(item => {
            if(item.id === postId){
                item.text = newPostText
            }
            return item;
        })
        setPosts(newList)

    }


    const renderItems = () => {
        const filteredItems = posts.filter(post => post.text.toLowerCase().includes(searchValue.toLowerCase()))
        return (filteredItems).map((item, index) => (
            <>
                <div key={item.id} className="item">
                    <p>{item.text}</p>
                    <div>
                        <button onClick={()=>onEdit(item.id, item.text)} className="greenBtn">Редактировать</button>
                        <button onClick={()=> onDeletePost(item.id)} className="redBtn">Удалить</button>
                    </div>

                </div>
            </>
        ))
    }


  return (
    <div className="wrapper">
        <div className="addPost">
            <h2>Добавить заметку</h2>
            <div>
                <input onChange={onChangeCreateInput} value={newPostValue} placeholder="Введите текст..."/>
                <button onClick={onCreatePost} className="greenBtn">
                    Сохранить
                </button>
            </div>

        </div>
        <div className="searchTag">
            <h2>Искать по тэгу</h2>
            <div>
                <input onChange={onChangeSearchInput}  value={searchValue} placeholder="Введите тэг..."/>
                <button className="greenBtn">
                    Искать
                </button>
            </div>

        </div>
        <div className="items">
            {renderItems()}

        </div>
    </div>
  );
}

export default App;
