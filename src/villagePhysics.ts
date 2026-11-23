/** Two-dimensional collision geometry on the snowy ground. */
export type Obstacle = {kind:'circle'; x:number; z:number; radius:number} | {kind:'box'; x:number; z:number; halfWidth:number; halfDepth:number};
export type GroundPoint={x:number;z:number};
export function isBlocked(p:GroundPoint,obstacles:Obstacle[],radius=0.65){return obstacles.some(o=>{if(o.kind==='circle')return Math.hypot(p.x-o.x,p.z-o.z)<o.radius+radius;const x=Math.max(o.x-o.halfWidth,Math.min(p.x,o.x+o.halfWidth)),z=Math.max(o.z-o.halfDepth,Math.min(p.z,o.z+o.halfDepth));return Math.hypot(p.x-x,p.z-z)<radius})}
/** Small swept steps prevent a quick drag from tunnelling through a house. */
export function moveWithCollisions(start:GroundPoint,delta:GroundPoint,obstacles:Obstacle[],radius=.65):GroundPoint{const count=Math.max(1,Math.ceil(Math.hypot(delta.x,delta.z)/.18));const sx=delta.x/count,sz=delta.z/count;let p={...start};for(let i=0;i<count;i++){let x=Math.max(-22,Math.min(22,p.x+sx)),z=Math.max(-22,Math.min(22,p.z+sz));if(!isBlocked({x,z:p.z},obstacles,radius))p.x=x;if(!isBlocked({x:p.x,z},obstacles,radius))p.z=z}return p}
