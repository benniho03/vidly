import { db } from '~/server/db';

async function removeDuplicateVideoIds() {
  try {
    // Schritt 1: Finde alle videoIds, die mehr als einmal vorkommen
    const duplicateVideoIds = await db.videos.groupBy({
      by: ['videoId'],
      _count: {
        videoId: true
      },
      having: {
        videoId: {
          _count: {
            gt: 1
          }
        }
      }
    });
console.log("Gefundene Duplicates: ", duplicateVideoIds.length)
    // Schritt 2: Iteriere über jede duplicateVideoId und lösche die Duplikate
    for (const duplicate of duplicateVideoIds) {
      const { videoId } = duplicate;
      const videos = await db.videos.findMany({
        where: { videoId },
        orderBy: { id: 'asc' } // Annahme: 'id' ist der Primärschlüssel
      });

      // Behalte das erste Vorkommen und lösche die restlichen
      for (let i = 1; i < videos.length; i++) {
        await db.videos.delete({
          where: { id: videos[i].id }
        });
      }
    }
  } catch (error) {
    console.error(error);
  } 
}

await removeDuplicateVideoIds();