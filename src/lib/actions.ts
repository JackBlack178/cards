import axios from "axios";
import { articleActions } from "../store/articles";
import { AppDispatch } from "../store";

export function getArticles() {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get("http://localhost:3000/articles");
    const data = await response.data;
    const articles = data.body;
    dispatch(articleActions.getArticles(articles));
  };
}
