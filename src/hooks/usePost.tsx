import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

const usePost = () => useContext(PostContext);

export default usePost;
