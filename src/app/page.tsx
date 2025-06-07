export default function Home() {
  return (
    <div className="container h-screen m-auto">
      <div className="bento mt-30">
        <div className="card border-1 border-solid border-gray-300 h-36 rounded-md flex" style={{ 'gridArea': 'info'}}>
          <img className="w-[136px] h-[136px]" src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20250607youmiya01.png" alt="公示照"  />
          <div>
            <ruby className="text-2xl">
              羊宮
              <rt>ようみや</rt>
              妃那
              <rt>ひな</rt>
            </ruby>
          </div>
        </div>
      </div>
    </div> 
  );
}
