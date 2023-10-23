# Exel Data Mapper
A flask application which can be used to upload a exel file and then user can select to map data and mapped data will be stored in mongodb database


## Usage 
- Copy .env.example to .env and put mongodb uri there
- Run
    ```
    docker compose build
    docker compose up
    ```
- Goto [http://localhost](http://localhost) and click on Uploader.
- Upload desired exel file. The demo file is included.
- In next select tax types
- You will be redirected to the home page and updated data will be shown