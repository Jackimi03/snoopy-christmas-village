const stories = [
['Una luz en la nieve','En la plaza apareció una pequeña luz dorada. Era una invitación a empezar diciembre con alegría.'],
['El primer paseo','Una huella cruzaba la nieve hasta la casita roja. ¿De quién sería?'],
['Un deseo para hoy','Piensa en algo pequeño que te haga sonreír y compártelo con alguien.'],
['La estrella perdida','Una estrella cayó junto al pino. Entre todos encontraron un lugar para ella.'],
['Una tarde de juegos','Los amigos se reunieron en la plaza para jugar hasta que encendieron los faroles.'],
['Una carta especial','Escribe unas palabras bonitas para alguien que quieres.'],
['Copos viajeros','Cada copo tomó un camino distinto y todos llegaron a la misma plaza.'],
['El regalo invisible','Un abrazo, una canción o una sonrisa también pueden ser regalos.'],
['La bufanda roja','Una bufanda apareció en la puerta. Era justo lo que necesitaba una tarde fría.'],
['Pequeños recuerdos','Recuerda un momento feliz de este año y guárdalo en tu corazón.'],
['El árbol de la plaza','Cada adorno cuenta una historia diferente. ¿Cuál pondrías tú?'],
['Una sorpresa en el taller','Entre papeles y cintas nació un regalo hecho con mucho cariño.'],
['La noche estrellada','El cielo se llenó de estrellas y la aldea se quedó mirando en silencio.'],
['Una buena acción','Hoy es un buen día para ayudar a alguien sin esperar nada a cambio.'],
['El camino de luces','Los faroles iluminaron el camino para que todos pudieran llegar a casa.'],
['Una receta para sonreír','Mezcla una canción, una buena compañía y un poquito de imaginación.'],
['La postal viajera','Una postal cruzó montañas para llevar un mensaje de cariño.'],
['La canción del viento','El viento movió las ramas del pino como si dirigiera una orquesta.'],
['Un paseo por la aldea','Hay magia en los detalles: una ventana iluminada, una huella, una risa.'],
['La caja de los deseos','Dentro había deseos de paz, salud y muchos momentos compartidos.'],
['El farol encendido','Un pequeño farol recordó a todos que siempre hay luz para compartir.'],
['Una noche de cuentos','Los amigos inventaron una historia y cada uno añadió una frase.'],
['Casi Navidad','La aldea está lista. Solo falta reunir a las personas que queremos.'],
['Nochebuena','Que esta noche esté llena de cariño, tranquilidad y pequeños momentos inolvidables. ¡Feliz Navidad!']];
const json=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
function dayAt(now){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Panama',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);let get=k=>Number(p.find(x=>x.type===k).value);let y=get('year'),m=get('month'),d=get('day');return y<2026||y===2026&&m<12?0:y>2026||m>12?24:Math.min(24,d)}
async function hash(s){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function onRequest({request,env,params}){try{const route=(params.path||[]).join('/');const url=new URL(request.url);const unlocked=dayAt(new Date());let recipient=null;const auth=request.headers.get('authorization');if(auth){if(!auth.startsWith('Bearer ')||!env.DB)return json({error:'Acceso no disponible'},401);let token=auth.slice(7);if(!/^[A-Za-z0-9_-]{32,128}$/.test(token))return json({error:'Enlace privado inválido'},401);recipient=await env.DB.prepare('SELECT id, display_name FROM recipients WHERE token_hash = ?').bind(await hash(token)).first();if(!recipient)return json({error:'Enlace privado inválido'},401)}
if(route==='status'&&request.method==='GET'){let opened=[];if(recipient){let rows=await env.DB.prepare('SELECT day FROM progress WHERE recipient_id = ? ORDER BY day').bind(recipient.id).all();opened=rows.results.map(r=>r.day)}return json({serverTime:new Date().toISOString(),unlocked,private:!!recipient,name:recipient?.display_name||'',opened})}
if(route==='name'&&request.method==='POST'&&recipient){let body=await request.json();let name=typeof body.name==='string'?body.name.trim().slice(0,40):'';if(!name)return json({error:'Escribe tu nombre'},400);await env.DB.prepare('UPDATE recipients SET display_name = ? WHERE id = ?').bind(name,recipient.id).run();return json({name})}
if(route==='surprise'&&request.method==='GET'){let day=Number(url.searchParams.get('day'));if(!Number.isInteger(day)||day<1||day>24)return json({error:'Día inválido'},400);if(day>unlocked)return json({error:'Esta sorpresa aún no está disponible'},403);if(recipient)await env.DB.prepare('INSERT OR IGNORE INTO progress (recipient_id,day,opened_at) VALUES (?,?,?)').bind(recipient.id,day,new Date().toISOString()).run();return json({day,title:stories[day-1][0],text:stories[day-1][1]})}
return json({error:'No encontrado'},404)}catch{return json({error:'Servicio temporalmente no disponible'},503)}}
