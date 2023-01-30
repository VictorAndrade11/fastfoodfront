import axios from "axios";
import { api } from "./api";

export const getFetcher = (url) => axios.get(url).then((res) => res.data);
