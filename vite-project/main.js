import './src/css/home.css';
import { supabase } from "./supabase";

// Connecting to the Supabase database
const useData = async () => {
  const { data, error } = await supabase.from("users").select();
  return data;
}
const data = useData();
console.log(data);

