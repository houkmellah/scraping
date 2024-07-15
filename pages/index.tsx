import { useEffect } from "react";


const fetchData = async () => {
  try {
    const data = await fetch("/api/scrape");
    const response = await data.json();
    console.log("Response ====>", response);
  } catch (error) {
    console.error("Error to fetch data ====>", error);
  }
  
  
};
export default function Home() {
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Hello World</div>;
}
