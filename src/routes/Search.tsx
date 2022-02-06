import { useLocation } from "react-router-dom";

function Search() {
  // 지금 있는 곳에 관한 정보를 준다
  const location = useLocation();
  // URLSearchParams는 자바스크립트 기본 기능으로, 파싱하기 쉽게 =단위로 value를 분리해 준다
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  return <div></div>;
}

export default Search;
