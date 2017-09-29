# Bonobos Interview Project

### Build Instructions

- In order to run this project, you need to have node and npm installed on your environment. I used node v.8.0.0 and npm v5.3.0.
- After cloning the repo, navigate into the project directory and run "npm install"
- This app utilizes a PostgresSQL database. Any version should be fine. In order to configure the database connection, you need to manually create a production and a test database. Then, modify db/config/config.json to match the configuration of the database you created.

- Once the database is set up and all dependencies have been installed, you can execute "npm run build && npm run start" from the project directory. When you see text that reads, "Bonobos homework assignment running on port 3000", you can access the app at localhost:3000.
- Note: The ORM I used has a sync() function that I'm using to automatically create database tables based on my model schemas. Once this finishes, I call my code to pull data from the CSV files and load them into the database. As a result, each time you restart the app, the old tables are dropped, and the database is repopulated. I wouldn't do this in a production app, but it works well when starting a new project. I wanted to make it simple for you guys to run the app.
- Finally, to run tests, execute "npm test" from the project directory.

## My Approach
- The foundational elements of this app (build configuration, middleware, general code structure, etc) is a stripped-down version of what I have used to build previous apps. The functionality for this app is simple enough that I decided to use pure React on the front-end, rather than incur the boilerplate of Redux.
- In general, my coding philosophy is to keep things as simple as possible. While I think deeply about likely use cases and edge cases, I try to avoid anticipating features that might be wanted in the future, as that often results in wasted development effort and time, and introduces unnecessary opportunities for bugs to arise. I find it is much better to develop incrementally, building out the simplest version of features that can be deployed on their own, then improving on them as necesary.
    - That having been said, you can see in the commit history that there was a point during this project where I deviated from my incrementalist philosophy. This arose when thinking about the database structure. I will revisit those thoughts in the section about what I might improve in the future, but I ultimately decided to stick with the  data structure provided, since it doesn't prevent implementing the specified functionality.
-Lastly, I thought about who the likely users of this app might be. Since the app is a means for viewing inventory, it seemed to me that it's intended for internal use. When thinking about the UI, I debated whether to focus on making a more useful, but more complicated, desktop UI or making a simpler UI that would also look good on mobile. Ultimately, I decided that since the likely users are internal, they are more likely to be on a desktop when using this app. Ordinarily, I would consult relevant people in the company when making this determination.

## What I Would Improve In The Future
- As I just mentioned, I optimized the UI for desktop. If it turns out that many users need a mobile view, I would add that.
- For the purposes of this app, a simple database that reflects the structure of the CSV files seems adequate. However, I believe that the inventory data combines multiple types of data (style, size, stock) into a single table. It seems likely to me that styles have more data associated with them than just their name. I would create a separate styles table, which has a many-to-many relationship with products. There would also be an inventory table, which would belong to the products_styles join table in a one-to-many relationship. The inventory table would contain length, waist, and inventory count data. I feel like this database structure has more clearly defined entities. However, I wound up not implementing it here, as it would have vastly complicated the process of loading the data into the database.

    - Similarly, images could be removed from the products table and put into their own table. This would enable:
      - Storage of image-specific data,
      - Image optimization, since data for multiple image sizes could be stored and related to each other
      - Image association with other tables.
    - However, the current project specifications leave me inclined to leave the image url on the products table until there is an immediate reason to take them out.

- If the process of pulling data into the database this way was more open-ended (i.e. there was a LOT more data, or new data was constantly coming in this way), I would make the process interruptable/resumable. I would also modify it to read/persist data in chunks, rather reading/persisting all data at once. It would also be important to add robust testing to this process.

- As I mentioned above, the database sync() function should not be in a production app, and I would remove it (and my data loading code) immediately after the database was initialized.
- Due to a desire to simplify the build on your end, I removed the part of my build process that adds hashes to the names of js and css assets. I would definitely add that back in to a production app in order to optimize asset caching.
