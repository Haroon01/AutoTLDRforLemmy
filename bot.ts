import LemmyBot from 'lemmy-bot';
import Smmry from './Smmry';
import * as dotenv from 'dotenv';

dotenv.config();

const smmry  = new Smmry();

function comment(char_count: string, content: string, content_reduced: string){
  return `Content Reduced By ${content_reduced}\n\n>${content}\n\nCharacter Count: ${char_count}\n\n(This is an automated comment.)`
}

const bot = new LemmyBot({
  // Pass configuration options here
  credentials:{
    username: process.env.USERNAME || "",
    password: process.env.PASSWORD || "",
  },

  instance: process.env.INSTANCE || "",

  connection: {
    secondsBetweenPolls: 30,
  },
  federation: 'local',
  handlers: {

    async mention ({
      mentionView: { post },
      botActions: { createComment }
    }){
      const postUrl: string = post?.url || "";
      const res = await smmry.execute(postUrl);
      const data = res.data;
      const chars = data.sm_api_character_count;
      const content = data.sm_api_content;
      const reduced = data.sm_api_content_reduced;
      createComment({
        post_id: post.id,
        
        content: comment(chars, content, reduced)
      })
      
    }
  }
});

bot.start();