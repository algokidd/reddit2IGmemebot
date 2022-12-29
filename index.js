"use strict"
const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const config = require("./config.json")
const  {subreddits,username, password,tags} = config; 
const list = subreddits;
const cookieStore = new FileCookieStore('./cookies.json')
const client = new Instagram({ username, password, cookieStore });
const fs = require('fs');
const got = require('got');
const download = require('image-downloader')
const sharp = require('sharp');
const Buffer = require('buffer');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });






async function check(link, capption) {

   
        
   
        var caption_tags = tags[Math.floor(Math.random() * tags.length)];
        let caption = " " + capption  +"\n\nfollow me for more content\n" + `\n\n\n\n${caption_tags}`;
 
    if (typeof link === 'undefined') {
        console.log("undefined");
    }

    fs.readFile('./memefile.txt', 'utf8', function (err, data) {
        if (err)
            throw err;


        if (!data.includes(link)) {
            fs.appendFile("./memefile.txt", `\n${link}`, async function (err) {
                const options = {
                    url: `${link}`,
                    dest: './memes'
                };
                download.image(options).then(({ filename }) => {
                    console.log('Saved to', filename);
                    var filename = filename.replace("\\","/")
                  
                    const promise = fs.promises.readFile(path.join(`./${filename}`));
                  Promise.resolve(promise).then(function(buffer){
                       
                       
                         sharp(buffer).resize(1080, 1350, {fit:"contain"}).toFile(`./${filename}`,async (err, info) => {
                         
                             
                                await client.login();
                              
                                let photo =`./${filename}`;
                                // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
                          
                                const name = prompt(`Do you want to post the image in ./${filename}`);
                                if(name == "yes"){
                                const { media } = await client.uploadPhoto({ photo: photo, caption: `${caption}`, post: 'feed' })
                                console.log(`https://www.instagram.com/p/${media.code}/`)
                                fs.unlink(`./${filename}`)
                                } else {
                                    fs.unlink(`./${filename}`)
                                    post()
                                }
                          
                        });
                    });
                 
                }).catch((err) => console.error(err));


            });
        }
    });

}

async function getreddit(subreddit) {
        got(`https://www.reddit.com/r/${subreddit}/random/.json`).then(async response => {
            var content = JSON.parse(response.body);
            try {
                var meme_image = await content[0].data.children[0].data.url_overridden_by_dest;
                var caption = await content[0].data.children[0].data.title;
                var nsfw_check = await content[0].data.children[0].data.thumbnail;
                var ups =  await content[0].data.children[0].data.ups;
                if (meme_image.includes(".jpg") && ups>30 && nsfw_check!=="nsfw") {
                 
                  check(meme_image,caption);
              
                }
        } catch (e) {
             console.log(e)
            }

        })

}

async function post(){

  var subreddit = list[Math.floor(Math.random() * list.length)];

    await getreddit(subreddit)


};


   post()
