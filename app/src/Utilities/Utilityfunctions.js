import { formatDistanceToNow } from 'date-fns';


export function formatDateRelative(date) {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}



export async function getComments(videoId, filter, limit,token) {
    const url = "http://localhost:5000/youtube/comments/response";

    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                videoId,
                filter,
                limit
            }),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            } 
        });

        const data = await res.json();
        if(data.error){
            console.error(data.error);
            return [];
        }
        return data.comments;
    } catch (error) {
        console.log(error);
        return [];
    }
}
