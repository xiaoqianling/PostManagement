import style from './app.module.css'
import AddPostForm from "@/app/AddPostForm";
import PostsList from "@/app/PostsList";

export default function Home() {
    return (
        <div className={style.main}>
            <AddPostForm/>
            <PostsList/>
        </div>
    )
}
