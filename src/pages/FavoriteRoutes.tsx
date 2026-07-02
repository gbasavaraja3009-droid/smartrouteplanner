export default function FavoriteRoutes() {

const routes = JSON.parse(
localStorage.getItem("favoriteRoutes") || "[]"
);

return (

<div
style={{
padding:"30px"
}}
>

<h1>⭐ Favorite Routes</h1>

{routes.length===0?

<p>No saved routes.</p>

:

routes.map((route:any,index:number)=>(

<div
key={index}
style={{
background:"#1f2937",
color:"white",
padding:"20px",
marginTop:"15px",
borderRadius:"15px"
}}
>

<h2>{route.name}</h2>

<p>💰 ₹{route.cost}</p>

<p>⏱ {route.time} min</p>

<p>⭐ AI Score {route.aiScore}</p>

</div>

))

}

</div>

);

}