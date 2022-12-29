# reddit2instagram-node
A simple nodejs program which fetches the images from the list of defined subreddits and posts them to your instagram page.(Also never posts images having the same url)

## Steps to use:
 * Install node modules
 * Add your username and passwor in config.json
 * Add the list of subreddits you want to get images from in config.json
 * Add the tags of your choice in config.json
    ```
      In rare occasion you might not get any response from the subreddit, this means the mods probably don't allow it. 
      You might want to figure which subreddits can be used and which not.
      My piece of advice is for you to check it before hand by using the got module to try to get response from the subreddit.
    ```
  
