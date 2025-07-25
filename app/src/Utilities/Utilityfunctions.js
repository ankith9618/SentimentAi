const API_KEY = '';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';


import {formatDistanceToNow} from 'date-fns';


export function formatDateRelative(date) {
    if(!date) return '';
    return  formatDistanceToNow(new Date(date),{addSuffix:true});
}



export async function getComments(videoId,filter,limit) {
    const MAX_COMMENTS = 200;
    const allComments = [];
    let pageToken = '';

    try {
        while (allComments.length < MAX_COMMENTS) {
            const url = `${BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=100&pageToken=${pageToken}&textFormat=plainText`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) {
                console.error('API Error:', data.error);
                break;
            }

            const comments = data.items.map(item => {
                const comment = item.snippet.topLevelComment.snippet;
                return {
                    author: comment.authorDisplayName,
                    text: comment.textDisplay,
                    likes: comment.likeCount,
                    publishedAt: comment.publishedAt,
                    lastUpdated: comment.updatedAt,

                };
            });

            const remaining = MAX_COMMENTS - allComments.length;
            allComments.push(...comments.slice(0, remaining));

            if (!data.nextPageToken || allComments.length >= MAX_COMMENTS) {
                break;
            }

            pageToken = data.nextPageToken;
        }
        return allComments;

    } catch (error) {
        console.error('Fetch error:', error);
        return allComments;
    }
}
